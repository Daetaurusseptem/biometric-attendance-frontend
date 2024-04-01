import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { MatToolbarModule} from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';



import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RouterLink } from '@angular/router';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { DashboardSidebarComponent } from './shared/dashboard-sidebar/dashboard-sidebar.component';
import { ModalImgComponent } from './shared/img-modal/img-modal.component';
import { CreateUserReComponent } from './shared/create-user/create-user.component';
import { UserListComponent } from './shared/user-list/user-list.component';
import { TabsMenuComponent } from './shared/tabs-menu/tabs-menu.component';
import { ItemsListComponent } from './shared/items-list/items-list.component';
import { LoadingDataSpinnerComponent } from './shared/loading-data-spinner/loading-data-spinner.component';
import { SpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { AsistenciaDialogComponent } from './shared/asistencia-dialog/asistencia-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MenuComponent } from './shared/menu/menu.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatListModule} from '@angular/material/list';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';




@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    DashboardSidebarComponent,
    ModalImgComponent,
    CreateUserReComponent,
    UserListComponent,
    SpinnerComponent,
    LoadingDataSpinnerComponent,
    ItemsListComponent,
    TabsMenuComponent,
    AsistenciaDialogComponent,
    MenuComponent
  ],
  exports:[
    NavbarComponent,
    FooterComponent,
    DashboardSidebarComponent,
    ModalImgComponent,
    UserListComponent,
    SpinnerComponent,
    LoadingDataSpinnerComponent,
    CreateUserReComponent,
    ItemsListComponent,
    TabsMenuComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatExpansionModule,
    MatListModule,
    MatProgressSpinnerModule
    
  ]
})
export class ComponentsModule { }
