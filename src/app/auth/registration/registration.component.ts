import { Component, OnInit } from '@angular/core';
import {  FormControl, FormGroup, Validators } from '@angular/forms';
import {AuthService} from '../../services/auth.service'
import Swal from 'sweetalert2';
import {Router} from "@angular/router"

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  submitted = false;
  notMatched = true;
  loaderActive = false;
  constructor(private AuthService:AuthService , private router:Router ) {}

  form =  new FormGroup({
    first: new FormControl('salman',[Validators.required]),
    last: new FormControl('khan',[Validators.required]),
    email: new FormControl('salluk71@gmail.com',[Validators.required,Validators.email]),
    gender: new FormControl('male',[Validators.required]),
    password: new FormControl('admin1234',[Validators.required]),
    confirm_password: new FormControl('admin1234',[Validators.required]),
  });

  get f() { return this.form.controls }


  onSubmit(data:any){
    this.submitted = true;
    if (this.form.invalid) {
        return;
    }else{      
      this.notMatched = false;     
      try {
          this.AuthService.registration(data).subscribe((res:any )=> { 
            if(res.status){
              setTimeout(() => {       
                Swal.fire({
                  title: 'Success',
                  text: res.message,
                  icon: 'success',
                  showCancelButton: true,
                  confirmButtonColor: '#3085d6',
                  cancelButtonColor: '#d33',
                  confirmButtonText: 'Login Now!'
                }).then((result) => {
                  if (result.isConfirmed) {
                  this.router.navigate(['/'])
                  }
                })
              }, 3000); 
            }else{          
              Swal.fire('Oops', res.originalMsg, 'error');
            }             
            this.loaderActive = false;                     
          }, (res)=> {                    
            Swal.fire('Oops', res.error.message.replace(/"/gi, ''), 'error');
          })
      } catch (error:any) {      
        Swal.fire('Oops', 'Something went wrong.', 'error');
      }  
    }
  }

  ngOnInit(): void {
   
  }

  passwordMatch(){
    if(this.f.confirm_password.value !== this.f.password.value){     
      this.notMatched = true
    }else{
      this.notMatched = false
    }  
  }

}
