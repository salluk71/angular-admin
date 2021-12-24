import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  ApiUrl = 'http://localhost:3000/api/'
  localStorage:any;
  constructor(private _http:HttpClient) { }

  fetch(data:object, route:string){
    return this._http.post(this.ApiUrl +  route , data);
  }

  localStorageData(key:string){
    if(localStorage.getItem(key)){
      this.localStorage = localStorage.getItem(key);
          return JSON.parse( this.localStorage)     
    }
   
  }

  
}
