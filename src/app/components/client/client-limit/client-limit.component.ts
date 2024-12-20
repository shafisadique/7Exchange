import { Component } from '@angular/core';
import { ClientService } from '../client.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';
import { UserRole } from '../../../shared/services/role.enum';
import { CommonModule } from '@angular/common';
import { NgbDropdownModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-client-limit',
  standalone: true,
  imports: [CommonModule, NgbDropdownModule, NgbModule, RouterModule,FormsModule],
  templateUrl: './client-limit.component.html',
  styleUrl: './client-limit.component.scss'
})
export class ClientLimitComponent {
    data: any;
    isBasicExampleMenuCollapsed = true;
    role: boolean = false;
    currentUserRole = UserRole.AGENT;
    UserRole;
    currentPage = 1;
    pageSize = 5;
    totalLimit:number=0
    inputValues: any;
    totalCount: number;
    subAdminId:any;
    agentId:any;
    agent:any;
    limitData:any={}
    sort: { column: string, direction: 'asc' | 'desc' } = { column: '', direction: 'asc' };
    
  
    constructor(
      private clientService: ClientService,
      public router: Router,
      public activatedRoute:ActivatedRoute,
      private authService: AuthService,
      private toastrService:ToastrService
    ) {
      this.UserRole = this.authService.getUserRole();
    }
  
    ngOnInit(): void {
      // this.loadClientLimit(this.currentPage);
      this.initializeCode()
    }
  
    private initializeCode(): void {
      if (this.UserRole !== UserRole.AGENT) {
        this.activatedRoute.params.subscribe(params => {
          this.agentId = params['id'];
          this.loadClientLimit(this.currentPage);
        });
      } else if (this.UserRole === UserRole.AGENT) {
        this.agentId = sessionStorage.getItem('id');
        this.loadClientLimit(this.currentPage);
      }
    }
  
    loadClientLimit(page: number,searchValue:string='') {
       
    if(this.agentId != ''){
      const backgendPage = page - 1;
      this.clientService.getClientLimit(this.agentId,backgendPage,searchValue).subscribe({
      next:(res:any)=>{
        console.log(res)
        this.data = res.data.content; // Use `content` directly from response
        this.totalCount = res.totalElements; // Update total count for pagination
        this.agent = res.agent.id;
        // this.isLoading = false;
      }
    })
    }
    
    
      // if(this.subAdminId !== ''||this.subAdminId !==null){
      //   this.clientService.getlimitDummyData(page, this.pageSize).subscribe({
      //     next: (res: any) => {
      //       const sortedData = res.sort((a:any, b:any) => {
      //         if (this.sort.direction === 'asc') {
      //           return a[this.sort.column] > b[this.sort.column]? 1 : -1;
      //         } else {
      //           return a[this.sort.column] < b[this.sort.column]? 1 : -1;
      //         }
      //       });
    
      //       this.data = sortedData;
      //       this.loadTotalCurrentLimit()
      //       // this.sort
      //     }
      //   });
      // }
      // this.clientService.getTotalCount().subscribe({
      //   next: (count: number) => {
      //     this.totalCount = count;
      //   }
      // });
    }
    onSearch(event: Event): void {
      const inputElement = event.target as HTMLInputElement;
      const searchValue = inputElement.value.trim(); // Get and trim input value
      this.loadClientLimit(this.currentPage, searchValue); // Pass the search value
    }
    adds(limit:any,id:number){
      this.limitData ={
        limit:limit,
        userId:id,
        parentId:this.agentId,
        isLedger: true,
        addOrMinus: 1
      }
      this.clientService.patchClientLimit(this.limitData).subscribe({
        next:(res:any)=>{
          this.toastrService.success("Limit Update !",res.msg)
        this.loadClientLimit(this.currentPage)

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
        parentId:this.agent,
        isLedger: true,
        addOrMinus: -1
      }
      this.clientService.patchClientLimit(this.limitData).subscribe({
        next:(res:any)=>{
          this.toastrService.success("Limit Update !",res.msg)
        this.loadClientLimit(this.currentPage)

        },
        error:(e:Error)=>{
          console.log(e)
        }
      })
    }
  
    loadTotalCurrentLimit() {
      this.clientService.getTotalCurrentLimit().subscribe({
          next: (totalLimit) => {
              this.totalLimit = totalLimit;
              console.log('Total Current Limit:', this.totalLimit);
          },
          error: (err) => console.error('Failed to fetch total current limit:', err)
      });
  }
  
    onPageChange(page: number) {
      this.currentPage = page;
      this.loadClientLimit(this.currentPage);
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
  
    // setAllActive() {
    //   this.clientService.updateAllStatus(true).subscribe(() => {
    //     this.loadMasterData(this.currentPage); // Refresh the current page data
    //   });
    // }
    
    // setAllDeActive() {
    //   this.clientService.updateAllStatus(false).subscribe(() => {
    //     this.loadMasterData(this.currentPage); // Refresh the current page data
    //   });
    // }
  
    sortData(column: string) {
      if (this.sort.column === column) {
        this.sort.direction = this.sort.direction === 'asc' ? 'desc' : 'asc';
      } else {
        this.sort.column = column;
        this.sort.direction = 'asc';
      }
      this.loadClientLimit(this.currentPage);
    }
}
