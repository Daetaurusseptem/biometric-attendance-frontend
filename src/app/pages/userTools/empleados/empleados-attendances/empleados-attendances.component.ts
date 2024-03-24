import { Component } from '@angular/core';
import { map } from 'rxjs';
import { AsistenciasService } from 'src/app/services/asistencias.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-empleados-attendances',
  templateUrl: './empleados-attendances.component.html',
  styleUrls: ['./empleados-attendances.component.css']
})
export class EmpleadosAttendancesComponent {
  // Dentro de la clase AsistenciasComponent
months = [
  { name: 'Enero', value: '01' },
  { name: 'Febrero', value: '02' },
  { name: 'Marzo', value: '03' },
  { name: 'Abril', value: '04' },
  { name: 'Mayo', value: '05' },
  { name: 'Junio', value: '06' },
  { name: 'Julio', value: '07' },
  { name: 'Agosto', value: '08' },
  { name: 'Septiembre', value: '09' },
  { name: 'Octubre', value: '10' },
  { name: 'Noviembre', value: '11' },
  { name: 'Diciembre', value: '12' }
];

  asistencias: any[] = [];
  empresaId = this.authService.empresa._id; // Sustituye por el ID real de la empresa
  month = 'MES'; // Formato: 'MM'
  year = 'AÑO'; // Formato: 'YYYY'
  // departamentoId = 'DEPARTAMENTO_ID'; // Opcional

  constructor(
                private asistenciasService: AsistenciasService,
                private authService: AuthService,
                ) {

    const currentDate = new Date();
    this.month = ('0' + (currentDate.getMonth() + 1)).slice(-2); // Asegúrate de que sea MM
    this.year = currentDate.getFullYear().toString(); // YYYY

   }

  ngOnInit(): void {
    this.loadAsistencias();
  }

  loadAsistencias(): void {
    this.asistenciasService.getAsistenciasMes(this.authService.empresa._id!, this.month, this.year)
      .pipe(
         map(r=>{
          console.log(r);
          return r.employeesAttendances
        })
      )
      .subscribe({
        next: (data) => {

          console.log(data);
          this.asistencias = data;
        },
        error: (error) => {
          console.error('Error al obtener asistencias:', error);
        }
      });
  }
}
