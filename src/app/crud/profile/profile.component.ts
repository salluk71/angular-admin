import { CommonService } from './../../services/common.service';
import { AuthService } from './../../services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  submitted = false;
  loaderActive = false;
  localStorageData:any;
 profileImage= 'https://sb-admin-pro.startbootstrap.com/assets/img/illustrations/profiles/profile-1.png';
  email='';
  gender= 2;
  constructor(private AuthService:AuthService, private CommonService:CommonService, config: NgbModalConfig, private modalService: NgbModal) { }

  form = new FormGroup({
    first: new FormControl('', [Validators.required, ]),
    last: new FormControl('', [Validators.required, ]),       
    phone: new FormControl('', [Validators.required ]),
    gender: new FormControl('')
  })

  get f(){
    return this.form.controls;
  }
  ngOnInit(): void {
    this.localStorageData = localStorage.getItem('ibin-u-info');
    this.localStorageData = JSON.parse(this.localStorageData);
    const data = {
      _id:this.localStorageData.id
    }

    this.loadProfileImage(data)
  }

  onSubmit(data:any){  
    
    this.submitted =true;    
    if(this.form.invalid){
      return;
    }
  
    this.AuthService.profile( {email:this.email,  ...data}).subscribe((res:any)=> {     
      if(res.status){
        Swal.fire('Hurrey !!', res.msg, 'success');
      }else{
        Swal.fire('Oops', res.msg, 'error');
      }
    })

    
  }

  open(content:any) {
    this.modalService.open(content);
  }

  imageChangedEvent: any = '';
  croppedImage: any = '';

  fileChangeEvent(event: any): void {
      this.imageChangedEvent = event;
      // console.log(event);
  }
  imageCropped(event: ImageCroppedEvent) {
      this.croppedImage = event;
     
  }

  loadProfileImage(data:any){  
   
    this.CommonService.fetch(data, 'profile').subscribe((res:any)=> {
      this.profileImage =  res._doc.image;  
    
      this.email=res._doc.email;    
      if(res._doc.gender === 'male'){
        this.gender = 1;
      }else if(res._doc.gender === 'female'){
        this.gender = 0;
      }else{
        this.gender = 2;
      }
      this.form.patchValue({
        first:res._doc.first,
        last:res._doc.last,      
        phone:res._doc.phone,       
      })
    })
  }


  saveProfileImage(data:any){
    
    const formdata = new FormData();
    formdata.append('profile' , data.target.files[0] );
    formdata.set('email', 'salman.bwit@gmail.com')
  
    this.AuthService.profileimage(formdata).subscribe((res:any)=> {  
     this.profileImage =  res.image;  
    }, (ee)=> {
      console.log(ee);
    })
  }
  // imageLoaded(image: LoadedImage) {
  //     // show cropper
  // }
  cropperReady() {}
  loadImageFailed() {}
}
