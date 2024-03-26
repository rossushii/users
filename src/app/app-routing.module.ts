import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/guards/auth.guard';
const routes: Routes = [
  {
    path: '', redirectTo: 'dashboard', pathMatch: 'full'
  },
  {
    path: 'login', loadChildren: () => import('./module/login/login.module').then(m => m.LoginModule)
  },
  
  {
    path: 'dashboard', canActivate:[AuthGuard], loadChildren: () => import('./module/dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: 'profile', canActivate:[AuthGuard], loadChildren: () => import('./module/profile/profile.module').then(m => m.ProfileModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
