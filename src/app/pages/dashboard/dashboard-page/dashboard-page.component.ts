import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';
import { EmpresaService } from 'src/app/services/company.service';
import { UsuariosService } from 'src/app/services/users.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css']
})
export class DashboardPageComponent implements OnInit{
  numberOfUsers:any;
  numberOfCompanies:any;
  user!:UsuarioModel;
  role!:string;
  constructor(
    private  companyService:EmpresaService,
    private  userServices:UsuariosService,
    private  authService:AuthService,

    ){

  }
ngOnInit(): void {
  this.user = this.authService.usuario;
  this.role =this.user.rol;

  this.getNumberUsers();
  this.getNumberCompanies();

}
getNumberUsers(){
  this.userServices.getNumberUsers()
  .pipe(
    map(item=>item.numberOfUsers)

  )
  .subscribe(numberOfUsers=>{
    console.log(numberOfUsers);
    this.numberOfUsers= numberOfUsers
  })
}
getNumberCompanies(){
  this.companyService.getNumberOfCompanies()
  .pipe(
    map(item=>item.numberOfCompanies)

  )
  .subscribe(numberOfCompanies=>{
    console.log(numberOfCompanies);
    this.numberOfCompanies= numberOfCompanies
  })
}
verReportes() {
throw new Error('Method not implemented.');
}
gestionarUsuarios() {
throw new Error('Method not implemented.');
}

}
