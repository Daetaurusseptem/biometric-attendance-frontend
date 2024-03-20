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

  UsuarioRole!:'admin'|'sysadmin'|'user';
  companies!:Empresa[];
  EmpresaId!:string;
  

  user: Usuario = {
    nombre: '',
    email:'',
    username: '',
    password: '',
    empresa:'',
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

getRole(){
  this.UsuarioRole = this.authService.role;
  if(this.UsuarioRole=='user'){
    return 'user'
  }else if(this.UsuarioRole=='admin'){
    console.log('admin');
    this.companies = [];  
    this.EmpresaId=this.authService.getCompany._id!
    this.user.empresa=this.EmpresaId
    console.log(this.EmpresaId,this.user);
    this.user.rol =='admin'
    
  }else if(this.UsuarioRole=='sysadmin'){
    console.log('sys');
    this.getCompanies()
    this.user.rol =='sysadmin'
    
  }
  return
}              
  getCompanies(){
    this.companiesService.getCompanies()
    .pipe(
      map(item=>item.empresas)
    )
    .subscribe(companies=>{this.companies=companies!})

  }

  createUser(form: NgForm) {
    if(this.UsuarioRole=='user'){
      return 
    }
    if(this.UsuarioRole == 'admin'){
      this.user.empresa = this.authService.empresa._id
      
    }
    if(this.UsuarioRole == 'sysadmin'){
      this.user.empresa = ''
      
    }
  
    
    if (form.valid) {
      console.log(form.value);
      this.UsuarioService.createUser(this.user).subscribe({
        next: (createdEmpresa) => {
          Swal.fire({
            text:'Usuario creado correctamente',
            icon:'success'
          })
          .then(()=>{
            if(this.UsuarioRole=='admin'){
              this.router.navigateByUrl('/dashboard/admin/users')
            }else if(this.UsuarioRole=='sysadmin'){
              this.router.navigateByUrl('/dashboard/sysadmin/users')
            }
          })
        },
        error: (error) => {
          Swal.fire({
            text:'Usuario no pudo ser creado',
            icon:'error'
          })
          
        }
      });
    }
  }
}
