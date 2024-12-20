import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NgbDropdownModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserRole } from '../../../shared/services/role.enum';
import { AgentService } from '../agent.service';
import { AuthService } from '../../../shared/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-agent-limit',
  standalone: true,
  imports: [CommonModule, NgbDropdownModule, NgbModule, RouterModule,FormsModule],
  templateUrl: './agent-limit.component.html',
  styleUrl: './agent-limit.component.scss'
})
export class AgentLimitComponent {
  data: any;
  isBasicExampleMenuCollapsed = true;
  role: boolean = false;
  currentUserRole = UserRole.SUPER;
  UserRole;
  currentPage = 1;
  pageSize = 5;
  totalLimit:number=0
  inputValues: any;
  totalCount: number;
  subAdminId:any;
  superId:any;
  super:any;
  limitData:any;
  sort: { column: string, direction: 'asc' | 'desc' } = { column: '', direction: 'asc' };
  

  constructor(
    private agentService: AgentService,
    public router: Router,
    public activatedRoute:ActivatedRoute,
    private authService: AuthService,
    private toastrService:ToastrService
  ) {
    this.UserRole = this.authService.getUserRole();
    // this.activatedRoute.paramMap.subscribe(params => {
    //   this.subAdminId = params.get('id');
    //   console.log('Current subAdminId:', this.subAdminId);
    // });
  }

  ngOnInit(): void {
    // this.loadMasterData(this.currentPage);
    this.initializeCode()
  }

  private initializeCode(): void {
    if (this.UserRole !== UserRole.SUPER) {
      this.activatedRoute.params.subscribe(params => {
        this.superId = params['id'];
        this.loadAgentLimit(this.currentPage);
      });
    } else if (this.UserRole === UserRole.SUPER) {
      this.superId = sessionStorage.getItem('id');
      this.loadAgentLimit(this.currentPage);
    }
  }

  loadAgentLimit(page: number,searchValue:string='') {
    
    if(this.superId != ''){
      const backgendPage = page - 1;
      this.agentService.getAgentLimit(this.superId,backgendPage,searchValue).subscribe({
      next:(res:any)=>{
        this.data = res.data.content; // Use `content` directly from response
        this.totalCount = res.totalElements; // Update total count for pagination
        this.super = res.super.id;
      }
    })
    }
  }


  adds(limit:any,id:number){
    this.limitData ={
      limit:limit,
      userId:id,
      parentId:this.super,
      isLedger: true,
      addOrMinus: 1
    }
    this.agentService.patchAgentLimit(this.limitData).subscribe({
      next:(res:any)=>{
        this.toastrService.success("Limit Update !",res.msg)
        this.loadAgentLimit(this.currentPage)
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
      parentId:this.super,
      isLedger: true,
      addOrMinus: -1
    }
    this.agentService.patchAgentLimit(this.limitData).subscribe({
      next:(res:any)=>{
        this.toastrService.success("Limit Update !",res.msg)
      },
      error:(e:Error)=>{
        console.log(e)
      }
    })
  }
  onSearch(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const searchValue = inputElement.value.trim(); // Get and trim input value
    this.loadAgentLimit(this.currentPage, searchValue); // Pass the search value
  }
  

  onPageChange(page: number) {
    this.currentPage = page;
    this.loadAgentLimit(this.currentPage);
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
    // this.agentService.updateAllStatus(true).subscribe(() => {
    //   this.loadMasterData(this.currentPage); // Refresh the current page data
    // });
  }
  
  setAllDeActive() {
    // this.agentService.updateAllStatus(false).subscribe(() => {
    //   this.loadMasterData(this.currentPage); // Refresh the current page data
    // });
  }

  sortData(column: string) {
    if (this.sort.column === column) {
      this.sort.direction = this.sort.direction === 'asc' ? 'desc' : 'asc';
    } else {
      this.sort.column = column;
      this.sort.direction = 'asc';
    }
    this.loadAgentLimit(this.currentPage);
  }
}
