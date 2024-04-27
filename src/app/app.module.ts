import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import { PagesModule } from './pages/pages.module';
import { MatCardModule } from '@angular/material/card';

import { HttpClientModule } from '@angular/common/http';
import { FooterComponent } from './components/shared/footer/footer.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { ComponentsModule } from './components/components.module';
import { SysAdmintoolsModule } from './pages/sysAdminTools/sys-admintools.module';
import { UserToolModule } from './pages/userTools/user-tool.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';

import { NgChartsModule } from 'ng2-charts';


@NgModule({
  declarations: [
    AppComponent
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    NgSelectModule,
    RouterLink,
    FormsModule,
    ReactiveFormsModule,
    PagesModule,
    SysAdmintoolsModule,
    UserToolModule,
    ComponentsModule,
    HttpClientModule,
    MatPaginatorModule,
    NgxMaterialTimepickerModule,
    NgChartsModule

    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
