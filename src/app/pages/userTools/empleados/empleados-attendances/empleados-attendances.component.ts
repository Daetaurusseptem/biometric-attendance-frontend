import { Component } from '@angular/core';
import { map, pipe } from 'rxjs';
import { Empleado } from 'src/app/interfaces/models.interface';
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
    { name: 'Enero', value: '1' },
    { name: 'Febrero', value: '2' },
    { name: 'Marzo', value: '3' },
    { name: 'Abril', value: '4' },
    { name: 'Mayo', value: '5' },
    { name: 'Junio', value: '6' },
    { name: 'Julio', value: '7' },
    { name: 'Agosto', value: '8' },
    { name: 'Septiembre', value: '9' },
    { name: 'Octubre', value: '10' },
    { name: 'Noviembre', value: '11' },
    { name: 'Diciembre', value: '12' }
  ];

  
  page: number = 1; // Página actual
  limit: number = 10; // Número de empleados por página
  totalEmpleados: number = 0; 

  years: Number[] = Array.from({ length: 16 }, (_, index) => 
  new Date().getFullYear() - (15 - index)
);

  selectedMonth = new Date().getMonth() + 1; // Mes actual por defecto
  selectedYear = new Date().getFullYear(); // Año actual por defecto


  employees: Empleado[] = [];
  empresaId = this.authService.empresa._id; // Sustituye por el ID real de la empresa
  month = 'MES'; // Formato: 'MM'
  year = 'AÑO'; // Formato: 'YYYY'
  // departamentoId = 'DEPARTAMENTO_ID'; // Opcional

  constructor(
    private asistenciasService: AsistenciasService,
    private authService: AuthService,
    ) {
    console.log(this.selectedMonth);
    const currentDate = new Date();
    
    this.year = currentDate.getFullYear().toString(); // YYYY
    
  }

  ngOnInit() {

    this.actualizarAsistencias();
  }

  
  actualizarAsistencias() {
    this.asistenciasService.getAsistenciasMes(this.empresaId!, this.selectedMonth, this.selectedYear, this.page, this.limit)
      .subscribe((response: any) => {
        this.employees = response.empleados; // Asume que el backend responde con un objeto que incluye los empleados
        this.totalEmpleados = response.totalEmpleados; // Asume que el backend también responde con el total de empleados
        console.log(this.totalEmpleados);
      });
  }

  diasDelMes(mes: number, anio: number): number[] {
    // Generar un arreglo con los días del mes seleccionado
    let dias = new Date(anio, mes, 0).getDate();
    return Array.from({ length: dias }, (_, i) => i + 1);
  }



  obtenerAsistencia(empleadoId: string, dia: number, mes: number, anio: number): string {
    // Encuentra al empleado basado en su ID
    const empleado = this.employees.find(emp => emp._id === empleadoId);
    if (!empleado || !empleado.asistencias) return 'desconocido';
  
    // Filtra las asistencias del empleado para el día específico
    const asistenciaDelDia = empleado.asistencias.find(asist => {
      const fechaAsistencia = new Date(asist.entrada);
      return fechaAsistencia.getDate() === dia && fechaAsistencia.getMonth() + 1 === mes && fechaAsistencia.getFullYear() === anio;
    });
  
    if (!asistenciaDelDia) return 'inasistencia'; // Si no hay registro, es una inasistencia
    return asistenciaDelDia.tipo; // 'asistencia', 'inconsistencia', etc.
  }

  cambiarPagina(nuevaPagina: number) {
    if (nuevaPagina < 1 || nuevaPagina > Math.ceil(this.totalEmpleados / this.limit)) {
      return; // No hacer nada si la página es inválida
    }
    this.page = nuevaPagina;
    this.actualizarAsistencias(); // Volver a cargar las asistencias con la nueva página
  }
 
}
