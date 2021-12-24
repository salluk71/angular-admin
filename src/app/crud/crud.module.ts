
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms'
import { ImageCropperModule } from 'ngx-image-cropper';
import { CrudRoutingModule } from './crud-routing.module';
import { CrudComponent } from './crud.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SidebarComponent } from './includes/sidebar/sidebar.component'
import { HeaderComponent } from './includes/header/header.component';
import { FooterComponent } from './includes/footer/footer.component';
import { EditComponent } from './category/edit/edit.component';
import { AddComponent } from './category/add/add.component';
import { ListComponent } from './category/list/list.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ProfileComponent } from './profile/profile.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SubCategoryComponent } from './sub-category/sub-category.component';
import { AddComponent as AddSubCategoryComponent } from './sub-category/add/add.component';
import { EditComponent as EditSubCategoryComponent } from './sub-category/edit/edit.component';



@NgModule({
  declarations: [
    CrudComponent,
    DashboardComponent,
    SidebarComponent,
    HeaderComponent,
    FooterComponent,
    EditComponent,
    AddComponent,
    ListComponent,
    ProfileComponent,
    ChangePasswordComponent,
    SubCategoryComponent,
    AddSubCategoryComponent,
    EditSubCategoryComponent
  ],
  imports: [
    CommonModule,
    CrudRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    ImageCropperModule
  ]
})
export class CrudModule { }
