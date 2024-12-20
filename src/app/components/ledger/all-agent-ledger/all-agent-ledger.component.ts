import { Component } from '@angular/core';
import { AgentLedger } from '../ledger.interface';
// import { agentLedgerDenaHeDummyData, agentLedgerLenaHeDummyData } from '../../../../core/all-agent-ledger-dummy-data';
import { CommonModule } from '@angular/common';
import { LedgerService } from '../ledger.service';

@Component({
  selector: 'app-all-agent-ledger',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './all-agent-ledger.component.html',
  styleUrl: './all-agent-ledger.component.scss'
})
export class AllAgentLedgerComponent {
  lenaLedgers: AgentLedger[] = [];
  denaLedgers: AgentLedger[] = [];

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
    this.ledgerService.getAgentLedger().subscribe({
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
