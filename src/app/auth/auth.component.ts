import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,Validators } from '@angular/forms';
import {AuthService} from '../services/auth.service'
import Swal from 'sweetalert2'
import {Router} from "@angular/router"

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit {

  submitted=false;
  loaderActive =false;
  constructor(private AuthService:AuthService, private router:Router) {}
  
  form = new FormGroup({
    email: new FormControl('' , [Validators.required, Validators.email]),
    password: new FormControl('' , [Validators.required, Validators.minLength(8)])
  });

  get f() { return this.form.controls }

  ngOnInit(): void {}

  onSubmit(val:any){
    this.submitted = true;
    if(this.form.invalid){
      return
    }
    this.loaderActive = true;
    
    this.AuthService.login(val).subscribe((res:any)=> {
      if(res.status){
        console.log(res);
        var seconds = new Date().getTime() / 1000; 
        res.data['loginTime'] = Math.round( seconds + 1200)   // 20 min Timeout
        localStorage.setItem('ibin-u-info' , JSON.stringify(res.data));
        sessionStorage.setItem('welcome_login' , 'yes');
        this.router.navigate(['admin'])
        if(sessionStorage.getItem('welcome_login') == 'yes'){
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })
        const lastLogin = new Date(res.data.last_login);                  
          Toast.fire({icon: 'success',title: 'Welcome to IBIN', html:`Your have last login on:<br> ${lastLogin.getDate()}-${lastLogin.getMonth()+1}-${lastLogin.getFullYear()} ${lastLogin.getHours()}:${lastLogin.getMinutes()}` })
          sessionStorage.removeItem('welcome_login')
        }
      }else{
        Swal.fire('Oops', res.message , 'error')
        this.loaderActive = false;
      }
      this.loaderActive = false;
    }, ({error})=> {        
      if(error.notVerifed){
        this.verifyemail(error);
      }else{        
        Swal.fire('Oops', error.message?? 'Something went wrong..' , 'error')
      }    
      this.loaderActive = false;
    })    
  }

  verifyemail(resData:any){   
    Swal.fire({
      title: 'Your Account is not verified, Please entre verification code to active account.',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      showDenyButton: true,
      confirmButtonText: 'Verify Now',
      denyButtonText: `Send Verification Code`,
      showLoaderOnConfirm: true,
      preConfirm: (verify) => {      
        this.verifyNow(verify)
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((e)=> {   
      if(e.isDenied){ // Send verification code
        this.AuthService.sendVeification({email:resData.id}).subscribe((data:any)=> {
              this.verifyNexttime(resData.id, data);         
        }, (error)=> {
          Swal.fire('Oops', error.message , 'error')
        })
      }
    })
  }

  verifyNow(verify:any){
    if(verify){
      this.AuthService.verifyAccount({email:verify.id,verification_key:verify}).subscribe((data:any)=> {
        Swal.fire('Success', data.data.message , 'success')             
      }, (error)=> {
        Swal.fire('Oops', error.message , 'error')
      })
    }else{
      Swal.showValidationMessage(`Please enter verification Code.`)
    }     
  }

  verifyNexttime(email:string,data:any){
    Swal.fire({
      title: 'Success',
      text: data.message,
      icon: 'success',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      showLoaderOnConfirm: true,
      confirmButtonText: 'Enter now'
    }).then((result) => {
      if (result.isConfirmed) {
          Swal.fire({
            title: 'Please entre verification code to active account.',
            input: 'text',
            inputAttributes: {
              autocapitalize: 'off'
            },
            showCancelButton: true,                   
            confirmButtonText: 'Verify Now',                   
            showLoaderOnConfirm: true,                               
            preConfirm: (login) => {
              if(login){
                this.AuthService.verifyAccount({email,verification_key:login}).subscribe((data:any)=> {
                  Swal.fire('Success', data.data.message , 'success')             
                }, (error)=> {
                  Swal.fire('Oops', error.message , 'error')
                })
              }else{
                Swal.showValidationMessage(`Please enter verification Code.`)
              }          
            },
            allowOutsideClick: () => !Swal.isLoading()
          })

      }
    })  
  }


}
