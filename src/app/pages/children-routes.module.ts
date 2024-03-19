import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { AuthGuardGuard } from '../guards/is-auth.guard';
import { SysAdminGuard } from '../guards/sys-admin.guard';
import { UserListComponent } from '../components/shared/user-list/user-list.component';
import { UserEditComponent } from './sysAdminTools/users/edit-user/edit-user.component';
import { CreateUserReComponent } from '../components/shared/create-user/create-user.component';
import { CompanyListComponent } from './sysAdminTools/companies/company-list/company-list.component';
import { CreateCompanyComponent } from './sysAdminTools/companies/create-company/create-company.component';
import { EditCompanyComponent } from './sysAdminTools/companies/edit-company/edit-company.component';
import { CompanyDetailsComponent } from './sysAdminTools/companies/company-details/company-details.component';
import { DashboardPageComponent } from './dashboard/dashboard-page/dashboard-page.component';
import { DepartamentosListComponent } from './userTools/departamentos/departamentos-list/departamentos-list.component';
import { CreateDepartamentoComponent } from './userTools/departamentos/create-departamento/create-departamento.component';
import { RoleGuard } from '../guards/role.guard';
import { DepartamentoDetailsComponent } from './userTools/departamentos/departamento-details/departamento-details.component';
import { EmpleadosListComponent } from './userTools/empleados/empleados-list/empleados-list.component';


const routes: Routes = [
{
  path:'',
  component:PagesComponent,
  canActivate:[AuthGuardGuard],
  children:[
      { path: '', component: DashboardPageComponent, canActivate:[AuthGuardGuard] },
      
      //SYSADMIN ROUTES
      
      { path: 'sysadmin', canActivate:[SysAdminGuard], component:  DashboardPageComponent},
      { path: 'sysadmin/users',canActivate:[SysAdminGuard], component:  UserListComponent},
      { path: 'sysadmin/users/edit/:id',canActivate:[SysAdminGuard], component:  UserEditComponent},
      { path: 'sysadmin/users/new',canActivate:[SysAdminGuard], component:  CreateUserReComponent},
      { path: 'sysadmin/companies',canActivate:[SysAdminGuard], component:  CompanyListComponent},
      { path: 'sysadmin/companies/new',canActivate:[SysAdminGuard], component:  CreateCompanyComponent},
      { path: 'sysadmin/companies/edit/:id',canActivate:[SysAdminGuard], component:  EditCompanyComponent},
      { path: 'sysadmin/companies/details/:id',canActivate:[SysAdminGuard], component:  CompanyDetailsComponent},
      
      //ADMIN ROUTES
      { path: 'admin/departments',canActivate:[AuthGuardGuard], component:  DepartamentosListComponent},
      { path: 'admin/departments/:new',canActivate:[AuthGuardGuard], component:  CreateDepartamentoComponent},
      { path: 'admin/users',canActivate:[AuthGuardGuard], component:  UserListComponent},
      { path: 'admin/users/new',canActivate:[AuthGuardGuard], component:  CreateUserReComponent},
      { path: 'admin/users/edit/:id',canActivate:[AuthGuardGuard], component:  UserEditComponent},

      { path: 'admin/employees',canActivate:[AuthGuardGuard], component:  EmpleadosListComponent},
      { path: 'admin/employees/edit',canActivate:[AuthGuardGuard], component:  EmpleadosListComponent},
      
      { path: 'admin/departments/details/:id',canActivate:[AuthGuardGuard], component:  DepartamentoDetailsComponent},
      


  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class childrenPagesRouting { }
