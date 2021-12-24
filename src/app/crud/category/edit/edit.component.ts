import { Component, OnInit } from '@angular/core';
import {FormGroup , FormControl, Validators, FormBuilder} from '@angular/forms';
import { CategoryService } from 'src/app/services/crud/category.service';
import { ActivatedRoute, Router } from '@angular/router';
import  Swal  from 'sweetalert2';

@Component({
  selector: 'app-category-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  submitted:boolean = false;
  loaderActive:boolean=false;
  formdata = new FormData(); 
  image:string ='';
  form;
  id:any='';
  RouterMain = this.router.url.split('/').filter( n => n != '')[1];
  constructor(private fb:FormBuilder, private _httpService:CategoryService, private activatedRoute:ActivatedRoute,private router:Router) {
      this.id = this.activatedRoute.snapshot.paramMap.get('id');
      
      this.form = this.fb.group({
        title :['', [Validators.required]],
        image: [''],
        del_image: ['']      
      })
   }
   

  ngOnInit(): void {
    
    this._httpService.view(this.id).subscribe(({res}:any)=> {    
      this.form.controls['title'].setValue(res.title);  
      this.image = res.image;
    })
  }


  uploadImage(data:any, name:string){   
    this.formdata.append(name , data.target.files[0]);  
  }


  get f(){
    return this.form.controls;
  }

  onSubmit(form:any){     
    this.submitted= true;
    if(this.form.invalid){ return }
    this.loaderActive = true;

        
    this.formdata.append('title' , this.form.get('title')?.value);  
    this.formdata.append('del_image' , this.form.get('del_image')?.value);
    
    try {
      this._httpService.update(this.id, this.formdata).subscribe((res:any)=> {
        if(res.status){         
          Swal.fire('' , res.message, 'success');
          this.router.navigate([`admin/${this.RouterMain}`]);
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






