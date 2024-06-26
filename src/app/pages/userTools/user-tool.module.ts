import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DepartamentosListComponent } from './departamentos/departamentos-list/departamentos-list.component';
import { CreateDepartamentoComponent } from './departamentos/create-departamento/create-departamento.component';
import { EditDepartamentoComponent } from './departamentos/edit-departamento/edit-departamento.component';
import { DepartamentoDetailsComponent } from './departamentos/departamento-details/departamento-details.component';
import { EmpleadosListComponent } from './empleados/empleados-list/empleados-list.component';
import { EditEmpleadoComponent } from './empleados/edit-empleado/edit-empleado.component';
import { CreateEmpleadoComponent } from './empleados/create-empleado/create-empleado.component';
import { EmpleadoDetailsComponent } from './empleados/empleado-details/empleado-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { ComponentsModule } from 'src/app/components/components.module';
import { DepartmentDetailsComponent } from './departamentos/department-details/department-details.component';

import {MatDividerModule} from '@angular/material/divider';
import {MatTableModule} from '@angular/material/table';
import { EmpleadosAttendancesComponent } from './empleados/empleados-attendances/empleados-attendances.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AddEmployeeDepartmentComponent } from './add-employee-department/add-employee-department.component';
import { SchedulesDepartmentComponent } from './schedules-department/schedules-department.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';


@NgModule({
  declarations: [
    DepartamentosListComponent,
    CreateDepartamentoComponent,
    EditDepartamentoComponent,
    DepartamentoDetailsComponent,
    EmpleadosListComponent,
    EditEmpleadoComponent,
    CreateEmpleadoComponent,
    EmpleadoDetailsComponent,
    DepartmentDetailsComponent,
    EmpleadosAttendancesComponent,
    AddEmployeeDepartmentComponent,
    SchedulesDepartmentComponent
  ],
  exports: [
    DepartamentosListComponent,
    CreateDepartamentoComponent,
    EditDepartamentoComponent,
    DepartamentoDetailsComponent,
    EmpleadosListComponent,
    EditEmpleadoComponent,
    CreateEmpleadoComponent,
    EmpleadoDetailsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    NgSelectModule,
    ComponentsModule,
    MatDividerModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatSelectModule
    
  ]
})
export class UserToolModule { }
