import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { Departamento, Empresa, Usuario } from 'src/app/interfaces/models.interface';
import { AuthService } from 'src/app/services/auth.service';
import { EmpresaService } from 'src/app/services/company.service';
import { DepartamentosService } from 'src/app/services/departamentos.service';
import { UsuariosService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-departamento',
  templateUrl: './create-departamento.component.html',
  styleUrls: ['./create-departamento.component.css']
})
export class CreateDepartamentoComponent {
  
  empresaAdmin:boolean=false;
  empresa:any;
  

  departamento: Departamento = {
    nombre: '',
    descripcion: '',
    empresa: this.authService.empresa!

  };

  constructor(
                private departamentoService: DepartamentosService,
                private authService: AuthService,
                private router:Router,
                private userService:UsuariosService
                ) {}


ngOnInit(): void {
  if(this.authService.usuario.empresa=undefined){
    this.empresaAdmin=false
  }
}                

  createDepartamento(form: NgForm) {
    if (form.valid) { 
      this.departamentoService.createDepartamento(this.departamento).subscribe({
        next: (createdCompany) => {
          Swal.fire({
            text:'Departamento creado correctamente',
            icon:'success'
          })
          .then(()=>{
            this.router.navigateByUrl('/dashboard/admin/departments')
          })
        },
        error: (error) => {
          Swal.fire({
            title:'Error al crear departamento',
            icon:'error'
          })
        }
      });
    }
  }
}
