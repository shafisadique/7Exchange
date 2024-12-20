import { Routes } from '@angular/router';
import { UserRole } from '../../shared/services/role.enum';

export const cashTransaction: Routes = [  
    { path: 'sub',data:{title:'SUB',breadcrumb: "cash-transaction",roles: [UserRole.ADMIN]},loadComponent:()=>import('./cash-transaction-debit-credit-entry/cash-transaction-debit-credit-entry.component').then(m=>m.CashTransactionDebitCreditEntryComponent)},
    { path: 'master',data:{title:'MASTER',breadcrumb: "cash-transaction",roles: [UserRole.SUB,UserRole.ADMIN] },loadComponent:()=>import('./cash-transaction-debit-credit-entry/cash-transaction-debit-credit-entry.component').then(m=>m.CashTransactionDebitCreditEntryComponent)},
    { path: 'super',data:{title:'SUPER',breadcrumb: "cash-transaction",roles: [UserRole.SUB,UserRole.ADMIN,UserRole.MASTER] },loadComponent:()=>import('./cash-transaction-debit-credit-entry/cash-transaction-debit-credit-entry.component').then(m=>m.CashTransactionDebitCreditEntryComponent)},
    { path: 'agent',data:{title:'AGENT',breadcrumb: "cash-transaction",roles: [UserRole.SUB,UserRole.ADMIN,UserRole.MASTER,UserRole.SUPER] },loadComponent:()=>import('./cash-transaction-debit-credit-entry/cash-transaction-debit-credit-entry.component').then(m=>m.CashTransactionDebitCreditEntryComponent)},
    { path: 'client',data:{title:'CLIENT',breadcrumb: "cash-transaction",roles: [UserRole.SUB,UserRole.ADMIN,UserRole.MASTER,UserRole.SUPER,UserRole.PROVIDER] },loadComponent:()=>import('./cash-transaction-debit-credit-entry/cash-transaction-debit-credit-entry.component').then(m=>m.CashTransactionDebitCreditEntryComponent)},
 ]