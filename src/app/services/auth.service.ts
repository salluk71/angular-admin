import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private _http:HttpClient) { }

  ApiUrl = 'http://localhost:3000/api/'

  registration(data:object){
   return this._http.post(this.ApiUrl + 'registration', data);
  }

  login(data:object){
   return this._http.post(this.ApiUrl + 'login', data);
  }

  verifyAccount(data:object){
    return this._http.put(this.ApiUrl + 'verifyAccount', data)
  }

  profile(data:object){
    return this._http.patch(this.ApiUrl + 'profileUpdate', data);
  }
  
  resetPasswod(email:string){
    return this._http.post(this.ApiUrl + 'reset-password' , email);
  }

  sendVeification(email:object){
    return this._http.put(this.ApiUrl+ 'sendVeification', email);
  }
  profileimage(data:object){
    return this._http.post(this.ApiUrl+ 'profileimage', data);
  }


}
