import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SubCategoryService {


  ApiUrl = 'http://localhost:3000/api/sub-category/'
  constructor(private _http:HttpClient) { }

  add(data:any){
    return this._http.post(this.ApiUrl , data);
  }

  view(id=''){
    if(id){
      return this._http.get(this.ApiUrl + id );
    }
    return this._http.get(this.ApiUrl);
  }

  update(id:string, data:any){
    return this._http.patch(this.ApiUrl+id , data);
  }

  delete(id:any){
    return this._http.delete(this.ApiUrl + id);
  }
  
}
