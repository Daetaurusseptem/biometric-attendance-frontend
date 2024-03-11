import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EmpresaService } from 'src/app/services/company.service';
import { Usuario, Empresa } from 'src/app/interfaces/models.interface';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { UsuariosService } from 'src/app/services/users.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-create-company',
  templateUrl: './create-company.component.html',
  styleUrls: ['./create-company.component.css']
})
export class CreateCompanyComponent implements OnInit {
  adminUsers: Usuario[] = [];

  

  empresa: Empresa = {
    nombre: '',
    admin: '',
    // img: ''
    descripcion: '',
    direccion: '',
    tel: '',
    email: '',

  };

  constructor(
                private companyService: EmpresaService,
                private router:Router,
                private userService:UsuariosService
                ) {}


ngOnInit(): void {

  

  this.userService.availableAdminsEmpresa()
  .pipe(
    map(item=>item.usuarios)
  )
  .subscribe(availableAdmins => {
    this.adminUsers=availableAdmins!;
  });

}                

  createCompany(form: NgForm) {
    if (form.valid) {
      this.companyService.createCompany(this.empresa).subscribe({
        next: (createdCompany) => {
          Swal.fire({
            text:'Empresa creada correctament',
            icon:'success'
          })
          .then(()=>{
            this.router.navigateByUrl('/dashboard/sysadmin/companies')
          })
        },
        error: (error) => {
          Swal.fire({
            title:'Error al crear la empresa',
            icon:'error'
          })
        }
      });
    }
  }


}
