import { Component , OnInit } from '@angular/core';
import {ConnectionService} from 'ng-connection-service'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  title = 'ibin-admin';
  isConnected = true;
  noInternetConnection:boolean | undefined;

  constructor(private connectionService:ConnectionService) {
      this.connectionService.monitor().subscribe((isConnected)=> {
        if(isConnected){
          this.noInternetConnection = false;
        }else{
          this.noInternetConnection =true;
        }
      })
  }

  ngOnInit():void{
  
  }
}
