import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as dayjs from 'dayjs';

import { map } from 'rxjs';
import { Departamento, Empleado } from 'src/app/interfaces/models.interface';
import { AuthService } from 'src/app/services/auth.service';
import { DepartamentosService } from 'src/app/services/departamentos.service';
import { EmpleadosService } from 'src/app/services/empleados.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-edit-empleado',
  templateUrl: './edit-empleado.component.html',
  styleUrls: ['./edit-empleado.component.css']
})

export class EditEmpleadoComponent {

  employee!: Empleado;
  departamentos!: Departamento[];
  id: string = '';
  empresaId=''
  depSelected!:Departamento
  loaded=false;



  employeeForm: FormGroup = this.fb.group({
   
    nombre:['', [Validators.min(4), Validators.maxLength(50)]],
    apellido1:['', [Validators.min(4), Validators.maxLength(50)]], 
    apellido2:[Validators.min(4), Validators.maxLength(50)],
    direccion:[Validators.min(4), Validators.maxLength(50)],
    telefono:[Validators.min(4), Validators.maxLength(50)],
    email:[Validators.min(4), Validators.maxLength(50)],
    departamento:[Validators.min(4), Validators.maxLength(50)],
    fechaIngreso:[Validators.min(4), Validators.maxLength(50)],
    posicion:[Validators.min(4), Validators.maxLength(50)],
    
    
  }
  );

  constructor(
    private empleadoService: EmpleadosService,
    private departamentosService: DepartamentosService,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.empresaId = authService.empresaId
    this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
      this.getEmployee(this.id);
    })

    this.getDepartamentosEmpresa(this.empresaId)


  }

  getEmployee(id: string) {
    return this.empleadoService.getEmpleado(id)
      .pipe(
        map(item => {
          console.log(item);
          return item.empleado
        })
      )
      .subscribe(empleado => {
        console.log(empleado);
        
        this.employee = empleado!;
        this.depSelected = this.employee.departamento as Departamento
        console.log('dep',this.depSelected);
        console.log( dayjs(this.employee.fechaIngreso).format('YYYY-MM-DD'));
        this.employeeForm.setValue({    
          
          nombre:this.employee.nombre||null,
          apellido1:this.employee.apellido1||null,
          apellido2:this.employee.apellido2||null,
          direccion:this.employee.direccion||null,
          telefono:this.employee.telefono||null,
          email:this.employee.email||null,
          departamento:this.employee.departamento||null,
          fechaIngreso:  dayjs(this.employee.fechaIngreso).format('YYYY-MM-DD')|| null,
          posicion:this.employee.posicion||null,
          
        })

        this.loaded=true
      }
    
      
      )

  }

  getDepartamentosEmpresa(id:string){
    this.departamentosService.getDepartamentosEmpresa(id)
    .pipe(
      map(item=>item.departamentos)
    )
    .subscribe(
      departamentos=>{
        this.departamentos = departamentos!
        console.log(departamentos);
      }
    )

  }

  updateUser() {
    if (this.employeeForm.valid) {
      console.log('Empresa actualizada:', this.employeeForm.value);
      // Aquí iría el código para enviar los datos actualizados a un servicio o backend


      Swal.fire({
        title: 'estas seguro?',
        icon: 'question',
        showCancelButton: true,
        cancelButtonColor: '#F176B7'
      })
        .then(resp => {
    
          
          if (resp.isConfirmed) {
            this.empleadoService.updateEmpleado(this.employee._id!, this.employeeForm.value)
              .subscribe(r => {
                this.router.navigateByUrl(`/dashboard/admin/employees`)
              })
          }
        })
        .catch(r => { return })

    }
  }

  campoNoValidoDatosUsuario(campo: string): boolean {
    if (this.employeeForm.get(campo)?.invalid) {
      return true;
    } else {
      return false;
    }
  }

}
