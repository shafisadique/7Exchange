import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Observable } from 'rxjs';
import { TableService } from '../../../shared/services/table.service';
import { COMPANYDB } from './company';
import { NgbdSortableHeader, SortEvent } from '../../../shared/directives/NgbdSortableHeader';
import { CommonModule, DecimalPipe } from '@angular/common';
import { NgbDropdownModule, NgbModal, NgbModule, NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { ClientService } from '../client.service';
import { AuthService } from '../../../shared/services/auth.service';
import { ClientApiDataResponse } from '../client.interface';
import { UserRole } from '../../../shared/services/role.enum';
import { AgentService } from '../../agent/agent.service';
import { Router, RouterModule } from '@angular/router';
import { ModalComponent } from '../../modal/modal.component';
import { ClientDummyData } from '../../../../core/client-dummy-data';

@Component({
  selector: 'app-client-details',
  standalone: true,
  imports: [CommonModule,NgbModule,NgbdSortableHeader,NgbDropdownModule,RouterModule],
  providers:[TableService,DecimalPipe],
  templateUrl: './client-details.component.html',
  styleUrl: './client-details.component.scss'
})
export class ClientDetailsComponent implements OnInit{

  data: any=[];
  isBasicExampleMenuCollapsed = true;
  role: boolean = false;
  isLoading: boolean = false;
  currentUserRole = UserRole.AGENT;
  UserRole;
  currentPage = 1;
  pageSize = 5;
  totalCount: number;
  sort: { column: string, direction: 'asc' | 'desc' } = { column: '', direction: 'asc' };

  constructor(
    private clientService: ClientService,
    public router: Router,
    private authService: AuthService,
    private modalService: NgbModal
  ) {
    this.UserRole = this.authService.getUserRole();
  }

  ngOnInit(): void {
    this.loadClientData(this.currentPage);
  }

  loadClientData(page: number) {
    this.isLoading = true;
    this.clientService.getClientData(page, this.pageSize).subscribe({
      next: (res: any) => {
        this.data = res.data.content;
        this.totalCount = res.data.totalElements;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }


  createClientData(){
    if(this.UserRole === this.currentUserRole){
      this.router.navigate(['/client/client-create']);
    }else{
      this.openModal();
      this.openModal
    }
  }

  openModal() {
    this.clientService.getAgentList().subscribe({
      next:(res)=>{
        const modalRef = this.modalService.open(ModalComponent, {
          windowClass: 'custom-modal-content'
        });
    
        // Pass both a string and the data array to the modal
        (<ModalComponent>modalRef.componentInstance).data = {
          dataName: 'Agent',
          dataArray: res.data.content,
          currentRouter:'Client'
        };
      }
    })
  }

  clientLimit(id:any){
    this.router.navigate(['client/client-details']);
  }
  

  onPageChange(page: number) {
    console.log(page)
    this.currentPage = page;
    this.loadClientData(this.currentPage);
  }

  getSingleId(id:any){
    this.router.navigate([`/client/client-modify/${id}`])
  }
  
  getSuperLimit(id:any){

  }

  createMaster(data:any){
    this.router.navigate([`/master/master-create`])
  }

  setAllActive() {
    this.clientService.updateAllStatus(true).subscribe(() => {
      this.loadClientData(this.currentPage); // Refresh the current page data
    });
  }
  
  setAllDeActive() {
    this.clientService.updateAllStatus(false).subscribe(() => {
      this.loadClientData(this.currentPage); // Refresh the current page data
    });
  }

  sortData(column: string) {
    if (this.sort.column === column) {
      this.sort.direction = this.sort.direction === 'asc' ? 'desc' : 'asc';
    } else {
      this.sort.column = column;
      this.sort.direction = 'asc';
    }
    this.loadClientData(this.currentPage);
  }

}
