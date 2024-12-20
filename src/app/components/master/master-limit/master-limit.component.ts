import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NgbDropdownModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserRole } from '../../../shared/services/role.enum';
import { MasterService } from '../master.service';
import { AuthService } from '../../../shared/services/auth.service';
import { MasterData } from '../../../../core/master-dummy-data';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-master-limit',
  standalone: true,
  imports: [CommonModule, NgbDropdownModule, NgbModule,RouterModule,FormsModule],
  templateUrl: './master-limit.component.html',
  styleUrl: './master-limit.component.scss'
})
export class MasterLimitComponent {
  data: any=MasterData;
  isBasicExampleMenuCollapsed = true;
  role: boolean = false;
  isLoading: boolean = false;
  currentUserRole = UserRole.SUB;
  currentPage = 1;
  pageSize = 5;
  subId:any;
  totalLimit:number=0
  inputValues: any;
  totalCount: number;
  subAdminId:any;
  userRole: UserRole;
  subAdminID:any;
  limitData:any={}
  sort: { column: string, direction: 'asc' | 'desc' } = { column: '', direction: 'asc' };
  

  constructor(
    private masterService: MasterService,
    public router: Router,
    public activatedRoute:ActivatedRoute,
    private authService: AuthService,
    private toastrService:ToastrService
  ) {
    this.userRole = this.authService.getUserRole();

    // this.activatedRoute.paramMap.subscribe(params => {
    //   this.subAdminId = params.get('id');
    //   console.log('Current subAdminId:', this.subAdminId);
    // });
  }

  ngOnInit(): void {
    this.initializeCode();
  }

  private initializeCode(): void {
    if (this.userRole !== UserRole.SUB) {
      this.activatedRoute.params.subscribe(params => {
        this.subId = params['id'];
        this.loadMasterLimit(this.currentPage);
      });
    } else if (this.userRole === UserRole.SUB) {
      this.subId = sessionStorage.getItem('id');
      this.loadMasterLimit(this.currentPage);
    }
  }
  onSearch(event: Event): void {
  const inputElement = event.target as HTMLInputElement;
  const searchValue = inputElement.value.trim(); // Get and trim input value
  this.loadMasterLimit(this.currentPage, searchValue); // Pass the search value
}

  loadMasterLimit(page: number,searchValue?:any) {
    if(this.subId != ''|| this.subId != undefined){
      const backendPage= page-1;
      this.masterService.getMasterLimit(this.subId,backendPage,searchValue).subscribe({
        next:(res:any)=>{
          console.log(res)
          this.data = res.data.content; // Use `content` directly from response
          this.totalCount = res.totalElements; // Update total count for pagination
          this.subAdminID = res.subAdmin.id;
          this.isLoading = false;
        }
      })
    }
   }


   onPageChange(page: number): void {
    this.currentPage = page; // Frontend page (1-based)
    const backendPage = this.currentPage - 1; // Convert to 0-based index for backend
    this.isLoading = true; // Show loading state
    this.loadMasterLimit(backendPage); // Fetch data
  }
  
  get totalPages(): number {
    return Math.ceil(this.totalCount / this.pageSize);
  }

  adds(limit:any,id:number){
    this.limitData ={
      limit:limit,
      userId:id,
      parentId:this.subAdminID,
      isLedger: true,
      addOrMinus: 1
    }
    this.masterService.patchMasterLimit(this.limitData).subscribe({
      next:(res:any)=>{
        this.toastrService.success("Limit Update !",res.msg)
        this.loadMasterLimit(this.currentPage)
      },
      error:(e:Error)=>{
        console.log(e)
      }
    })
  }
  minus(limit:any,id:number){
    this.limitData ={
      limit:limit,
      userId:id,
      parentId:this.subAdminID,
      isLedger: true,
      addOrMinus: -1
    }
    this.masterService.patchMasterLimit(this.limitData).subscribe({
      next:(res:any)=>{
        this.toastrService.success("Limit Update !",res.msg)
      },
      error:(e:Error)=>{
        console.log(e)
      }
    })
  }
  
  getSingleId(id:any){
    this.router.navigate([`/sub-admin/sub-admin-modify/${id}`])
  }
  

  createMaster(data:any){
    this.router.navigate([`/master/master-create`])
  }

 
  sortData(column: string) {
    if (this.sort.column === column) {
      this.sort.direction = this.sort.direction === 'asc' ? 'desc' : 'asc';
    } else {
      this.sort.column = column;
      this.sort.direction = 'asc';
    }
    // this.loadMasterData(this.currentPage);
  }
}
