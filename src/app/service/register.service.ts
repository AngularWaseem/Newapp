import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common//http';
@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  uri = 'http://localhost:3000/api';
  constructor(private http: HttpClient) { }
  //addUser(first_Name, last_Name, e_mail,pass_word,confirm_Password) {
    addUser(fname, lname,address, email,uname, pwd) {
      console.log('inside the registeration service');

    const obj = {
      firstName: fname,
      lastName: lname,
      address :address,
      email: email,
      uname: uname,
      password: pwd
    };
    console.log(obj);
    this.http.post(`${this.uri}/add`, obj)
        .subscribe(res => console.log('Done'));
  }

  
}
