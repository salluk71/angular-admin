import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css']
})
export class CrudComponent implements OnInit {

  comingVal:boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  toggleSidebarParent(data:boolean){
    this.comingVal = data
  }
}
