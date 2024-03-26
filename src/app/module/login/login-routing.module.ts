import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotPasswordGuard } from '../../services/guards/forgotpassword.guard';
import { LoggedInGuard } from '../../services/guards/logged-in.guard';
import { AcknowledgmentComponent } from './forgotpassword/acknowledgment/acknowledgment.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path:'',
    component: LoginComponent
  },
  {
    path: 'forgotpassword', 
    component: ForgotpasswordComponent,
    canActivate: [LoggedInGuard]
  },
  { 
    path: 'forgotpassword/acknowledgment', 
    component: AcknowledgmentComponent,
    canActivate: [ForgotPasswordGuard] 
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
