import { Component } from '@angular/core';
import { UserRole } from '../../../shared/services/role.enum';
import { AgentService } from '../agent.service';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDropdownModule, NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SuperService } from '../../super/super.service';
import { ModalComponent } from '../../modal/modal.component';
import { AgentDummyData } from '../../../../core/agnet-dummy-data';

@Component({
  selector: 'app-agent-details',
  standalone: true,
  imports: [CommonModule, NgbDropdownModule, NgbModule,RouterModule,FormsModule],
  templateUrl: './agent-details.component.html',
  styleUrl: './agent-details.component.scss'
})
export class AgentDetailsComponent {
  data: any[]=[];
  isBasicExampleMenuCollapsed = true;
  role: boolean = false;
  isLoading: boolean = false;
  currentUserRole = UserRole.SUPER;
  UserRole;
  currentPage = 1;
  pageSize = 25;
  totalCount: number;
  sort: { column: string, direction: 'asc' | 'desc' } = { column: '', direction: 'asc' };

  constructor(
    private agentServie: AgentService,
    public router: Router,
    private modalService: NgbModal,

    private authService: AuthService,
    private superService: SuperService
  ) {
    this.UserRole = this.authService.getUserRole();
  }

  ngOnInit(): void {
    this.loadAgentData(this.currentPage);
  }


  loadAgentData(page: number) {
    this.isLoading = true;
    this.agentServie.getAgentData(page, this.pageSize).subscribe({
      next: (res: any) => {
        console.log(res)
        this.data = res.data.content;
        this.totalCount = res.data.totalElements;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  // loadAgentData(page: number) {
  //   this.agentServie.getDummyData(page, this.pageSize).subscribe({
  //     next: (res: any) => {
  //       const sortedData = res.sort((a:any, b:any) => {
  //         if (this.sort.direction === 'asc') {
  //           return a[this.sort.column] > b[this.sort.column]? 1 : -1;
  //         } else {
  //           return a[this.sort.column] < b[this.sort.column]? 1 : -1;
  //         }
  //       });
  //       this.data = sortedData;
  //       this.isLoading = false;
  //     }
  //   });
  //   this.agentServie.getTotalCount().subscribe({
  //     next: (count: number) => {
  //       this.totalCount = count;
  //     }
  //   });
  // }

  clientLimit(id:any){
    this.router.navigate([`client/client-limit/${id}`]);
  }
  
  createAgentData(){
    if(this.UserRole === this.currentUserRole){
      this.router.navigate(['/agent/agent-create']);
    }else{
      this.openModal();
    }
  }

  openModal() {
    this.superService.getSuperService().subscribe({
      next:(res:any)=>{
        const modalRef = this.modalService.open(ModalComponent, {
          windowClass: 'custom-modal-content'
        });
    
        // Pass both a string and the data array to the modal
        (<ModalComponent>modalRef.componentInstance).data = {
          dataName: 'Super',
          dataArray: res.data.content,
          currentRouter:'Agent'
        };
      }
    })
  }
  onPageChange(page: number) {
    console.log(page)
    this.currentPage = page;
    this.loadAgentData(this.currentPage);
  }
  onPageSizeChange() {
    this.currentPage = 1; // Reset to first page
    this.loadAgentData(this.currentPage);
  }

  getSingleId(agentId: any, superId: any) {
    this.router.navigate([`/agent/agent-modify/${agentId}`], { queryParams: { superId } });
  }

  createClient(){
    this.router.navigate([`/client/client-create`])
  }

  setAllActive() {
    // this.agentServie.updateAllStatus(true).subscribe(() => {
    //   this.loadAgentData(this.currentPage); // Refresh the current page data
    // });
  }
  
  setAllDeActive() {
    // this.agentServie.updateAllStatus(false).subscribe(() => {
    //   this.loadAgentData(this.currentPage); // Refresh the current page data
    // });
  }

  sortData(column: string) {
    if (this.sort.column === column) {
      this.sort.direction = this.sort.direction === 'asc' ? 'desc' : 'asc';
    } else {
      this.sort.column = column;
      this.sort.direction = 'asc';
    }
    this.loadAgentData(this.currentPage);
  }
}
