import { AuthService } from './../../services/auth.service';
import  Swal  from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  constructor(private AuthService:AuthService) { }
  submitted = false;
  resetPassword = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
  })

  ngOnInit(): void {}
  get f(){ return this.resetPassword.controls;}

  onSubmit(email:string){
    this.submitted = true;
    if(this.resetPassword.invalid){
      return ;
    }
    try {
        this.AuthService.resetPasswod(email).subscribe((res:any)=> {
          if(res.status){
            Swal.fire('Hurrey !!', res.message, 'success');
          }else{
            Swal.fire('Oops', res.message, 'error');
          }
          
        }, (res)=> {                    
          Swal.fire('Oops', res.error.message.replace(/"/gi, ''), 'error');
        })
    } catch (error) {
      Swal.fire('Oops', 'Something went wrong.', 'error');
    }
    
  }

}
