import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { Usuario, Empresa } from 'src/app/interfaces/models.interface';
import { AuthService } from 'src/app/services/auth.service';
import { EmpresaService } from 'src/app/services/company.service';
import { UsuariosService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-create-Usuario',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserReComponent {

  UsuarioRole!: 'admin' | 'sysadmin' | 'user';
  companies!: Empresa[];
  EmpresaId!: string;

  user: Usuario = {
    nombre: '',
    email: '',
    username: '',
    password: '',
    empresa: '',
    rol: 'admin'
  };

  constructor(
    private UsuarioService: UsuariosService,
    private companiesService: EmpresaService,
    private authService: AuthService,
    private router: Router,
  ) {
    this.getRole();
  }

  getRole(): void {
    this.UsuarioRole = this.authService.role;
  
    if (this.UsuarioRole === 'user') {
      return;
    } else if (this.UsuarioRole === 'admin') {
      console.log('admin');
      this.companies = [];
      this.EmpresaId = this.authService.getCompany._id!;
      this.user.empresa = this.EmpresaId; // La empresa del usuario logueado
      this.user.rol = 'user'; // El admin crea usuarios con rol 'user'
    } else if (this.UsuarioRole === 'sysadmin') {
      console.log('sysadmin');
      this.getCompanies();
      this.user.empresa = ''; // Inicializamos sin empresa para evitar conflictos
      this.user.rol = 'admin'; // El sysadmin crea usuarios con rol 'admin'
    }
  }

  getCompanies() {
    this.companiesService.getCompanies()
      .pipe(map(item => item.empresas))
      .subscribe(companies => { this.companies = companies! });
  }

  createUser(form: NgForm) {
    if (this.UsuarioRole === 'user') {
      return;
    }
  
    // Si el rol es sysadmin, eliminamos la empresa del objeto user
    if (this.UsuarioRole === 'sysadmin') {
      delete this.user.empresa;
    }
  
    if (form.valid) {
      console.log(form.value);
      this.UsuarioService.createUser(this.user).subscribe({
        next: (createdUsuario) => {
          Swal.fire({
            text: 'Usuario creado correctamente',
            icon: 'success'
          })
            .then(() => {
              if (this.UsuarioRole === 'admin') {
                this.router.navigateByUrl('/dashboard/admin/users');
              } else if (this.UsuarioRole === 'sysadmin') {
                this.router.navigateByUrl('/dashboard/sysadmin/users');
              }
            });
        },
        error: (error) => {
          Swal.fire({
            text: error.error.message,
            icon: 'error'
          });
        }
      });
    }
  }
}
