import { Routes } from "@angular/router";

export const reports: Routes = [
    { path: 'client',data:{title:'Client Reports',breadcrumb: "inPlay"},loadComponent:()=>import('./data-reports/data-reports.component').then(m=>m.DataReportsComponent)},
    { path: 'agent',data:{title:'Agent Reports',breadcrumb: "inPlay"},loadComponent:()=>import('./data-reports/data-reports.component').then(m=>m.DataReportsComponent)},
    { path: 'master',data:{title:'Master Reports ',breadcrumb: "inPlay"},loadComponent:()=>import('./data-reports/data-reports.component').then(m=>m.DataReportsComponent)},
    { path: 'super',data:{title:'Super Reports',breadcrumb: "inPlay"},loadComponent:()=>import('./data-reports/data-reports.component').then(m=>m.DataReportsComponent)},
    { path: 'sub',data:{title:'Sub Reports',breadcrumb: "inPlay"},loadComponent:()=>import('./data-reports/data-reports.component').then(m=>m.DataReportsComponent)},
    {path:'login/client',data:{title:'Login Client Reports',breadcrumb: "client"},loadComponent:()=>import('./all-login-reports/all-login-reports.component').then(m=>m.AllLoginReportsComponent)},
    {path:'login/agent',data:{title:'Login agent Reports',breadcrumb: "agent"},loadComponent:()=>import('./all-login-reports/all-login-reports.component').then(m=>m.AllLoginReportsComponent)},
    {path:'login/master',data:{title:'Login Master Reports',breadcrumb: "master"},loadComponent:()=>import('./all-login-reports/all-login-reports.component').then(m=>m.AllLoginReportsComponent)},
    {path:'login/super',data:{title:'Login super Reports',breadcrumb: "super"},loadComponent:()=>import('./all-login-reports/all-login-reports.component').then(m=>m.AllLoginReportsComponent)},

]