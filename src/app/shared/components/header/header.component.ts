
import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { NavService, Menu } from '../../services/nav.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { FeatherIconsComponent } from '../feather-icons/feather-icons.component';
import { FormsModule } from '@angular/forms';
import {  Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CustomizerService } from '../../services/customizer.service';

var body = document.getElementsByTagName("body")[0];

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule,FeatherIconsComponent,FormsModule ,RouterModule ,TranslateModule,RouterModule],
  providers:[TranslateService],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public menuItems: Menu[];
  public items: Menu[];
  public searchResult: boolean = false;
  public searchResultEmpty: boolean = false;
  public openNav: boolean = false
  public right_sidebar: boolean = false
  public text: string;
  public elem:any;
  public isOpenMobile: boolean = false
  @Output() rightSidebarEvent = new EventEmitter<boolean>();

  constructor(
    public customize: CustomizerService,
    public navServices: NavService,
    @Inject(DOCUMENT) private document: any, private authService:AuthService,private router:Router,
    private translate: TranslateService) {
  }


  ngOnDestroy() {
    this.removeFix();
  }


  right_side_bar() {
    this.right_sidebar = !this.right_sidebar
    this.rightSidebarEvent.emit(this.right_sidebar)
  }

  // collapseSidebar() {
  //   this.navServices.collapseSidebar =false
  //   // this.navServices.collapseSidebar = !this.navServices.collapseSidebar
  //   // this.customize.data.settings.sidebar.type = 'compact-page';
  //   //   this.customize.data.settings.sidebar.body_type = 'sidebar-hover';
  // }
  collapseSidebar() {
    this.navServices.collapseSidebar = !this.navServices.collapseSidebar;
    if (this.navServices.collapseSidebar) {
      body.classList.add('mini-sidebar'); // Add a class for the mini sidebar
    } else {
      body.classList.remove('mini-sidebar'); // Remove the mini sidebar class
    }
  }
  openMobileNav() {
    this.openNav = !this.openNav;
  }

  public changeLanguage(lang:any) {
    this.translate.use(lang)
  }

  searchTerm(term: any) {
    term ? this.addFix() : this.removeFix();
    if (!term) return this.menuItems = [];
    let items :any = [];
    term = term.toLowerCase();
    this.items.filter((menuItems:any) => {
      if (menuItems.title.toLowerCase().includes(term) && menuItems.type === 'link') {
        items.push(menuItems);
      }
      if (!menuItems.children) return false
      menuItems.children.filter((subItems:any) => {
        if (subItems.title.toLowerCase().includes(term) && subItems.type === 'link') {
          subItems.icon = menuItems.icon
          items.push(subItems);
        }
        if (!subItems.children) return false
        subItems.children.filter((suSubItems:any) => {
          if (suSubItems.title.toLowerCase().includes(term)) {
            suSubItems.icon = menuItems.icon
            items.push(suSubItems);
          }
        })

        return
      })
      this.checkSearchResultEmpty(items)
      this.menuItems = items
      return
    });
    return
  }

  checkSearchResultEmpty(items:any) {
    if (!items.length)
      this.searchResultEmpty = true;
    else
      this.searchResultEmpty = false;
  }

  addFix() {
    this.searchResult = true;
    body.classList.add("offcanvas");
  }

  removeFix() {
    this.searchResult = false;
    body.classList.remove("offcanvas");
    this.text = "";
  }
  ngOnInit() {
    this.elem = document.documentElement;
    this.navServices.items.subscribe(menuItems => {
      this.items = menuItems
    });
  }

  SignOut(){
    this.authService.logOut();
    this.navServices.updateMenuItems();
    this.router.navigate(['/auth/login'])
  }

  toggleFullScreen() {
    this.navServices.fullScreen = !this.navServices.fullScreen;
    if (this.navServices.fullScreen) {
      if (this.elem.requestFullscreen) {
        this.elem.requestFullscreen();
      } else if (this.elem.mozRequestFullScreen) {
        /* Firefox */
        this.elem.mozRequestFullScreen();
      } else if (this.elem.webkitRequestFullscreen) {
        /* Chrome, Safari and Opera */
        this.elem.webkitRequestFullscreen();
      } else if (this.elem.msRequestFullscreen) {
        /* IE/Edge */
        this.elem.msRequestFullscreen();
      }
    } else {
      if (!this.document.exitFullscreen) {
        this.document.exitFullscreen();
      } else if (this.document.mozCancelFullScreen) {
        /* Firefox */
        this.document.mozCancelFullScreen();
      } else if (this.document.webkitExitFullscreen) {
        /* Chrome, Safari and Opera */
        this.document.webkitExitFullscreen();
      } else if (this.document.msExitFullscreen) {
        /* IE/Edge */
        this.document.msExitFullscreen();
      }
    }
  }
}
