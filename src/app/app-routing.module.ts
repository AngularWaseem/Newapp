import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import {SignupComponent} from './signup/signup.component'
import { HomeComponent} from './home/home.component';
import {ErrorComponent} from './error/error.component';
import { EditComponent } from './edit/edit.component';
import { AddpostComponent} from './addpost/addpost.component';
import {AllpostComponent} from './allpost/allpost.component';
const routes: Routes = [
  { path: 'user', component: UserComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  {path : 'home', component : HomeComponent},
  {path : '', component : HomeComponent},
  {path : 'error', component : ErrorComponent},
  {path : 'edit', component : EditComponent},
  {path : 'add', component : AddpostComponent},
  {path : 'allpost', component : AllpostComponent},
  
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
