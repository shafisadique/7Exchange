import { Routes } from '@angular/router';

export const Super: Routes = [
    { path: '', redirectTo: 'super', pathMatch: 'full' },
    { path: '',loadComponent:()=>import('./super-details/super-details.component').then(m=>m.SuperDetailsComponent)},
    { path: 'super-create',loadComponent:()=>import('./super-create/super-create.component').then(m=>m.SuperCreateComponent)},
    { path: 'super-create/:id',loadComponent:()=>import('./super-create/super-create.component').then(m=>m.SuperCreateComponent)},
    { path: 'super-limit',loadComponent:()=>import('./super-limit/super-limit.component').then(m=>m.SuperLimitComponent)},
    { path: 'super-limit/:id',loadComponent:()=>import('./super-limit/super-limit.component').then(m=>m.SuperLimitComponent)},
    { path: 'super-modify/:id',loadComponent:()=>import('./super-modify/super-modify.component').then(m=>m.SuperModifyComponent)},
]
