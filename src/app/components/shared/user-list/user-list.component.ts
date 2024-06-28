import { Component } from '@angular/core';
import { pipe } from 'rxjs';
import { map } from 'rxjs/operators';
import { Usuario, Empresa } from 'src/app/interfaces/models.interface';
import { AuthService } from 'src/app/services/auth.service';
import { ModalService } from 'src/app/services/modal.service';
import { UsuariosService } from 'src/app/services/users.service';

@Component({
  selector: 'user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent {
  adminId!: string
  companyId!: string
  users!: Usuario[];
  company!: Empresa;
  userRole!:'admin'|'sysadmin'|'user';
  
  
  constructor(
    private userService: UsuariosService,
    private authService: AuthService,
    private modalService: ModalService
    ) { 
    this.adminId = this.authService.idUsuario
    this.getRole();
    if(this.userRole == 'admin'){
      console.log('company');
      this.getCompanyUsers();
    }else if(this.userRole =='sysadmin'){
      console.log('sys');
      this.getAllAdminUsers()
    }
  }


  getRole() {
    this.userRole = this.authService.role;
    
  }
  getCompanyUsers(){
  
    this.companyId = this.authService.empresaId!;

    console.log(this.companyId);
    this.userService.getAllNonAdminUsersOfCompany(this.companyId)
      .pipe(  
        map(item => {
          console.log(item);
          return item.usuarios
        })
      )
      .subscribe(users => {
        this.users = users!;
      })
  }
  getAllAdminUsers(){
    console.log(this.authService.getCompany);
    
    this.userService.getAllAdmins()
      .pipe(
        map(item => {
          return item.usuarios
        })
      )
      .subscribe(users => {
        this.users = users!;
        console.log(users);
      })
  }

  ngOnInit(): void {
    
  }
  abrirModal( company: Empresa ) {
    console.log(company);
    const {_id} = company
    // this.modalService.abrirModal(company.img,'empresas',_id!);
  }
}
