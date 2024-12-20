import { CommonModule, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClientPlusMinus } from '../ledger.interface';
// import { clientPlusMinusDummyData } from '../../../../core/my-ledger-dummy-data';
import { NgbDropdownModule, NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-client-plus-minus',
  standalone: true,
  imports: [CommonModule,NgbPaginationModule,ReactiveFormsModule,FormsModule,NgbDropdownModule,NgbModule],
  templateUrl: './client-plus-minus.component.html',
  styleUrl: './client-plus-minus.component.scss'
})
export class ClientPlusMinusComponent {
  clientPlusMinus:FormGroup
  allDataUser:ClientPlusMinus[]=[]
  currentDateFrom:any;
  currentDateTo:any;
  masterData:any;
  totalItems: number = 10; // Total number of items
  currentPage: number = 1; // Current page number
  itemsPerPage: number = 10; // Number of items per page
  pageSizeOptions: number[] = [5, 10, 20, 50];
  searchQuery: string = ''; // This binds to the input field and displays selected option
  selectedOption: string = ''; // This stores the selected option
  options: string[] = ['Ledger Type 1', 'Ledger Type 2', 'Ledger Type 3', 'Ledger Type 4']; // Example options
  filteredOptions: string[] = [];
  
  constructor() { }

  ngOnInit(): void {
    this.clientPlusMinusForm()
    // this.allDataUser = clientPlusMinusDummyData;

  }
  clientPlusMinusForm(){
    // this.currentDateFrom = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    // this.currentDateTo = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.clientPlusMinus = new FormGroup({
      client:new FormControl(),
      dateFrom:new FormControl(this.currentDateFrom),
      dateTo:new FormControl(this.currentDateFrom)
    });
  }
  onSubmit(){}
  onSearchChange(searchQuery: string): void {
    this.filteredOptions = this.options.filter(option =>
      option.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  onSelectOption(option: string): void {
    this.selectedOption = option; // Store the selected option
    this.searchQuery = option; // Update the input field with the selected option
    console.log('Selected option:', this.selectedOption); // For debugging purposes
    // Add additional logic here if needed, such as filtering table data based on the selection
  }

  onFocus(): void {
    this.filteredOptions = this.options; // Reset the filtered options when the input is focused
  }
}
