import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgBootstrapFormValidationModule, CUSTOM_ERROR_MESSAGES } from 'ng-bootstrap-form-validation';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { CustomMaterialModule } from './core/material.module';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import {CUSTOM_ERRORS} from './validation/custom-error';
import { AddpostComponent } from './addpost/addpost.component';
import { AllpostComponent } from './allpost/allpost.component'
import { LoginService } from './service/login.service';
import { RegisterService } from './service/register.service'
import { ErrorComponent } from './error/error.component';
import { AddpostService } from './service/addpost.service';
import { GetpostService } from './service/getpost.service';
import { EditService } from './service/edit.service';
import { EditComponent } from './edit/edit.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserComponent,
    HeaderComponent,
    HomeComponent,
    SignupComponent,
    AddpostComponent,
    AllpostComponent,
    ErrorComponent,
    EditComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    CustomMaterialModule,
    FormsModule,
    HttpClientModule,
    NgBootstrapFormValidationModule.forRoot(),
    NgBootstrapFormValidationModule,
    AppRoutingModule
  ],
  providers: [LoginService,RegisterService,AddpostService,GetpostService,EditService,{
    provide: CUSTOM_ERROR_MESSAGES,
    useValue: CUSTOM_ERRORS,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
