import { Routes } from '@angular/router';
import { ContentLayoutComponent } from './shared/components/layout/content-layout/content-layout.component';
import { content } from './shared/routes/content-routes';
import { LoginComponent } from './login/login.component';
import { FullLayoutComponent } from './shared/components/layout/full-layout/full-layout.component';
import { fullRoutes } from './shared/routes/full-routes';

export const routes: Routes = [
    
    {
        path: "auth/login",
        component: LoginComponent,
    },
    {
        path: '',
        component: ContentLayoutComponent,
        children: content
    },{
        path:'',
        component:FullLayoutComponent,
        children:fullRoutes
    }
];
