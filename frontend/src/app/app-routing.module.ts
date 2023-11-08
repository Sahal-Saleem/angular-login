import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ProfileComponent } from './components/profile/profile.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { ErrorComponent } from './components/error/error.component';
import { UserAuthGuard } from './guards/userAuth.guard'; 
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';

const routes: Routes = [
  { path : '' , component : HomeComponent},
  { path : 'login', component : LoginComponent},
  { path : 'signup', component : SignupComponent},
  { path : 'profile', component : ProfileComponent, canActivate : [UserAuthGuard]},
  { path : 'editProfile', component : EditProfileComponent},
  { path : 'adminLogin', component : AdminLoginComponent},
  { path : 'adminHome', component : AdminHomeComponent},
  { path : '**', component : ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
