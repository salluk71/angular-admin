import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../services/common.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SubCategoryService } from 'src/app/services/crud/sub-category.service';
import Swal from 'sweetalert2';
import { CategoryService } from 'src/app/services/crud/category.service';

@Component({
  selector: 'app-sub-category',
  templateUrl: './sub-category.component.html',
  styleUrls: ['./sub-category.component.css']
})
export class SubCategoryComponent implements OnInit {

  category:any;
  list:any=[];
  img ='';
  constructor(private _http:SubCategoryService ,private CommonService: CommonService ,private categoryService:CategoryService, private modalService: NgbModal) { }


  open(content:any , img:string) {
    this.img = img;
    this.modalService.open(content);
  }

  ngOnInit(): void {
    this.categoryService.view().subscribe((res:any)=> {
      if(res.res){
        this.category = res.res    
        this._http.view().subscribe((data:any)=> {
          if(data.status){
            data.res.forEach((sub:any) => {
               this.category.forEach((cat:any) => {
                  if(sub.category == cat._id){
                     sub['category_name'] = cat.title
                  }
               });
            });
            this.list = data.res;            
          }
        }, (err)=> {})
      }
    })
  }

  // Remove Data
  remove(_id:string , ele:any){
    
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
       
        this._http.delete(_id).subscribe((res:any)=> {
          if(res.status){
            this.ngOnInit();
              Swal.fire('' , 'Selected data Removed.' ,'success')
          }else{
            Swal.fire('' , res.message ,'error')
          }         
        }, ()=> {
          Swal.fire('' , 'Something went wrong' ,'info')
        })
      }
    })
  }

  activeDeactivate(_id:string, status:string){
      Swal.fire({
        title: 'Are you sure?',
        text: "You want to "+status+" this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, '+status+' it!'
      }).then((result) => {
        if (result.isConfirmed) {
        
          this._http.update(_id, {status:1}).subscribe((res:any)=> {
          if(res.status){
            this.ngOnInit();
              Swal.fire('' , 'Selected data '+status+'d.' ,'success')
          }else{
            Swal.fire('' , res.message ,'error')
          }         
          }, ()=> {
            Swal.fire('' , 'Something went wrong' ,'info')
          })
        }
      })
  }
}
