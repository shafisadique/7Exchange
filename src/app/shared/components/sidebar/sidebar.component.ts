import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { NavService, Menu } from '../../services/nav.service';
import { FeatherIconsComponent } from '../feather-icons/feather-icons.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule,RouterModule,FeatherIconsComponent,NgbModule ,TranslateModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SidebarComponent implements OnInit{
  public isCompact: boolean = false;

  public menuItems: Menu[] | any;
  public url: any;
  public fileurl: any;
  public userDetails:any;
  constructor(private router: Router, public navServices: NavService) {
    this.navServices.items.subscribe(menuItems => {
      this.menuItems = menuItems
      this.setActiveRoute(this.router.url);
      this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          menuItems.filter(items => {
            if (items.path === event.url)
              this.setNavActive(items);
            if (!items.children) return false
            items.children.filter(subItems => {
              if (subItems.path === event.url)
                this.setNavActive(subItems)
              if (!subItems.children) return false
              subItems.children.filter(subSubItems => {
                if (subSubItems.path === event.url)
                  this.setNavActive(subSubItems)
              })
              return
            })
            return
          }
          )
        }
      })
    })
  }
  ngOnInit(): void {
    const data = sessionStorage.getItem('currentUser');
    if (data) {
      this.userDetails = JSON.parse(data);
    } else {
      this.userDetails = null;
    }
  }

  

  setActiveRoute(url: string) {
    this.menuItems.forEach((item:any) => {
      this.checkActiveState(item, url);
    });
  }

  
  checkActiveState(item: Menu, url: string): void {
    const masterRoutes = ['/master/master-details', '/master/master-create', '/master/master-modify'];
  
    if (masterRoutes.some(route => url.startsWith(route))) {
      if (item.title === 'Master Details') {
        item.active = true;
      } else {
        item.active = false;
      }
    } else {
      item.active = item.path === url;
    }
  
    if (item.children) {
      item.children.forEach(child => this.checkActiveState(child, url));
    }
  }
  
  // Active Nave state
  setNavActive(item:any) {

    this.menuItems.filter((menuItem:any) => {
      if (menuItem != item)
        menuItem.active = false
      if (menuItem.children && menuItem.children.includes(item))
        menuItem.active = true
      if (menuItem.children) {
        menuItem.children.filter((submenuItems:any) => {
          if (submenuItems.children && submenuItems.children.includes(item)) {
            menuItem.active = true
            submenuItems.active = true
          }
        })
      }
    })
  }

  // Click Toggle menu
  toggletNavActive(item:any) {
    if (!item.active) {
      this.menuItems.forEach((a:any) => {
        if (this.menuItems.includes(item))
          a.active = false
        if (!a.children) return false
        a.children.forEach((b:any) => {
          if (a.children.includes(item)) {
            b.active = false
          }
        })
        return
      });
    }
    item.active = !item.active
  }

  //Fileupload
  readUrl(event: any) {
    if (event.target.files.length === 0)
      return;
    //Image upload validation
    var mimeType = event.target.files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }
    // Image upload
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (_event) => {
      this.url = reader.result;
    }
  }
}
