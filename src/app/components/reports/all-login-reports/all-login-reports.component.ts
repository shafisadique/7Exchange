import { Component } from '@angular/core';
// import { alLoginDataDummy } from '../../../../core/all-login-reports-dummy-data';
import { CommonModule } from '@angular/common';
import { AlLoginReport } from '../reports.interface';
import { FormsModule } from '@angular/forms';
import { NgbDatepickerModule, NgbDropdownModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { ReportsService } from '../reports.service';

@Component({
  selector: 'app-all-login-reports',
  standalone: true,
  imports: [CommonModule, FormsModule, NgbDropdownModule, NgbDatepickerModule,NgbPaginationModule],
  templateUrl: './all-login-reports.component.html',
  styleUrl: './all-login-reports.component.scss'
})
export class AllLoginReportsComponent {
  currentPage: number = 1;
  itemsPerPage: number = 10;
  options: string[] = [];
  filteredOptions: string[] = [];
  loginData: AlLoginReport[] = [];
  paginatedLoginData:AlLoginReport[]=[];
  totalItems: number = 1;
  currentMaster: boolean = false;
  currentSuper: boolean = false;
  currentAgent: boolean = false;
  currentClient: boolean = false;
  selectedOption: string = '';
  searchQuery: any;
  postData = {
    user: 0,
    dateFrom: '',
    dateTo: '',
    groupId: 0,
    reportFor: 'SUB',
    reportWhere: 'SUB',
  };

  constructor(private route: ActivatedRoute,private reportService:ReportsService) {}

  ngOnInit(): void {
    const currentURL = this.route.snapshot.url.join('/');
    if (currentURL.includes('master')) {
      this.currentMaster = true;
      this.reportService.getloginMasterReport().subscribe({
        next:(res:any)=>{
          this.paginatedLoginData = res;
          this.options = ['Client 1', 'Client 2', 'Client 3'];
        }
      })
    } else if (currentURL.includes('super')) {
      
      this.currentSuper = true;
      this.options = ['Option 1', 'Option 2', 'Option 3'];
      this.reportService.getloginSuperReport().subscribe({
        next:(res:any)=>{
          this.paginatedLoginData = res;
        }
      })
    } else if (currentURL.includes('agent')) {
      this.currentAgent = true;
      this.options = ['Option A', 'Option B', 'Option C'];
      this.reportService.getloginAgentReport().subscribe({
        next:(res:any)=>{
          this.paginatedLoginData = res;
        }
      })
    } else if (currentURL.includes('client')) {
      this.currentClient = true;
      this.options = ['Option X', 'Option Y', 'Option Z'];
      this.reportService.getloginClientReport().subscribe({
        next:(res:any)=>{
          this.paginatedLoginData = res;
        }
      })
    }
    this.filteredOptions = this.options;
    this.paginateData();
  }

  get paginatedData(): AlLoginReport[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.loginData.slice(start, end);
  }

  onSearchChange(searchQuery: string): void {
    this.filteredOptions = this.options.filter(option =>
      option.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  onSelectOption(option: string): void {
    this.selectedOption = option;
    this.searchQuery = option;
  }
  onPageChange(page: number): void {
    this.currentPage = page;
    this.paginateData();
  }

  paginateData(): void {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedLoginData = this.loginData.slice(start, end);
  }

  onFocus(): void {
    this.filteredOptions = this.options;
  }
}
