import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import {ActivatedRoute,Router} from '@angular/router';
import {MatDialog} from '@angular/material';
import { LoginService } from '../service/login.service';
import { HttpClientModule } from '@angular/common/http'; 
import { HttpModule } from '@angular/http';

	
import { ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formGroup: FormGroup;
  username: string;
  password: string;
  isFormValid: boolean =true;
  constructor(private _loginService: LoginService,private _router: Router,private _activatedRoute: ActivatedRoute,private formBuilder: FormBuilder) { }
  createForm() {
    this.formGroup = this.formBuilder.group({
      'username': ['', Validators.required],
      'password': ['', Validators.required],
    });
    this.isFormValid = false;
  }
  ngOnInit() {
    this.createForm();
  }
  login() : void {
    if(this.username == 'admin' && this.password == 'admin'){
     this._router.navigate(["allpost"]);
    }else {
      alert("Invalid credentials");
    }
  }
  getError(el) {
    switch (el) {
      case 'user':
        if (this.formGroup.get('username').hasError('required')) {
          return 'Username required';
        }
        break;
      case 'pass':
        if (this.formGroup.get('password').hasError('required')) {
          return 'Password required';
        }
        break;
      default:
        return '';
    }
  }
  onSubmit() : void {
   /* alert(this.formGroup.get('password').value);
    console.log(this.formGroup.get('password').value);

    if(this.formGroup.get('password').value == 'admin' && this.formGroup.get('password').value == 'admin'){
     this.router.navigate(["user"]);
    }else {
      alert("inside onSubmit Invalid credentials");
    }*/
    console.log('onSubmit');
 
    this.isFormValid = true;
    console.log(this.formGroup.get('password').value);
    console.log(this.formGroup.get('username').value);

    if (this.isFormValid) {
      const user = {
        username: this.formGroup.get('username').value, // Username input field
        password: this.formGroup.get('password').value // Password input field
      };
      console.log('Form valid');
      console.log(user.username + '  ' + user.password );
      console.log('Formgroup value :' + this.formGroup.value);
      //this._loginService.login(this.formGroup.value).subscribe(data => {
               this._loginService.login(user).subscribe(data => {
               localStorage.setItem('token', data.toString());
              console.log(' Storage : ' + localStorage.getItem('token'));
              localStorage.setItem("username", user.username);
              console.log(' username : ' + localStorage.getItem('username'));
             // this.sto = true;
              this._router.navigate(['/allpost']);
            },
            error => { console.log('Error ');
            // this._router.navigate(['/error']);
             }
          );
          }
  }
    
  
}
