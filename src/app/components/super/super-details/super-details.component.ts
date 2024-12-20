import { Component } from '@angular/core';
import { SuperService } from '../super.service';
import { Router, RouterModule } from '@angular/router';
import { UserRole } from '../../../shared/services/role.enum';
import { AuthService } from '../../../shared/services/auth.service';
import { CommonModule } from '@angular/common';
import { NgbDropdownModule, NgbModal, NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { SuperData } from '../super.interface';
import { MasterService } from '../../master/master.service';
import { ModalComponent } from '../../modal/modal.component';

@Component({
  selector: 'app-super-details',
  standalone: true,
  imports: [CommonModule,RouterModule,NgbDropdownModule,NgbPagination,FormsModule],
  templateUrl: './super-details.component.html',
  styleUrl: './super-details.component.scss'
})
export class SuperDetailsComponent {
  data: any;
  isBasicExampleMenuCollapsed = true;
  role: boolean = false;
  isLoading: boolean = false;
  currentUserRole = UserRole.MASTER;
  UserRole;
  currentPage = 1;
  pageSize = 25;
  totalCount: number;
  sort: { column: string, direction: 'asc' | 'desc' } = { column: '', direction: 'asc' };

  constructor(
    private superService: SuperService,
    private masterService:MasterService,
    public router: Router,
    private authService: AuthService,
    private modalService: NgbModal
  ) {
    this.UserRole = this.authService.getUserRole();
  }

  ngOnInit(): void {
    this.loadSuperData(this.currentPage);
  }

  loadSuperData(page: number) {
    this.isLoading = true;
    this.superService.getSuperData(page, this.pageSize).subscribe({
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

  onPageChange(page: number) {
    console.log(page)
    this.currentPage = page;
    this.loadSuperData(this.currentPage);
  }
  createAgent(id:any){
    this.router.navigate(['/agent/agent-create']);
  }

  getSingleId(id:any,masterId:any){
    this.router.navigate([`/super/super-modify/${id}`],{ queryParams: { masterId } });
  }
  
  getAgentLimit(id:any){
    this.router.navigate([`/agent/agent-limit/${id}`]);
  }
  onPageSizeChange() {
    this.currentPage = 1; // Reset to first page
    this.loadSuperData(this.currentPage);
  }


  createSuperAgent(data:any){
    this.router.navigate([`/sub-admin/sub-admin-create/${data}`])
  }

  createSuperData(){
    if(this.UserRole === this.currentUserRole){
      this.router.navigate(['/super/super-create']);
    }else{
      this.openModal();
    }
  }

  openModal() {
    this.masterService.getMasterList().subscribe({
      next:(res)=>{
        const modalRef = this.modalService.open(ModalComponent, {
          windowClass: 'custom-modal-content'
        });
    
        // Pass both a string and the data array to the modal
        (<ModalComponent>modalRef.componentInstance).data = {
          dataName: 'Master',
          dataArray: res.data.content,
          currentRouter:'Super'
        };
      }
    })
  }

  
  
  setAllActive() {
    this.superService.updateAllStatus(true).subscribe(() => {
      this.loadSuperData(this.currentPage); // Refresh the current page data
    });
  }

  
  
  setAllDeActive() {
    this.superService.updateAllStatus(false).subscribe(() => {
      this.loadSuperData(this.currentPage); // Refresh the current page data
    });
  }

  sortData(column: string) {
    if (this.sort.column === column) {
      this.sort.direction = this.sort.direction === 'asc' ? 'desc' : 'asc';
    } else {
      this.sort.column = column;
      this.sort.direction = 'asc';
    }
    this.loadSuperData(this.currentPage);
  }
}
