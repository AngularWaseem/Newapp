import { Component, OnInit, Input,OnChanges,Output,EventEmitter } from '@angular/core';
import {ActivatedRoute,Router} from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { EditService } from '../service/edit.service';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit,OnChanges {
  
  formGroup: FormGroup;
  isValid: boolean = true;
  id: string;
  @Output() editDone = new EventEmitter();
  ngOnChanges(){
    console.log(this.post);

this.id=this.post._id;
    }
  
  @Input() post : any;
  constructor(private _editService:EditService,private _router: Router,private _activatedRoute: ActivatedRoute,private formBuilder: FormBuilder) {
    
    console.log('inside the Edit');
   }
   createForm() {
    this.formGroup = this.formBuilder.group({
      'ptitle': ['', Validators.required],
      'pdesc': ['', Validators.required],
      'id': ['', Validators.required]
    });
    
  }
  ngOnInit() {
    //console.log(this.post);
    this.createForm();
  }
  onSubmit() : void {
    
    //console.log(this.formGroup.get('ptitle').value);
    
    //console.log(this.formGroup.get('pdesc').value);
    const obj = {
      
      ptitle: this.formGroup.get('ptitle').value,
      pdesc:  this.formGroup.get('pdesc').value,
      uname :localStorage.getItem('username')
      //date: date
    };
    if(this.formGroup.get('ptitle').value !="" &&
    this.formGroup.get('pdesc').value !="" ){
         if (this.isValid) {
          this._editService.updatePost(this.id,obj).subscribe((res) => {
            this.editDone.emit();
        },
        (error: any) => {
            console.log(error);
        });
          
        //this.editDone.emit();
          /*this._editService.updatePost(this.id,obj
            //this.formGroup.get('id').value,
          //this.formGroup.get('ptitle').value,
          //this.formGroup.get('pdesc').value,localStorage.getItem('username')
          //,new Date(Date.now())
          );*/
          this.editDone.emit();
         }

         


         //.subscribe(res => console.log('Done'));

   
         //this.formGroup.reset();
        // this._router.navigate(["user"]);
         //this.editDone.emit();
        }
    //if(this.formGroup.get('password').value == 'admin' && this.formGroup.get('password').value == 'admin'){
     //this.router.navigate(["user"]);
    //}else {
    //  alert("inside onSubmit Invalid credentials");
  //  }
 // }
 
  }
}
