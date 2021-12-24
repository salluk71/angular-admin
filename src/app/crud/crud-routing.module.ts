import { SubCategoryComponent } from './sub-category/sub-category.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EditComponent } from './category/edit/edit.component';
import { AddComponent } from './category/add/add.component';
import { ListComponent } from './category/list/list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ProfileComponent } from './profile/profile.component';
import {AddComponent as AddSubCategoryComponent} from './sub-category/add/add.component';
import {EditComponent as EditSubCategoryComponent} from './sub-category/edit/edit.component';

const routes: Routes = [
  {
    path:'', component:DashboardComponent,
  },
  {
    path:'category', children : [
      {
        path:'', component:ListComponent
      },
      {
        path:'add', component:AddComponent
      },
      {
        path:'edit/:id', component:EditComponent
      }
    ]
  },
  {
    path:'sub-category', children: [
      {
        path:'', component:SubCategoryComponent
      },
      {
        path:'add',component: AddSubCategoryComponent
      },
      {
        path:'edit/:id',component: EditSubCategoryComponent
      },
    ]
  },
  {
    path:'profile', component:ProfileComponent
  },
  {
    path:'change-password', component:ChangePasswordComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CrudRoutingModule { }
