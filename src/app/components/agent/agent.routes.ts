import { Routes } from '@angular/router';

export const Agnet: Routes = [
    { path: '', redirectTo: 'agent', pathMatch: 'full' },
    { path: '',data:{breadcrumb: "agent-details"},loadComponent:()=>import('./agent-details/agent-details.component').then(m=>m.AgentDetailsComponent)},
    { path: 'agent-create',data:{breadcrumb: "agent-create"},loadComponent:()=>import('./agent-create/agent-create.component').then(m=>m.AgentCreateComponent)},
    { path: 'agent-create/:id',data:{breadcrumb: "agent-create"},loadComponent:()=>import('./agent-create/agent-create.component').then(m=>m.AgentCreateComponent)},
    { path: 'agent-modify/:id',data:{breadcrumb: "agent-modify"},loadComponent:()=>import('./agent-modify/agent-modify.component').then(m=>m.AgentModifyComponent)},
    { path: 'agent-limit',data:{breadcrumb: "agent-limit"},loadComponent:()=>import('./agent-limit/agent-limit.component').then(m=>m.AgentLimitComponent)},
    { path: 'agent-limit/:id',data:{breadcrumb: "agent-limit"},loadComponent:()=>import('./agent-limit/agent-limit.component').then(m=>m.AgentLimitComponent)}


]
