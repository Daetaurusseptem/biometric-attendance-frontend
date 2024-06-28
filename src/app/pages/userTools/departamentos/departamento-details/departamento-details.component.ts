import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { Departamento, Empleado, Usuario } from 'src/app/interfaces/models.interface';
import { AuthService } from 'src/app/services/auth.service';
import { BiometricService } from 'src/app/services/biometric.service';
import { DepartamentosService } from 'src/app/services/departamentos.service';
import { EmpleadosService } from 'src/app/services/empleados.service';
import { UsuariosService } from 'src/app/services/users.service';

@Component({
  selector: 'app-departamento-details',
  templateUrl: './departamento-details.component.html',
  styleUrls: ['./departamento-details.component.css']
})
export class DepartamentoDetailsComponent {
  departamento!: Departamento;  
  admin!: Usuario
  id: string = '';
  empleados!:Empleado[]

ngOnInit(): void {
  this.activatedRoute.params.subscribe(params => {  
    this.id = params['id'];
        this.getDepartamento(this.id);
        console.log(this.departamento);
        this.loadEmployees(this.authService.empresaId!)
  })
  
}





  constructor(
    private departamentoService: DepartamentosService,
    private empleadoService: EmpleadosService,
    private userService: UsuariosService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private authService:AuthService,
    private biometricoService: BiometricService
  ) {
    
  }
  
  
  getDepartamento(id: string) {
    return this.departamentoService.getDepartamento(id)
    .pipe(
      map(item => {
        console.log(item);
        return item.departamento
      })
      )
      .subscribe(departamento => {
        
        this.departamento = departamento!;
        console.log(departamento);
      })

  }
  loadEmployees(departmentId: string | null): void {
    // Suponiendo que tienes un método getEmployeesByDepartmentId en tu servicio
    this.empleadoService.getEmpleadosDepartamento(departmentId!)
    .pipe(
      map(item=>item.empleados)
    )
    .subscribe(empleados => {
      this.empleados = empleados!;
    });
  }


  eliminarEmpleado(id:string){
    throw Error
  }
 
}
