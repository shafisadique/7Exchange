import { Routes } from '@angular/router';

export const master: Routes = [
    { path: '', redirectTo: 'master', pathMatch: 'full' },
    { path: '',loadComponent:()=>import('./master-details/master-details.component').then(m=>m.MasterDetailsComponent)},
    { path: 'master-create',loadComponent:()=>import('./master-create/master-create.component').then(m=>m.MasterCreateComponent)},
    { path: 'master-create/:id',loadComponent:()=>import('./master-create/master-create.component').then(m=>m.MasterCreateComponent)},
    { path: 'master-limit',loadComponent:()=>import('./master-limit/master-limit.component').then(m=>m.MasterLimitComponent)},
    { path: 'master-limit/:id',loadComponent:()=>import('./master-limit/master-limit.component').then(m=>m.MasterLimitComponent)},
    { path: 'master-modify/:id',loadComponent:()=>import('./master-modify/master-modify.component').then(m=>m.MasterModifyComponent)},
]
