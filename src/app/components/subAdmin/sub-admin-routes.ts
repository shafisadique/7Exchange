import { Routes } from '@angular/router';

export const subAdmin: Routes = [
    { path: '', redirectTo: 'sub-admin',pathMatch: 'full'},
    { path: '',data:{breadcrumb: "Sub-admin-details"},loadComponent:()=>import('./sub-admin-details/sub-admin-details.component').then(m=>m.SubAdminDetailsComponent)},
    { path: 'sub-admin-create',data:{breadcrumb: "Sub-admin-create"},loadComponent:()=>import('./sub-admin-create/sub-admin-create.component').then(m=>m.SubAdminCreateComponent)},
    { path: 'sub-admin-modify/:id',data:{breadcrumb: "Sub-admin-modify"},loadComponent:()=>import('./sub-admin-modify/sub-admin-modify.component').then(m=>m.SubAdminModifyComponent)},
    { path: 'sub-admin-limit',data:{breadcrumb: "Sub-admin-Limit"},loadComponent:()=>import('./sub-admin-limit/sub-admin-limit.component').then(m=>m.SubAdminLimitComponent)},

]
