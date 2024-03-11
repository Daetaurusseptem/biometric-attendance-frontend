import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import {MatInputModule} from '@angular/material/input';
import { PagesComponent } from './pages.component';
import { ComponentsModule } from '../components/components.module';
import { PagesRoutingModule } from './pages-routing.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { DashboardPageComponent } from './dashboard/dashboard-page/dashboard-page.component';




@NgModule({
  declarations: [
    LoginComponent,
    PagesComponent,
    PageNotFoundComponent,
    DashboardPageComponent
  ],
  
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    PagesRoutingModule,
    NgSelectModule,
    RouterLink,
    MatInputModule
    
  ]
})
export class PagesModule { }
