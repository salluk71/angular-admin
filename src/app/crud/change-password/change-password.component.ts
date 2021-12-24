import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {AuthService} from '../../services/auth.service'
import {CommonService} from '../../services/common.service'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  loaderActive=false;
  notMatched:boolean = true;
  userEmail:string | undefined;
  changePassword: any;

  constructor(private AuthService:AuthService, private CommonService:CommonService) {     
    this.userEmail = this.CommonService.localStorageData('ibin-u-info').email;
  }


  submitted = false;


  ngOnInit(): void {
    this.changePassword = new FormGroup({
      email: new FormControl(this.userEmail),
      current: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      cpassword: new FormControl('', [Validators.required]),
    })
  }
  get f(){ return this.changePassword.controls;}

  onSubmit(data:any){
    this.submitted = true;   
    if(this.changePassword.invalid){
      return ;
    }
    this.loaderActive = true;
    try {
        this.AuthService.resetPasswod(data).subscribe((res:any)=> {
          if(res.status){
            this.changePassword.reset();
            this.loaderActive = false;           
            this.notMatched = false;
            Swal.fire('Hurrey !!', res.message, 'success');
          }else{
            Swal.fire('Oops', res.message, 'error');
          }          
        }, (res)=> {                    
          Swal.fire('Oops', res.error.message.replace(/"/gi,''), 'error');
        })
    } catch (error) {
      Swal.fire('Oops', 'Something went wrong.', 'error');
    }
    
  }

  passwordMatch(){
    if(this.f.cpassword.value !== this.f.password.value){     
      this.notMatched = true
    }else{
      this.notMatched = false
    }  
  }

}
