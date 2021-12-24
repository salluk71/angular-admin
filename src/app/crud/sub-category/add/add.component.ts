import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SubCategoryService } from 'src/app/services/crud/sub-category.service';
import { CategoryService } from 'src/app/services/crud/category.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  submitted:boolean = false;
  loaderActive:boolean=false;
  formdata = new FormData();
  RouterMain = this.router.url.split('/').filter( n => n != '')[1];
  category:any;

  constructor(private _httpService:SubCategoryService, private categiryService:CategoryService, private router:Router) { 
    this.categiryService.view().subscribe((res:any)=> {
      if(res.res){
        this.category = res.res    
      }else{
        Swal.fire('Oops','Category not found','info')
      }
    })
  }
  ngOnInit(): void {}


  form = new  FormGroup({
      category : new FormControl('', [Validators.required]),
      title : new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
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

    this.formdata.append('category' , this.form.get('category')?.value);
    this.formdata.append('title' , this.form.get('title')?.value);
    this.formdata.append('description' , this.form.get('description')?.value);
  
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
