import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import {MatDialog} from '@angular/material';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import {Router} from '@angular/router';
import { AddpostService } from '../service/addpost.service';
import { Post } from '../model/post';
@Component({
  selector: 'app-addpost',
  templateUrl: './addpost.component.html',
  styleUrls: ['./addpost.component.css']
})
export class AddpostComponent implements OnInit {
  formGroup: FormGroup;
  isValid: boolean = true;
  isResult: boolean = false;
  @Output() addDone = new EventEmitter();
  posts: Array<Post>;
  constructor(private _addpostService: AddpostService,private router: Router,private formBuilder: FormBuilder) { }
  createForm() {
    this.formGroup = this.formBuilder.group({
      'ptitle': ['', Validators.required],
      'pdesc': ['', Validators.required],
    });
    this.isResult= false;
  }
  getError(el) {
    switch (el) {
      case 'ptitle':
        if (this.formGroup.get('ptitle').hasError('required')) {
          return 'Post Title required';
          this.isResult= false;
        }
        break;
      case 'pdesc':
        if (this.formGroup.get('pdesc').hasError('required')) {
          return 'Post Description required';
          this.isResult= false;
        }
        break;
      default:
        return '';
    }
  }
  ngOnInit() {
    this.createForm();
  }
  onSubmit() : void {
    
    console.log(this.formGroup.get('ptitle').value);
    
    console.log(this.formGroup.get('pdesc').value);

    if(this.formGroup.get('ptitle').value !="" &&
    this.formGroup.get('pdesc').value !="" ){
         if (this.isValid) {
          this._addpostService.addPost(this.formGroup.get('ptitle').value,
          this.formGroup.get('pdesc').value,localStorage.getItem('username')
          //,new Date(Date.now())
         
          );
          this.isResult= true;
          this.formGroup.reset();
         }
         
        
        }
        this.addDone.emit();
    //if(this.formGroup.get('password').value == 'admin' && this.formGroup.get('password').value == 'admin'){
     this.router.navigate(["allpost"]);
    //}else {
    //  alert("inside onSubmit Invalid credentials");
  //  }
 // }
  }
}
