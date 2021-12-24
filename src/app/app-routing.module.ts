import { ProfileComponent } from './crud/profile/profile.component';
import { AdminGuardGuard } from './guards/admin-guard.guard';
import { AuthGuard } from './guards/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrudComponent } from './crud/crud.component';
import { AuthComponent } from './auth/auth.component';
import { RegistrationComponent } from './auth/registration/registration.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { AdminChildGuard } from './guards/admin-child.guard';

const routes: Routes = [
  {
    path :'', component:AuthComponent, canActivate:[AdminGuardGuard],  pathMatch: 'full'    
  },
  {
    path:'registration', component : RegistrationComponent
  },
  {
    path:'reset-password', component : ResetPasswordComponent
  },
  {
    path:'admin', canActivateChild:[AdminChildGuard], component: CrudComponent, loadChildren: ()=> import('./crud/crud.module').then(mod=> mod.CrudModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
