import { Routes } from '@angular/router';

export const client: Routes = [
    { path: '', redirectTo: 'client', pathMatch: 'full' },
    { path: '',loadComponent:()=>import('./client-details/client-details.component').then(m=>m.ClientDetailsComponent)},
    { path: 'client-create',loadComponent:()=>import('./client-create/client-create.component').then(m=>m.ClientCreateComponent)},
    { path: 'client-create/:id',loadComponent:()=>import('./client-create/client-create.component').then(m=>m.ClientCreateComponent)},
    { path: 'client-modify/:id',loadComponent:()=>import('./client-modify/client-modify.component').then(m=>m.ClientModifyComponent)},
    { path: 'client-limit',loadComponent:()=>import('./client-limit/client-limit.component').then(m=>m.ClientLimitComponent)},
    { path: 'client-limit/:id',loadComponent:()=>import('./client-limit/client-limit.component').then(m=>m.ClientLimitComponent)}

]
