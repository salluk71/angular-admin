import { CommonService } from './../../../services/common.service';
import { Router } from '@angular/router';
import { Component, OnInit, Output , EventEmitter } from '@angular/core';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  username:string | undefined;
  images = 'assets/img/undraw_profile.svg'
  constructor(private router:Router, private _http:CommonService) { }


  isToggle = false;
  @Output() toggleSidebar = new EventEmitter<boolean>();
  
  toggleSideBarEvent(){   
    this.toggleSidebar.emit(this.isToggle = !this.isToggle)
  }

  
  logout(){
    localStorage.removeItem('ibin-u-info');
    this.router.navigate([''])
  }
  ngOnInit(): void {
    const userInfo = this._http.localStorageData('ibin-u-info');
    this._http.fetch({_id:userInfo.id} , 'profile').subscribe((response:any)=> {
      this.username = response._doc.first+ ' '+ response._doc.last;
  
      this.images = response._doc.image;
    })
    
    
  }

  
  
  

}
