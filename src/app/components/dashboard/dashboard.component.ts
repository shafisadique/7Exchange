import { CommonModule } from '@angular/common';
import { Component, NgZone } from '@angular/core';
import { FeatherIconsComponent } from '../../shared/components/feather-icons/feather-icons.component';
import { NgbCarouselModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BaseChartDirective } from 'ng2-charts';
import { NgApexchartsModule } from 'ng-apexcharts';
import { RoleService } from '../../shared/services/role.service';
import { UserRole } from '../../shared/services/role.enum';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FeatherIconsComponent, NgbCarouselModule,NgbModule, BaseChartDirective,NgbCarouselModule,NgApexchartsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  public customOptions: any = {
    margin: 10,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    loop: true,
    dots: false,
    nav: false,
    responsiveClass: true,
    responsive: {
      0: {
        items: 1,
        nav: false
      },
      420: {
        items: 2,
        nav: false
      },
      600: {
        items: 3,
        nav: false
      },
      932: {
        items: 4,
        nav: false
      }
    }
  }
  constructor(private ngZone:NgZone){}
  onClick(){}


  ngOnInit(): void {
   
  }

  updateUIBasedOnRole(role: UserRole|null) {
    if (role === UserRole.MASTER) {
      // Update UI logic for master
    }
  }
}
