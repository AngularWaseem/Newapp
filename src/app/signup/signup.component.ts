import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { RegisterService } from '../service/register.service';
import { Register } from '../model/register';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  isValid: boolean = true;
  posts: Array<Register>;
  constructor(private _registerService: RegisterService,private _formBuilder: FormBuilder) {}

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      address: ['', Validators.required],
      email: ['', Validators.required]
    });
    this.thirdFormGroup = this._formBuilder.group({
      userid: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.isValid = false;
  }

  onReset() {
    
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
     console.log(this.firstFormGroup.get('firstname').value);
     console.log(this.firstFormGroup.get('lastname').value);
     console.log(this.secondFormGroup.get('address').value);
     console.log(this.secondFormGroup.get('email').value);
     console.log(this.thirdFormGroup.get('userid').value);
     console.log(this.thirdFormGroup.get('password').value);
     
if(this.firstFormGroup.get('firstname').value !="" &&
this.firstFormGroup.get('lastname').value !="" &&
this.secondFormGroup.get('address').value !="" &&
this.secondFormGroup.get('email').value !="" &&
this.thirdFormGroup.get('userid').value !="" &&
this.thirdFormGroup.get('password').value !="" 
){this.isValid = true;
     if (this.isValid) {
      this._registerService.addUser(this.firstFormGroup.get('firstname').value,
      this.firstFormGroup.get('lastname').value, this.secondFormGroup.get('address').value, this.secondFormGroup.get('email').value,
      this.thirdFormGroup.get('userid').value,this.thirdFormGroup.get('password').value);
     }
     this.firstFormGroup.reset();
    this.secondFormGroup.reset();
    this.thirdFormGroup.reset();
    }
  }
}