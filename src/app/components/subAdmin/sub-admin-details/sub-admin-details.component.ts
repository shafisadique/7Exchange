import { Component, OnInit } from '@angular/core';
import { SubAdminService } from '../sub-admin.service';
import { UserRole } from '../../../shared/services/role.enum';
import { Router, RouterModule } from '@angular/router';
import { SubAdminResponse } from '../sub-admin.interface';
import { CommonModule } from '@angular/common';
import { NgbDropdownModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth.service';
import { SubAdmin } from '../../../../core/sub-admin-dummy-data';
import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-sub-admin-details',
  standalone: true,
  imports: [CommonModule, NgbDropdownModule, NgbPaginationModule, RouterModule, FormsModule],
  templateUrl: './sub-admin-details.component.html',
  styleUrls: ['./sub-admin-details.component.scss']
})
export class SubAdminDetailsComponent implements OnInit {
  data: any[] = [];
  isLoading: boolean = false;
  currentUserRole = UserRole.ADMIN;
  UserRole: UserRole;
  currentPage = 1;
  pageSize = 25;
  totalCount: number = 0;
  totalPages: number = 0;
  sort: { column: string, sorted: boolean } = { column: '', sorted: false };
  private destroy$ = new Subject<void>();

  constructor(private subadminService: SubAdminService,private toastr:ToastrService, private router: Router, private authService: AuthService) {
    this.UserRole = this.authService.getUserRole();
  }

  ngOnInit(): void {
    this.loadSubAdminData();
  }

  onPageSizeChange(): void {
    this.currentPage = 1;
    this.loadSubAdminData();
  }

   loadSubAdminData(): void {
    this.isLoading = true;
    this.subadminService
      .getSubAdminData(this.currentPage - 1, this.pageSize, this.sort.column, this.sort.sorted)
      .pipe(takeUntil(this.destroy$)) // Unsubscribe on component destroy
      .subscribe({
        next: (res: SubAdminResponse) => {
          this.data = res.data.content;
          this.totalCount = res.data.totalElements;
          this.totalPages = res.data.totalPages;
        },
        error: (error) => {
          console.error('Error fetching data:', error);
          this.toastr.error('Failed to load data. Please try again.');
        },
        complete: () => {
          this.isLoading = false;
        },
      });
  }
  
  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadSubAdminData();
  }

  sortData(column: string): void {
    if (this.sort.column === column) {
      this.sort.sorted = !this.sort.sorted;
    } else {
      this.sort.column = column;
      this.sort.sorted = true;
    }
    this.loadSubAdminData();
  }

  getSortIcon(column: string): string {
    if (this.sort.column === column) {
      return this.sort.sorted ? 'fa fa-arrow-up' : 'fa fa-arrow-down';
    }
    return 'fa fa-sort';
  }

  getSingleId(id: any): void {
    this.router.navigate([`/sub-admin/sub-admin-modify/${id}`]);
  }

  setAllActive(): void {
  }

  setAllDeActive(): void {
  }

  getSubAdminLimit(): void {
    this.router.navigate([`/sub-admin/sub-admin-limit`]);
  }

  getMasterAdmin(id: number): void {
    this.router.navigate([`/master/master-limit/${id}`]);
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    console.log('destroy')
  }
}
