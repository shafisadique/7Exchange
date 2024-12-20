import { Routes } from '@angular/router';

export const ledger: Routes = [   
    { path: 'my-ledger',data:{title:'MY LEDGER',breadcrumb: "inPlay"},loadComponent:()=>import('./my-ledger/my-ledger.component').then(m=>m.MyLedgerComponent)},
    { path: 'client/pm',data:{title:'CLIENT PLUS MINUS',breadcrumb: "plus-minus"},loadComponent:()=>import('./client-plus-minus/client-plus-minus.component').then(m=>m.ClientPlusMinusComponent)},
    { path: 'client',data:{title:'ALL CLIENT',breadcrumb: "all-client"},loadComponent:()=>import('./all-client-ledger/all-client-ledger.component').then(m=>m.AllClientLedgerComponent)},
    { path: 'agent',data:{title:'ALL AGENT',breadcrumb: "all-agent"},loadComponent:()=>import('./all-agent-ledger/all-agent-ledger.component').then(m=>m.AllAgentLedgerComponent)},
    { path: 'super',data:{title:'ALL SUPER',breadcrumb: "all-super"},loadComponent:()=>import('./all-super-ledger/all-super-ledger.component').then(m=>m.AllSuperLedgerComponent)},
    { path: 'master',data:{title:'ALL MASTER',breadcrumb: "all-master"},loadComponent:()=>import('./all-master-ledger/all-master-ledger.component').then(m=>m.AllMasterLedgerComponent)},

]
