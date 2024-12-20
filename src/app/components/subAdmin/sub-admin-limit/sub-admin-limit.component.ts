import { Component } from '@angular/core';
import { SubAdminService } from '../sub-admin.service';
import { UserRole } from '../../../shared/services/role.enum';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';
import { CommonModule } from '@angular/common';
import { NgbDropdownModule, NgbModule, NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { SubAdminResponse } from '../sub-admin.interface';
import { SubAdmin } from '../../../../core/sub-admin-dummy-data';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-sub-admin-limit',
  standalone: true,
  imports: [CommonModule, NgbDropdownModule, NgbModule,RouterModule,FormsModule],
  templateUrl: './sub-admin-limit.component.html',
  styleUrl: './sub-admin-limit.component.scss'
})
export class SubAdminLimitComponent {
  data: any=SubAdmin;
  isBasicExampleMenuCollapsed = true;
  role: boolean = false;
  isLoading: boolean = false;
  currentUserRole = UserRole.ADMIN;
  UserRole;
  currentPage = 1;
  pageSize = 10;
  totalLimit:number=0
  inputValues: any;
  adminId:number;
  totalCount: number;
  sort: { column: string, direction: 'asc' | 'desc' } = { column: '', direction: 'asc' };
  limitData:any = {}
  constructor(
    private subadminService: SubAdminService,
    public router: Router,
    private authService: AuthService,
    private toastr:ToastrService
  ) {
    this.UserRole = this.authService.getUserRole();
  }

  ngOnInit(): void {
    this.loadSubAdminData(this.currentPage);
  }

  getSubAdminLimit(id:any){
    this.router.navigate(['/sub-admin/sum-admin-limit'])
  }


  loadSubAdminData(page: number, searchKey: string = ''): void {
    this.isLoading = true;
    this.subadminService.getSubAdminLimit(page - 1, searchKey).subscribe({
      next: (res: any) => {
        console.log(res)
        this.data = res.data.content; // Assume API response contains a 'content' field
        this.totalCount = res.data.totalElements; // Pagination total items
        this.adminId = res.admin.id;
        this.isLoading = false;
      },
      error: () => (this.isLoading = false),
    });
  }

  loadTotalCurrentLimit() {
    this.subadminService.getTotalCurrentLimit().subscribe({
        next: (totalLimit) => {
            this.totalLimit = totalLimit;
            console.log('Total Current Limit:', this.totalLimit);
        },
        error: (err) => console.error('Failed to fetch total current limit:', err)
    });
}

onPageChange(page: number) {
  this.currentPage = page;
  this.loadSubAdminData(page);  // Fetch new page
}
onSearch(event: Event): void {
  const inputElement = event.target as HTMLInputElement;
  const searchValue = inputElement.value.trim(); // Get and trim input value
  this.loadSubAdminData(this.currentPage, searchValue); // Pass the search value
}
  getSingleId(id:any){
    this.router.navigate([`/sub-admin/sub-admin-modify/${id}`])
  }
  

  adds(limit:any,id:number): void {
    this.limitData ={
      limit:limit,
      userId:id,
      parentId:this.adminId,
      isLedger: true,
      addOrMinus: 1
    }
    this.subadminService.updateSubAdminLimit(this.limitData).subscribe({
      next:(res:any)=>{
        this.toastr.success("Limit Update !",res.msg);
        this.loadSubAdminData(this.currentPage-1)
      },
      error:(e:Error)=>{
        this.toastr.error("Limit Update Issue !",e.message);

        console.log(e)
      }
    })
    
  }
  minus(limit:any,id:number): void {
    this.limitData ={
      limit:limit,
      userId:id,
      parentId:this.adminId,
      isLedger: true,
      addOrMinus: -1
    }
    this.subadminService.updateSubAdminLimit(this.limitData).subscribe({
      next:(res:any)=>{
        console.log(res)
        this.toastr.success("Limit Update !",res.msg)
      },
      error:(e:Error)=>{
        console.log(e)
      }
    })
  }


  createMaster(data:any){
    this.router.navigate([`/master/master-create`])
  }

  setAllActive() {
    // this.subadminService.updateAllStatus(true).subscribe(() => {
    //   this.loadSubAdminData(this.currentPage); // Refresh the current page data
    // });
  }
  
  setAllDeActive() {
    // this.subadminService.updateAllStatus(false).subscribe(() => {
    //   this.loadSubAdminData(this.currentPage); // Refresh the current page data
    // });
  }

  sortData(column: string) {
    if (this.sort.column === column) {
      this.sort.direction = this.sort.direction === 'asc' ? 'desc' : 'asc';
    } else {
      this.sort.column = column;
      this.sort.direction = 'asc';
    }
    this.loadSubAdminData(this.currentPage);
  }
}
