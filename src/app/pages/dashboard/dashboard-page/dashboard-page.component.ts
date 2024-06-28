import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { ReportService } from 'src/app/report.service';
import { AsistenciasService } from 'src/app/services/asistencias.service';
import { AuthService } from 'src/app/services/auth.service';
import { EmpresaService } from 'src/app/services/company.service';
import { FechasService } from 'src/app/services/fechas.service';
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
  mesActual = this.fechaService.getMesNombre(new Date().getMonth())   
  Currentyear=new Date().getFullYear();
  companyId=''
  
  constructor(
    private  companyService:EmpresaService,
    private  userServices:UsuariosService,
    public  authService:AuthService,
    private  reportesService:ReportService,
    private  fechaService:FechasService,

    ){
      if(this.authService.role == 'sysadmin'){
        this.companyId = this.authService.getCompany._id!;
      }else if(this.authService.role == 'admin'){
    
        this.companyId = this.authService.empresaId!;
      }
      
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
  this.reportesService.getResumenAsistencias(this.companyId).subscribe(data => {
    this.chartData = data;
    // Luego puedes pasar estos datos a tu componente de gráfico
  });

}




verReportes() {
throw new Error('Method not implemented.');
}
gestionarUsuarios() {
throw new Error('Method not implemented.');
}

}
