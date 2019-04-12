import { Component, OnInit } from '@angular/core';
import { Post } from '../model/post';
import { GetpostService } from '../service/getpost.service';
import {ActivatedRoute,Router} from '@angular/router';
import { EditComponent } from '../edit/edit.component';
export interface Posts {
  ptitle: string;
  pdesc: string;
  uname: string;
  }
/**
 * @title Basic use of `<table mat-table>`
 */
@Component({
  selector: 'app-allpost',
  templateUrl: './allpost.component.html',
  styleUrls: ['./allpost.component.css']
})
export class AllpostComponent implements OnInit {
//displayedColumns: string[] = ['PostTitle', 'PostDescription','Posted By'];
  //dataSource = ELEMENT_DATA;
  public dataSource: Posts[] = [];
  isLoading = false;
  postvariable : any;
  isValid: boolean = false;
  constructor(private _getpostService: GetpostService,private _router: Router,private _activatedRoute: ActivatedRoute) {}

  ngOnInit(): any {
    this.getAllPost();
    
  }

  getAllPost(){
    this._getpostService.getAllposts()
    .subscribe((data:Posts[]) => {
      this.dataSource = data;
      console.log(this.dataSource);
    });
  }
  deleteRouter(_id) {

    this._getpostService.deleteRouter(_id).subscribe(res => {
    
    this._router.navigate(['/user']);
    
    console.log('Deleted');
    this.getAllPost();
    });
    
  
    
    }

    addpost(){
      this._router.navigate(['/add']);
    }
    editpost(post){
      
      this.postvariable=post;
      this.isValid=true;
      
    }
  onRowClicked(row) {
    console.log('Row clicked: ', row);
}

editDone(){
  this.isValid=false;
  this.getAllPost();
}

addDone(){
  this.getAllPost();
}
}
