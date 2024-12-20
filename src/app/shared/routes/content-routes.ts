import { Routes } from '@angular/router';
import { AuthGuard } from '../guard/auth.guard';
import { LoaderComponent } from '../components/loader/loader.component';

export const content: Routes = [
    {
        path:'',
        redirectTo:'/dashboard',
        pathMatch:'full'
    },
    {
        path:'profile',loadComponent:()=>import('../../components/profile/profile.component').then(r=>r.ProfileComponent),
        canActivate: [AuthGuard],
    },
    {
        path: 'dashboard',
        data: {
            title: "Dashboard",
            breadcrumb: "sample-page",
        },
        canActivate: [AuthGuard],
        loadComponent:()=>import('../../components/dashboard/dashboard.component').then(r =>r.DashboardComponent)
        // loadChildren: () => import('../../../app/components/pages/pages.routes').then(r => r.pages)
    },
    // {
    //     path: 'sample-page',
    //     data: {
    //         title: "sample-page",
    //         breadcrumb: "sample-page",

    //     },
    //     loadChildren: () => import('../../../app/components/sample-page/sample-pages.routes').then(r => r.samplePages)
    // },
    { path:'sub-admin', data: {
        title: "SUB ADMIN",
        breadcrumb: "Sub-Admin",
        roles: ['ADMIN']
    },
    canActivate: [AuthGuard] , 
    loadChildren:()=>import('../../components/subAdmin/sub-admin-routes').then(m=>m.subAdmin)},
    { path:'master', data: {
        title: "MASTER",
        breadcrumb: "MASTER",
        roles: ['ADMIN','SUB']
    },
    canActivate: [AuthGuard] ,
     loadChildren:()=>import('../../components/master/master.routes').then(m=>m.master)},
    
    { path:'super', data: {
        title: "SUPER",
        breadcrumb: "SUPER",
        roles: ['ADMIN','SUB','MASTER']
    },canActivate: [AuthGuard] , loadChildren:()=>import('../../components/super/super.routes').then(m=>m.Super)},

    { path:'agent', data: {
        title: "AGENT",
        breadcrumb: "Agent",
        roles: ['ADMIN','SUB','MASTER','SUPER']
    },canActivate: [AuthGuard] , loadChildren:()=>import('../../components/agent/agent.routes').then(m=>m.Agnet)},

    { path:'client', data: {
        title: "CLIENT",
        breadcrumb: "client",
        roles: ['ADMIN', 'MASTER','SUB','AGENT']
    },canActivate: [AuthGuard] , loadChildren:()=>import('../../components/client/client.routes').then(m=>m.client)},

    { path:'game', data: {
        breadcrumb: "game",
        roles: ['ADMIN', 'MASTER','SUPER','AGENT','SUB']
    } , loadChildren:()=>import('../../components/games/game.routes').then(m=>m.games)},
    
    { path:'ledger', data: {
        breadcrumb: "game",
        roles: ['ADMIN', 'MASTER','SUPER','AGENT','SUB']
    },canActivate: [AuthGuard] , loadChildren:()=>import('../../components/ledger/ledger.routes').then(m=>m.ledger)},
     
    { path:'cash-transaction', data: {
        breadcrumb: "Cash Transaction",
        roles: ['ADMIN', 'MASTER','SUPER','AGENT','SUB']
    },canActivate: [AuthGuard] , loadChildren:()=>import('../../components/cash-transaction/cash-transaction.routes').then(m=>m.cashTransaction)},
    
    { path:'report', data: {
        breadcrumb: "Report",
        roles: ['ADMIN', 'MASTER','SUPER','AGENT','SUB']
    },canActivate: [AuthGuard] , loadChildren:()=>import('../../components/reports/report.routes').then(m=>m.reports)},

    { path:'report', data: {
        breadcrumb: "Report",
        roles: ['ADMIN', 'MASTER','SUPER','AGENT','SUB']
    },canActivate: [AuthGuard] , loadChildren:()=>import('../../components/reports/report.routes').then(m=>m.reports)},
    
]