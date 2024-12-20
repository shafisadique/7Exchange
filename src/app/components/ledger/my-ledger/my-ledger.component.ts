import { Component } from '@angular/core';
import { Ledger } from '../ledger.interface';
// import { ledgerDummyData } from '../../../../core/my-ledger-dummy-data';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbDropdownModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LedgerService } from '../ledger.service';

@Component({
  selector: 'app-my-ledger',
  standalone: true,
  imports: [CommonModule, FormsModule, NgbDropdownModule, NgbModule],
  templateUrl: './my-ledger.component.html',
  styleUrl: './my-ledger.component.scss'
})
export class MyLedgerComponent {
  isBodyLoading = false;
  data: Ledger[] = [];
  totalDebit: number = 0;
  modelFrom: Date | null = null;
  modelTo: Date | null = null;
  totalCredit: number = 0;
  totalBalance: number = 0;
  currenPage:number=1
  searchQuery: string = ''; // This binds to the input field and displays selected option
  selectedOption: string = ''; // This stores the selected option
  options: string[] = ['Ledger Type 1', 'Ledger Type 2', 'Ledger Type 3', 'Ledger Type 4']; // Example options
  filteredOptions: string[] = [];
  pageSize:any=0;
  totalBal:number;
  constructor(private router: Router,private ledgerService:LedgerService) { }

  ngOnInit(): void {
    this.getMyLedger(this.currenPage)
    // this.getLedgerData(this.pageSize);
    // this.data = ledgerDummyData;
    this.calculateTotals();
    this.filteredOptions = this.options;
  }

  getMyLedger(page:number){
    this.ledgerService.getLedger(page-1).subscribe({
      next:(res:any)=>{
        this.data = res.list;
        this.totalBal = res.bal;
      }
    })
  }

  // getLedgerData(page:number){
  //   this.ledgerService.getLedger(page).subscribe({
  //     next:(res:any)=>{
  //       console.log(res)
  //     }
  //   })
  // }

  calculateTotals(): void {
    // this.totalDebit = this.data.reduce((accumulator, ledger) => accumulator + ledger.Debit, 0);
    // this.totalCredit = this.data.reduce((accumulator, ledger) => accumulator + ledger.Credit, 0);
    // this.totalBalance = this.data.reduce((accumulator, ledger) => accumulator + ledger.Balance, 0);
  }

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