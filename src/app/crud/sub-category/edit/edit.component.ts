import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/crud/category.service';
import { SubCategoryService } from 'src/app/services/crud/sub-category.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit',
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

  responsedata:any;
  category:any;
  selectedcategory:any = {

  };
  RouterMain = this.router.url.split('/').filter( n => n != '')[1];
  constructor(private fb:FormBuilder, private _httpService:SubCategoryService,private categiryService:CategoryService,  private activatedRoute:ActivatedRoute,private router:Router) {
      this.id = this.activatedRoute.snapshot.paramMap.get('id');    
      this.form = this.fb.group({
        category : ['', [Validators.required]],
        title : ['', [Validators.required]],
        description: ['', [Validators.required]],     
        image: [''],  
        del_image: ['']      
      })


      this._httpService.view(this.id).subscribe(({res}:any)=> {       
        this.responsedata = res
        this.form.controls['title'].setValue(res.title);  
        this.form.controls['description'].setValue(res.description);  
        this.image = res.image;
      })


      
   }
   

  ngOnInit(): void {
    this.categiryService.view().subscribe((res:any)=> {
      if(res.res){
        this.category = res.res              
        this.category.forEach((item:any) => {
          if(item._id ==  this.responsedata.category){
            this.selectedcategory = {
              id:item._id,
              title:item.title
            }
            this.form.controls['category'].setValue(this.selectedcategory.id);  
          }        
        });
      }
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
    this.formdata.append('category' , this.form.get('category')?.value);
    this.formdata.append('description' , this.form.get('description')?.value);
    
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
