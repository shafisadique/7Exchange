import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbDropdownModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
// import { cashTransactionDebitCreditDummyData } from '../../../../core/cash-transaction-debit-credit-dummy-data';
import { CashTransaction } from '../cash-transaction.interface';
import { CashTransactionService } from '../cash-transaction.service';
import { master } from '../../master/master.routes';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cash-transaction-debit-credit-entry',
  standalone: true,
  imports: [CommonModule, NgbPaginationModule, FormsModule, NgbDropdownModule],
  templateUrl: './cash-transaction-debit-credit-entry.component.html',
  styleUrl: './cash-transaction-debit-credit-entry.component.scss'
})
export class CashTransactionDebitCreditEntryComponent implements OnInit {
  totalItems: number; // Total number of items based on your dummy data
  currentPage: number = 1; // Current page number
  itemsPerPage: number = 10; // Number of items per page
  pageSizeOptions: number[] = [5, 10, 20, 50];
  currentMaster: boolean = false;
  currentSuper: boolean = false;
  currentAgent: boolean = false;
  currentClient: boolean = false;
  currentSub: boolean = false;
  searchQuery: any;
  options: any[] = []; // Options will be set dynamically based on URL
  filteredOptions: any[] = [];
  ledgerData: CashTransaction[] = [];
  paginatedLedgerData: CashTransaction[] = []; // Data for the current page
  currentURL = this.route.snapshot.url.join('/');
    
  // formData
  selectedOption: string = '';
  amount:number =0;
  remark:string ='';
  selectedCollection: number = 0;
  paymentType: string = '';
  collections: any[] = [];
  totalDebit: number = 0;
  totalCredit: number = 0;
  totalBalance: number = 0;
  optionId:number;
  constructor(private route: ActivatedRoute,private cashTransactionService:CashTransactionService,private toastrsService:ToastrService) {}

  ngOnInit(): void {
    const currentURL = this.route.snapshot.url.join('/'); // Get the current route segments
    if (currentURL.includes('sub')) {
      this.currentSub = true;
      this.options = [];
      this.collections = [];
      this.paginatedLedgerData = [];
      this.cashTransactionService.getAllSubCollection().subscribe({
        next:(res:any)=>{
          this.options= res.clients;
          this.collections = res.collections;
        }
      });
    }else if (currentURL.includes('master')) {
      this.currentMaster = true;
      this.options = [];
      this.collections = [];
      this.paginatedLedgerData = [];
      this.cashTransactionService.getAllMasterCollection().subscribe({
        next:(res:any)=>{
          this.options= res.clients;
          this.collections = res.collections;
          
        }
      });
    } else if (currentURL.includes('super')) {
      this.currentSuper = true;
      this.options = [];
      this.collections = [];
      this.paginatedLedgerData = [];
      this.cashTransactionService.getAllSuperCollection().subscribe({
        next:(res:any)=>{
          this.options= res.clients;
          this.collections = res.collections;
        }
      });
    } else if (currentURL.includes('agent')) {
      this.currentAgent = true;
      this.options = [];
      this.collections = [];
      this.paginatedLedgerData = [];
      this.cashTransactionService.getAllAgentCollection().subscribe({
        next:(res:any)=>{
          this.options= res.clients;
          this.collections = res.collections;
        }
      });
    } else if (currentURL.includes('client')) {
      this.currentClient = true;
      this.options = [];
      this.collections = [];
      this.paginatedLedgerData = [];
      this.cashTransactionService.getAllClientCollection().subscribe({
        next:(res:any)=>{
          this.options= res.clients;
          this.collections = res.collections;
        }
      });
    }

    this.filteredOptions = this.options; // Initialize filtered options
    this.ledgerData = [];
    this.calculateTotals();
    this.paginateData();
  }

  calculateTotals(): void {
    this.totalDebit = this.ledgerData.reduce((sum, current) => sum + current.debit, 0);
    this.totalCredit = this.ledgerData.reduce((sum, current) => sum + current.credit, 0);
    this.totalBalance = this.ledgerData.reduce((sum, current) => sum + current.balance, 0);
  }

  paginateData(): void {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedLedgerData = this.ledgerData.slice(start, end);
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.paginateData();
  }

  onSearchChange(searchQuery: string): void {
    this.filteredOptions = this.options.filter(option =>
      option.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }
  getAllMasterLedger(){
    if (this.currentURL.includes('master')) {
      const backend = this.currentPage - 1;
      this.cashTransactionService.getAllMasterLedger(this.optionId, backend).subscribe((res: any) => {
        this.paginatedLedgerData = res.list
        this.totalBalance = res.bal;
      });
    }
  }
  getAllSuperLedger(){
    if (this.currentURL.includes('super')) {
      const backend = this.currentPage - 1;
      this.cashTransactionService.getAllSuperLedger(this.optionId, backend).subscribe((res: any) => {
        this.paginatedLedgerData = res.list;
        this.totalBalance = res.bal;
      });
    }
  }
  getAllSubLedger() {
    if (this.currentURL.includes('sub')) {
        const backend = this.currentPage - 1;
        this.cashTransactionService.getAllSubLedger(this.optionId, backend).subscribe((res: any) => {
          this.paginatedLedgerData = res.list;
          this.totalBalance = res.bal;
        });
    }
  }

  getAllAgentLedger(){
    if (this.currentURL.includes('agent')) {
      const backend = this.currentPage - 1;
      this.cashTransactionService.getAllAgentLedger(this.optionId, backend).subscribe((res: any) => {
        this.paginatedLedgerData = res.list
        this.totalBalance = res.bal;
      });
    }
  }

  onSelectOption(option: any): void {
    this.optionId = option.id;
    this.selectedOption = option.id; // Assuming the option has an `id` field
    this.searchQuery = option.name; // Update the input field to reflect the selected option
     this.totalBalance = 0; 
     this.getAllMasterLedger();
     this.getAllSuperLedger();
     this.getAllSubLedger();
     this.getAllAgentLedger();
    // If you need to fetch data based on the selected option
    const currentURL = this.route.snapshot.url.join('/');
    
     
     if (currentURL.includes('agent')) {
      const backend = this.currentPage - 1;
      this.cashTransactionService.getAllAgentLedger(option.id, backend).subscribe((res: any) => {
        this.paginatedLedgerData = res.list
        this.totalBalance = res.bal;

      });
    }else if (currentURL.includes('client')) {
      const backend = this.currentPage - 1;
      this.cashTransactionService.getAllClientLedger(option.id, backend).subscribe((res: any) => {
        this.paginatedLedgerData = res.list
        this.totalBalance = res.bal;
      });
    }
  }
  
// this.cashTransactionService.getAllMasterLedgerSub().subscribe({
      //   next:(res:any)=>{
      //     this.paginatedLedgerData = res.dena;
      //     this.paginatedLedgerData = res.lena;
      //   }
      // });
  onFocus(): void {
    this.filteredOptions = this.options; // Reset the filtered options when the input is focused
  }
  
  getTotalCashTransaction() {

    if (!this.amount || this.amount <= 0) {
      this.toastrsService.warning('Amount must be greater than 0');
      return;
    }
    if (!this.paymentType) {
      this.toastrsService.warning('paymentType is not avaibale')
      return;
    }
    if (!this.selectedCollection || this.selectedCollection <= 0) {
      this.toastrsService.warning('Please select a valid collection');
      return;
    }
    const postData = {
      amount: this.amount,
      remark: this.remark,
      id: this.selectedOption,
      collection: this.selectedCollection,
      paymentType: this.paymentType,
    };
  
    const currentURL = this.route.snapshot.url.join('/');
    let postTransactionService;
  
    if (currentURL.includes('sub')) {
      postTransactionService = this.cashTransactionService.postAllSubTransaction(postData);
    } else if (currentURL.includes('master')) {
      postTransactionService = this.cashTransactionService.postAllMasterTransaction(postData);
    } else if (currentURL.includes('super')) {
      postTransactionService = this.cashTransactionService.postAllSuperTransaction(postData);
    } else if (currentURL.includes('agent')) {
      postTransactionService = this.cashTransactionService.postAllAgentTransaction(postData);
    } else if (currentURL.includes('client')) {
      postTransactionService = this.cashTransactionService.postAllClientTransaction(postData);
    }
  
    if (postTransactionService) {
      postTransactionService.subscribe({
        next: (response: any) => {
          this.ledgerData.unshift(response);
          this.getAllMasterLedger();
          this.getAllSuperLedger();
          this.getAllSubLedger();
          this.getAllAgentLedger();
          this.calculateTotals();
          this.amount = 0;
          this.remark = '';
          this.selectedOption = '';
          this.selectedCollection = 0;
          this.paymentType = '';
  
          console.log('Transaction added successfully:', response);
          
        },
        error: (error: any) => {
          console.error('Error posting transaction:', error);
          alert('Error: ' + (error.error?.msg || 'An unknown error occurred.'));
        },
      });
    }
  }
  

}
