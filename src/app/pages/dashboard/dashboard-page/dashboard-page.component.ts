import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { ReportService } from 'src/app/report.service';
import { AsistenciasService } from 'src/app/services/asistencias.service';
import { AuthService } from 'src/app/services/auth.service';
import { EmpresaService } from 'src/app/services/company.service';
import { UsuariosService } from 'src/app/services/users.service';


@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css'],
  
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
    private  reportesService:ReportService,

    ){
    
      
  }

  chartData: any;
  
  // Opciones para la gráfica
  chartOptions = {
    responsive: true,
    
    // otras opciones que desees configurar
  };
ngOnInit(): void {
  this.user = this.authService.usuario;
  this.role =this.user.rol;

  this.getNumberUsers();
  this.getNumberCompanies();
  this.reportesService.getResumenAsistencias(this.authService.empresa._id!).subscribe(data => {
    this.chartData = data;
    // Luego puedes pasar estos datos a tu componente de gráfico
  });

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
