import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { UserRole } from '../../../shared/services/role.enum';
import { MasterService } from '../master.service';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';
import {  NgbDropdownModule, NgbModal, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { MasterResponse } from '../master.interface';
import { LoaderComponent } from '../../../shared/components/loader/loader.component';
import { ModalComponent } from '../../modal/modal.component';
import { SubAdminService } from '../../subAdmin/sub-admin.service';
import { MasterData } from '../../../../core/master-dummy-data';

@Component({
  selector: 'app-master-details',
  standalone: true,
  imports: [CommonModule,NgbPaginationModule,NgbDropdownModule,RouterModule,FormsModule,LoaderComponent],
  templateUrl: './master-details.component.html',
  styleUrl: './master-details.component.scss'
})
export class MasterDetailsComponent {
  data: any[]=[];
  isBasicExampleMenuCollapsed = true;
  role: boolean = false;
  isLoading: boolean = false;
  currentUserRole = UserRole.SUB;
  UserRole;
  currentPage = 1;
  pageSize = 5;
  totalCount: number;
  codeNameMaster:any;
  sort: { column: string, sorted: boolean } = { column: '', sorted: false };

  constructor(
    private masterService: MasterService,
    private subAdminService:SubAdminService,
    public router: Router,
    private authService: AuthService,
    private modalService: NgbModal
  ) {
    this.UserRole = this.authService.getUserRole();
  }

  ngOnInit(): void {
    this.loadMasterData();
  }
  getSortIcon(column: string): string {
    if (this.sort.column === column) {
      return this.sort.sorted ? 'fa fa-arrow-up' : 'fa fa-arrow-down'; // Indicate sorted state
    }
    return 'fa fa-sort'; // Indicate unsorted columns
  }

  loadMasterData() {
    this.isLoading = true;

    // Fetch data with sorting and pagination
    this.masterService.getMasterData(
      this.currentPage - 1, // Convert to 0-indexing for API call
      this.pageSize,
      this.sort.column,
      this.sort.sorted // Pass boolean for sorting
    ).subscribe({
      next: (res: MasterResponse) => {
        this.data = res.data.content;
        this.totalCount = res.data.totalElements;
        this.totalCount = res.data.totalPages;
        this.sort.sorted = res.data.sort.sorted;
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
  }

  getSingleId(id:any){
    this.router.navigate([`/master/master-modify/${id}`])
  }

  createMasterData(){
    if(this.UserRole === this.currentUserRole){
      this.router.navigate(['/master/master-create']);
    }else{
      this.openModal();
    }
  }

  createMasterLimit(id:any){
    if(this.UserRole === this.currentUserRole){
      this.router.navigate(['/master/master-limit']);
    }else{
      this.router.navigate([`/master/master-limit/${id}`])
    }
  }

  openModal() {
    this.subAdminService.listSubAdmin().subscribe({
      next:(res)=>{
        const modalRef = this.modalService.open(ModalComponent, {
          windowClass: 'custom-modal-content'
        });
    
        // Pass both a string and the data array to the modal
        (<ModalComponent>modalRef.componentInstance).data = {
          dataName: 'Sub Admin',
          dataArray: res.data.content,
          currentRouter:'Master'
        };
      
      }
    })

  }
  
  getSuperLimit(id:any){
    this.router.navigate([`/super/super-limit/${id}`])
  }

  createSuperAgent(id:any){
    this.router.navigate([`/super/super-create/${id}`])
  }
  onPageSizeChange() {
    this.currentPage = 1; // Reset to first page
    // this.loadMasterData(this.currentPage);
  }

  setAllActive() {
    // this.masterService.updateAllStatus(true).subscribe(() => {
    //   this.loadMasterData(this.currentPage); // Refresh the current page data
    // });
  }
  
  setAllDeActive() {
    // this.masterService.updateAllStatus(false).subscribe(() => {
    //   this.loadMasterData(this.currentPage); // Refresh the current page data
    // });
  }

  sortData(column: string): void {
    // Toggle sorted state based on the current column
    if (this.sort.column === column) {
      this.sort.sorted = !this.sort.sorted; // Toggle sorting on/off
    } else {
      this.sort.column = column;
      this.sort.sorted = true; // Sort the new column
    }
    this.loadMasterData();
  }
}
