import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminGuardGuard implements CanActivate {
  localStorageData:any;
  constructor(private router:Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      
      this.localStorageData = localStorage.getItem('ibin-u-info');
      this.localStorageData = JSON.parse(this.localStorageData);
      var currenTime = new Date().getTime() / 1000;           
     if(this.localStorageData !== null){   
         if(this.localStorageData.loginTime > currenTime){             
              this.router.navigate(['admin']);             
          }       
         return true;    
     }     
     return true;
  }
}
