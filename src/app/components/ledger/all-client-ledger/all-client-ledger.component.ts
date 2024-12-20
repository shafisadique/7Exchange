import { Component } from '@angular/core';
import { ClientLedger } from '../ledger.interface';
// import { clientLedgerDenaHeDummyData, clientLedgerLenaHeDummyData } from '../../../../core/all-client-ledger-dummy-data';
import { CommonModule } from '@angular/common';
import { LedgerService } from '../ledger.service';

@Component({
  selector: 'app-all-client-ledger',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './all-client-ledger.component.html',
  styleUrl: './all-client-ledger.component.scss'
})
export class AllClientLedgerComponent {
  lenaLedgers: ClientLedger[] = [];
  denaLedgers: ClientLedger[] = [];
  lenaTotalOpenBal: number = 0;
  lenatoTalCurrBal: number = 0;
  lenaTotalClsBal: number = 0;
  denaTotalOpenBal: number = 0;
  denatoTalCurrBal: number = 0;
  denaTotalClsBal: number = 0;

  constructor(private ledgerService:LedgerService) {
    this.calculateTotals();
  }
  ngOnInit(): void {
    this.ledgerService.getClientLedger().subscribe({
      next:(res:any)=>{
        this.lenaLedgers = res.lena;
        this.denaLedgers = res.dena;
        this.lenaTotalOpenBal =res.totalLena.op;
        this.lenatoTalCurrBal =res.totalLena.curr;
        this.lenaTotalClsBal = res.totalLena.cls;
        this.denaTotalOpenBal =res.totalDena.op;
        this.denatoTalCurrBal =res.totalDena.curr;
        this.denaTotalClsBal = res.totalDena.cls;
      }
    })
  }

  calculateTotals(): void {
    // this.denaTotalOpenBal = this.denaLedgers.reduce((acc, ledger) => acc + ledger.openBal, 0);
    // this.denatoTalCurrBal = this.denaLedgers.reduce((acc, ledger) => acc + ledger.currBal, 0);
    // this.lenaTotalClsBal = this.denaLedgers.reduce((acc, ledger) => acc + ledger.clsBal, 0);
  }

}
