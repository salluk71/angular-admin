import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminChildGuard implements CanActivateChild {
  localStorageData:any;
  constructor(private router:Router) {}
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      this.localStorageData = localStorage.getItem('ibin-u-info');
    this.localStorageData = JSON.parse(this.localStorageData);
    var currenTime = new Date().getTime() / 1000;           
    if(this.localStorageData){   
        if(this.localStorageData.loginTime < currenTime){             
              this.router.navigate(['']);     
              localStorage.removeItem('ibin-u-info')        
          }else{
            var seconds = new Date().getTime() / 1000;             
            this.localStorageData['loginTime'] =  Math.round( seconds + 1200)   
            localStorage.setItem('ibin-u-info',  JSON.stringify(this.localStorageData));
          }       
        return true;    
    } else{
      this.router.navigate(['']);                    
    }    
    return true;
  }
  
}
