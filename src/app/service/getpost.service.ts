import { Injectable } from '@angular/core';
import { Post } from '../model/post';

import { HttpClient } from '@angular/common//http';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class GetpostService {

  uri = 'http://localhost:3000/api/getpost';
  
  constructor(private http: HttpClient, private router: Router) {}
  getAllposts() {
    return this.http.get(`${this.uri}`);
    }

    deleteRouter(id) {

      return this.http.delete(`http://localhost:3000/api/delete/${id}`);
      
      }
}
