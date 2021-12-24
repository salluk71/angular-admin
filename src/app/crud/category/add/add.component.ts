import { Router} from '@angular/router';
import  Swal  from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import {FormGroup , FormControl, Validators} from '@angular/forms';
import { CategoryService } from 'src/app/services/crud/category.service';

@Component({
  selector: 'app-category-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  submitted:boolean = false;
  loaderActive:boolean=false;
  formdata = new FormData();
  RouterMain = this.router.url.split('/').filter( n => n != '')[1];

  constructor(private _httpService:CategoryService, private router:Router) { }
  ngOnInit(): void {
    console.log();
  }


  form = new  FormGroup({
      title : new FormControl('', [Validators.required]),
      image: new FormControl('')    
  })

  uploadImage(data:any){ 
    this.formdata.append('image' , data.target.files[0]);
  }
  get f(){ return this.form.controls; }

  onSubmit(form:any){     
    this.submitted= true;
    if(this.form.invalid){ return }
    this.loaderActive = true;

    this.formdata.append('title' , this.form.get('title')?.value);
  
    try {
      this._httpService.add(this.formdata).subscribe((res:any)=> {
        if(res.status){
          this.router.navigate([`admin/${this.RouterMain}`]);
          Swal.fire('' , res.message, 'success');
        }else{
          Swal.fire('' , res.message, 'error');
        }
      }, (res:any)=> {       
         Swal.fire('' , res.error.message, 'error');
      })     
      this.loaderActive = false;     
    } catch (error:any) {
      Swal.fire('' , 'Something went wrong', 'error');
    }
    
  }

}
