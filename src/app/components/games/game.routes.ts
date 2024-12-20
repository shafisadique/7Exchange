import { Routes } from '@angular/router';

export const games: Routes = [
   
    { path: 'inplay-details',data:{title:'INPLAY',breadcrumb: "inPlay"},loadComponent:()=>import('./in-play-game/in-play-game.component').then(m=>m.InPlayGameComponent)},
    { path: 'match-position/:id',data:{title:'Match Position',breadcrumb: "inPlay"},loadComponent:()=>import('./match-position/match-position.component').then(m=>m.MatchPositionComponent)},
    { path: 'display-match-session/:id',data:{title:'Match Session',breadcrumb: "match-session"},loadComponent:()=>import('./display-match-session/display-match-session.component').then(m=>m.DisplayMatchSessionComponent)},
    { path: 'view-match-reports/:id',data:{title:'Display Match Details',breadcrumb: "display-match-details"},loadComponent:()=>import('./view-match-report/view-match-report.component').then(m=>m.ViewMatchReportComponent)},
    { path: 'view-session-reports/:id',data:{title:'View Session Reports',breadcrumb: "view-session-reports"},loadComponent:()=>import('./view-session-report/view-session-report.component').then(m=>m.ViewSessionReportComponent)},
    { path: 'session-plus-minus-select/:id',data:{title:'Match & Session Plus Minus Report:',breadcrumb: "view-session-reports"},loadComponent:()=>import('./session-plus-minus-select/session-plus-minus-select.component').then(m=>m.SessionPlusMinusSelectComponent)},
    { path: 'complete-game',data:{title:'COMPLETE GAME',breadcrumb: "complete-game"},loadComponent:()=>import('./complete-game/complete-game.component').then(m=>m.CompleteGameComponent)},
    { path: 'cancel-bets',data:{title:'CANCEL BETS',breadcrumb: "complete-game"},loadComponent:()=>import('./cancel-bets/cancel-bets.component').then(m=>m.CancelBetsComponent)},
    { path: 'delete-bets/session/:id',data:{title:'Match Cancle Bets',breadcrumb: "complete-game"},loadComponent:()=>import('./delete-bets-session/delete-bets-session.component').then(m=>m.DeleteBetsSessionComponent)},
    { path: 'i/match-session-plus-minus-display',data:{title:'Match & Session Plus Minus Report',breadcrumb: "Match & Session Plus Minus Report"},loadComponent:()=>import('./match-session-plus-minus-display/match-session-plus-minus-display.component').then(m=>m.MatchSessionPlusMinusDisplayComponent)},


]
