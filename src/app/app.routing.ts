import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuardService} from './services/auth-guard.service';
import {LoginComponent} from './views/pages/login.component';
import {RegisterComponent} from './views/pages/register.component';
import {ResetPasswordComponent} from './views/pages/reset-password.component';

// Import Containers
import {
  FullLayoutComponent,
  SimpleLayoutComponent
} from './containers';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
    
  },
  {
    path: 'login',
    component: LoginComponent,
    
  },
  {
    path: 'resetPassword',
    component: ResetPasswordComponent,
    
  },
  {
    path: 'signUp',
    component: RegisterComponent,
    
  },
  {
    path: '',
    component: FullLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'dashboard',
        loadChildren: './views/dashboard/dashboard.module#DashboardModule'
      }
    ],
    canActivate: [AuthGuardService]
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
