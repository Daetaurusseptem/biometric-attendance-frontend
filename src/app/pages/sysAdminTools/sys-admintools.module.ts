import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//USERS
import { UserListComponent } from './users/users-list/users-list.component';
import { UserEditComponent } from './users/edit-user/edit-user.component';


//COMPANIES
import { CompanyListComponent } from './companies/company-list/company-list.component';
import { EditCompanyComponent } from './companies/edit-company/edit-company.component';
import { CreateCompanyComponent } from './companies/create-company/create-company.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { CompanyDetailsComponent } from './companies/company-details/company-details.component';

import { ComponentsModule } from 'src/app/components/components.module';






@NgModule({
  declarations: [
    UserEditComponent,
    CompanyListComponent,
    EditCompanyComponent,
    CreateCompanyComponent,
    CompanyDetailsComponent,
    UserListComponent
  ],
  exports: [
    UserEditComponent,
    CompanyListComponent,
    EditCompanyComponent,
    CreateCompanyComponent,
    CompanyDetailsComponent,
    UserListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    NgSelectModule,
    ComponentsModule
  ]
})
export class SysAdmintoolsModule { }
