import Swal  from 'sweetalert2';
import { CommonService } from '../../../services/common.service';
import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/crud/category.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-category-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
 

  list:any=[];
  img ='';
  constructor(private _http:CategoryService ,private CommonService: CommonService ,  private modalService: NgbModal) { }

  open(content:any , img:string) {
    this.img = img;
    this.modalService.open(content);
  }

  ngOnInit(): void {
    this._http.view().subscribe((data:any)=> {
      if(data.status){
          this.list = data.res;
      }
    }, (err)=> {})
  }

  // Remove Data
  remove(_id:string , ele:any){
    
    Swal.fire({
      title: 'Are you sure? ',
      text: "Subcategory will also delete with foreign Key and you won't be able to revert this!",
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
