import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import { PasswordChangeComponent } from './password-change/password-change.component';
import { LoginComponent } from './login/login.component';
import { SystemScreenComponent } from './system-screen/system-screen.component';
import { AuthGuard } from './auth.guard';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';

const routes: Routes = [
  { path: 'forget-password', component: ForgetPasswordComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'password-change', component: PasswordChangeComponent,canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'system-screen', component: SystemScreenComponent, canActivate: [AuthGuard] },
  // { path: '', redirectTo: '/login', pathMatch: 'full' },
  // { path: '**', redirectTo: '/login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
