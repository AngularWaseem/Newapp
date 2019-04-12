import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common//http';
@Injectable({
  providedIn: 'root'
})
export class AddpostService {
  uri = 'http://localhost:3000/api';
  constructor(private http: HttpClient) { }
  //addUser(first_Name, last_Name, e_mail,pass_word,confirm_Password) {
    addPost(ptitle, pdesc,username
      //, date
      ) {
      console.log('inside the registeration service');

    const obj = {
      ptitle: ptitle,
      pdesc: pdesc,
      uname :username
      //date: date
    };
    console.log(obj);
    this.http.post(`${this.uri}/addpost`, obj)
        .subscribe(res => console.log('Done'));
  }
}
