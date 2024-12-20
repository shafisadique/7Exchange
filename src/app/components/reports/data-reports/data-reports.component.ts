import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Reports } from '../reports.interface'; // Assuming you have this interface defined elsewhere
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbDatepickerModule, NgbDropdownModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { reportsData } from '../../../../core/reports-dummy-data';
@Component({
  selector: 'app-data-reports',
  standalone: true,
  imports: [CommonModule, FormsModule, NgbDropdownModule, NgbDatepickerModule,NgbPaginationModule],
  templateUrl: './data-reports.component.html',
  styleUrl: './data-reports.component.scss'
})
export class DataReportsComponent {

  totalItems: number = reportsData.length; // Total number of items based on your dummy data
  currentMaster: boolean = false;
  currentSuper: boolean = false;
  currentAgent: boolean = false;
  currentClient: boolean = false;
  options: string[] = [];
  filteredOptions: string[] = [];
  reportsData: Reports[] = []; // Assuming you have populated this array with your data
  selectedOption: string = '';
  searchQuery: any;
  currentPage: number = 1;
  itemsPerPage: number = 10; // Adjust this value as needed
  paginatedReportsData:Reports[]=[];
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const currentURL = this.route.snapshot.url.join('/');

    if (currentURL.includes('master')) {
      this.currentMaster = true;
      this.options = ['Client 1', 'Client 2', 'Client 3'];
    } else if (currentURL.includes('super')) {
      this.currentSuper = true;
      this.options = ['Option 1', 'Option 2', 'Option 3'];
    } else if (currentURL.includes('agent')) {
      this.currentAgent = true;
      this.options = ['Option A', 'Option B', 'Option C'];
    } else if (currentURL.includes('client')) {
      this.currentClient = true;
      this.options = ['Option X', 'Option Y', 'Option Z'];
    }

    this.filteredOptions = this.options;
    this.reportsData = reportsData; // Assign the dummy data

  }

  get paginatedData(): Reports[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.reportsData.slice(start, end);
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
    this.paginatedReportsData = this.reportsData.slice(start, end);
  }

  onFocus(): void {
    this.filteredOptions = this.options;
  }
}
