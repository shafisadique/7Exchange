import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NgbDropdownModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserRole } from '../../../shared/services/role.enum';
import { SuperService } from '../super.service';
import { AuthService } from '../../../shared/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-super-limit',
  standalone: true,
  imports: [CommonModule, NgbDropdownModule, NgbModule,RouterModule,FormsModule],
  templateUrl: './super-limit.component.html',
  styleUrl: './super-limit.component.scss'
})
export class SuperLimitComponent {
  data: any;
  isBasicExampleMenuCollapsed = true;
  role: boolean = false;
  currentUserRole = UserRole.SUB;
  UserRole;
  currentPage = 1;
  pageSize = 5;
  totalLimit:number=0
  inputValues: any;
  totalCount: number;
  subAdminId:any;
  masterID:any;
  master:any;
  limitData:any={}
  sort: { column: string, direction: 'asc' | 'desc' } = { column: '', direction: 'asc' };
  

  constructor(
    private superService: SuperService,
    public router: Router,
    public activatedRoute:ActivatedRoute,
    private authService: AuthService,
    private toastrService:ToastrService
  ) {
    this.UserRole = this.authService.getUserRole();
   
  }

  ngOnInit(): void {
    this.initializeCode()
    // this.loadSuperLimit(this.currentPage);
  }

  private initializeCode(): void {
    if (this.UserRole !== UserRole.MASTER) {
      this.activatedRoute.params.subscribe(params => {
        this.masterID = params['id'];
        this.loadSuperLimit(this.currentPage);
      });
    } else if (this.UserRole === UserRole.MASTER) {
      this.masterID = sessionStorage.getItem('id');
      this.loadSuperLimit(this.currentPage);
    }
  }

  loadSuperLimit(page: number,searchValue: string = '') {
    if(this.masterID != ''){
      const backgendPage = page - 1;
      this.superService.getSuperLimit(this.masterID,backgendPage,searchValue).subscribe({
      next:(res:any)=>{
        this.data = res.data.content; // Use `content` directly from response
        this.totalCount = res.totalElements; // Update total count for pagination
        this.master = res.master.id;
        // this.isLoading = false;
      }
    })
    }
  }

  onSearch(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const searchValue = inputElement.value.trim(); // Get and trim input value
    this.loadSuperLimit(this.currentPage,searchValue)
  }

  adds(limit:any,id:number){
    this.limitData ={
      limit:limit,
      userId:id,
      parentId:this.master,
      isLedger: true,
      addOrMinus: 1
    }
    this.superService.patchSuperLimit(this.limitData).subscribe({
      next:(res:any)=>{
        this.toastrService.success("Limit Update !",res.msg)
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
      parentId:this.master,
      isLedger: true,
      addOrMinus: -1
    }
    this.superService.patchSuperLimit(this.limitData).subscribe({
      next:(res:any)=>{
        this.toastrService.success("Limit Update !",res.msg)
      },
      error:(e:Error)=>{
        console.log(e)
      }
    })
  }

  onPageChange(page: number) {
    this.currentPage = page;
    // this.loadSuperLimit(this.currentPage);
  }

  getSingleId(id:any){
    this.router.navigate([`/sub-admin/sub-admin-modify/${id}`])
  }
  
  getSuperLimit(id:any){

  }
 
  // calculateTotalLimit(): void {
  //   this.totalLimit = this.data.reduce((acc:any, curr:any) => acc + (curr.currentLimit || 0), 0);
  //   console.log(`Total Limit: ${this.totalLimit}`);
  // }  
  

  createMaster(data:any){
    this.router.navigate([`/master/master-create`])
  }

  setAllActive() {
    this.superService.updateAllStatus(true).subscribe(() => {
      // this.loadSuperLimit(this.currentPage); // Refresh the current page data
    });
  }
  
  setAllDeActive() {
    this.superService.updateAllStatus(false).subscribe(() => {
      // this.loadSuperLimit(this.currentPage); // Refresh the current page data
    });
  }

  sortData(column: string) {
    if (this.sort.column === column) {
      this.sort.direction = this.sort.direction === 'asc' ? 'desc' : 'asc';
    } else {
      this.sort.column = column;
      this.sort.direction = 'asc';
    }
    // this.loadSuperLimit(this.currentPage);
  }
}
