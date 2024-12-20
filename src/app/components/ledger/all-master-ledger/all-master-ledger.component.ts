import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MasterLedger } from '../ledger.interface';
// import { masterLedgerDenaHeDummyData, masterLedgerLenaHeDummyData } from '../../../../core/all-master-ledger-dummy-data';
import { LedgerService } from '../ledger.service';

@Component({
  selector: 'app-all-master-ledger',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './all-master-ledger.component.html',
  styleUrl: './all-master-ledger.component.scss'
})
export class AllMasterLedgerComponent implements OnInit{
  lenaLedgers: MasterLedger[] = [];
  denaLedgers: MasterLedger[] = [];

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
    this.ledgerService.getMasterLedger().subscribe({
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
    // this.denaTotalOpenBal = this.denaLedgers.reduce((acc, ledger) => acc + ledger.op, 0);
    // this.denatoTalCurrBal = this.denaLedgers.reduce((acc, ledger) => acc + ledger.curr, 0);
    // this.lenaTotalClsBal = this.denaLedgers.reduce((acc, ledger) => acc + ledger.cls, 0);
  }

}
