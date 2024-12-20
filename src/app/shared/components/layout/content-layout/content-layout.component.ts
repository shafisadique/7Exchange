import { Component, OnInit, AfterViewInit, HostListener, ChangeDetectorRef } from '@angular/core';
import { trigger, transition, useAnimation } from '@angular/animations';
import { bounce, zoomOut, zoomIn, fadeIn, bounceIn } from 'ng-animate';
import { NavService } from '../../../services/nav.service';
import * as feather from 'feather-icons';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../header/header.component';
import { SidebarComponent } from '../../sidebar/sidebar.component';
import { RightSidebarComponent } from '../../right-sidebar/right-sidebar.component';
import { BreadcrumbComponent } from '../../breadcrumb/breadcrumb.component';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../../footer/footer.component';
import { CustomizerService } from '../../../services/customizer.service';
import { UserRole } from '../../../services/role.enum';
import { RoleService } from '../../../services/role.service';


@Component({
  selector: 'app-content-layout',
  standalone: true,
  imports: [CommonModule, HeaderComponent, SidebarComponent, RightSidebarComponent, BreadcrumbComponent, RouterModule, FooterComponent
  ],
  templateUrl: './content-layout.component.html',
  styleUrls: ['./content-layout.component.scss'],
  animations: [
    trigger('animateRoute', [transition('* => *', useAnimation(fadeIn, {
      // Set the duration to 5seconds and delay to 2 seconds
      //params: { timing: 3}
    }))])
  ]
})
export class ContentLayoutComponent implements OnInit, AfterViewInit {
  sidebarState: 'open' | 'collapsed' | 'hover' = 'collapsed';
  userRole: UserRole | null = null;

  toggleSidebar() {
    this.sidebarState = this.sidebarState === 'open' ? 'collapsed' : 'open';
  }
  public isMobileView: boolean = false;
  public right_side_bar: boolean;

  constructor(public navServices: NavService, public customizer: CustomizerService,private roleService: RoleService,
    private cd: ChangeDetectorRef) {
      console.log(customizer.data.settings.sidebar.body_type)
     }


  ngAfterViewInit() {
    this.cd.detectChanges();
    setTimeout(() => {
      feather.replace();
    });
  }
  @HostListener('window:resize', [])
  onResize() {
    this.detectMobileView();
  }

   onSidebarHover() {
    if (this.sidebarState === 'collapsed') {
      this.sidebarState = 'hover';
    }
  }

  onSidebarLeave() {
    if (this.sidebarState === 'hover') {
      this.sidebarState = 'collapsed';
    }
  }
  detectMobileView() {
    this.isMobileView = window.innerWidth <= 768; // Set breakpoint for mobile view
  }
  

  @HostListener('document:click', ['$event'])
  clickedOutside(event: any) {
    // click outside Area perform following action
    document.getElementById('outer-container')!.onclick = function (e) {
        e.stopPropagation();

        let searchOuter = document.getElementById('search-outer');
        if (e.target !== searchOuter) {
            let body = document.getElementsByTagName("body")[0];
            if (body) body.classList.remove("offcanvas");
        }

        let canvasBookmark = document.getElementById("canvas-bookmark");
        if (e.target !== canvasBookmark && canvasBookmark) {
            canvasBookmark.classList.remove("offcanvas-bookmark");
        }

        let innerCustomizer = document.getElementById('inner-customizer');
        if (e.target !== innerCustomizer) {
            let customizerLinks = document.getElementsByClassName("customizer-links")[0];
            let customizerContain = document.getElementsByClassName("customizer-contain")[0];
            if (customizerLinks) customizerLinks.classList.remove("open");
            if (customizerContain) customizerContain.classList.remove("open");
        }
    }
}

  public getRouterOutletState(outlet: any) {
    return outlet.isActivated ? outlet.activatedRoute : '';
  }

  public rightSidebar($event: any) {
    this.right_side_bar = $event
  }

  ngOnInit() { 
    this.detectMobileView();
    this.roleService.userRole$.subscribe(role => {
      this.userRole = role;
      // this.updateUIBasedOnRole(role); // Handle role-specific logic
    });
  }
}
