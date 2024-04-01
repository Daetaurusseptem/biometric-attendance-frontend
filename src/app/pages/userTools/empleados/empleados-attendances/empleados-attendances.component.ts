import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import * as dayjs from 'dayjs';

import { map, pipe } from 'rxjs';
import { AsistenciaDialogComponent } from 'src/app/components/shared/asistencia-dialog/asistencia-dialog.component';
import { Asistencia, Empleado } from 'src/app/interfaces/models.interface';
import { AsistenciasService } from 'src/app/services/asistencias.service';
import { AuthService } from 'src/app/services/auth.service';

interface DiaConDiaSemana {
  dia: number;
  diaSemana: string;
}
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

  diasSemana = [{index:'Sun',dia:'Dom'}, {index:'Mon',dia:'Lun'}, {index:'Tue',dia:'Mar'}, {index:'Wed',dia:'Mié'}, {index:'Thu',dia:'Jue'}, {index:'Fri',dia:'Vie'}, {index:'Sat',dia:'Sáb'}];
  cargado =false
  
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
    public dialog: MatDialog
    ) {
    console.log(this.selectedMonth);
    const currentDate = new Date();
    
    this.year = currentDate.getFullYear().toString(); // YYYY
    
  }

  ngOnInit() {

    this.actualizarAsistencias();
  }

  
  actualizarAsistencias() {
    this.cargado = false
    console.log(this.selectedMonth, this.selectedYear, this.page, this.limit);
    this.asistenciasService.getAsistenciasMes(this.empresaId!, this.selectedMonth, this.selectedYear, this.page, this.limit)
      .subscribe((response: any) => {
        this.employees = response.empleados; // Asume que el backend responde con un objeto que incluye los empleados
        this.totalEmpleados = response.totalEmpleados; // Asume que el backend también responde con el total de empleados
        console.log(this.employees);
        this.cargado = true
      });
      
  }

  abrirDialogoAsistencia(asistencia: any, fecha?:object): void {
    const dialogRef = this.dialog.open(AsistenciaDialogComponent, {
      width: '250px',
      data: {
        asistencia: asistencia,
        fecha
      }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('El diálogo fue cerrado', result);
      // Aquí puedes actualizar el estado de la asistencia si es necesario
    });
  }

  diasDelMes(mes: number, anio: number): DiaConDiaSemana[] {
    const dias = new Date(anio, mes, 0).getDate();
    const diasConDiaSemana: DiaConDiaSemana[] = [];
    for (let i = 1; i <= dias; i++) {
      const fecha = new Date(anio, mes - 1, i); // Los meses en JavaScript son 0-indexados
      const diaSemana = dayjs(fecha).format('ddd'); // Formato abreviado del día de la semana
      const prueba =this.diasSemana.find(dia=>dia.index==dayjs(fecha).format('ddd')?dia.index:'')
      
      diasConDiaSemana.push({
        dia: i,
        diaSemana:prueba?.dia!,
      });
    }
    return diasConDiaSemana;
  }


  obtenerAsistencia(empleadoId: string, dia: number, mes: number, anio: number, asistencia?:boolean): string|Asistencia {

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

  obtenerAsistenciaData(empleadoId: string, dia: number, mes: number, anio: number): string|object {
    // Encuentra al empleado basado en su ID
    const empleado = this.employees.find(emp => emp._id === empleadoId);
    if (!empleado || !empleado.asistencias) return 'desconocido';
  
    // Filtra las asistencias del empleado para el día específico
    const asistenciaDelDia = empleado.asistencias.find(asist => {
      const fechaAsistencia = new Date(asist.entrada);
      
      return fechaAsistencia.getDate() === dia && fechaAsistencia.getMonth() + 1 === mes && fechaAsistencia.getFullYear() === anio;
    });
    
    if (!asistenciaDelDia) return {tipo:'inasistencia', fecha: new Date(anio, mes, dia)}; // Si no hay registro, es una inasistencia
    return {tipo:asistenciaDelDia.tipo,entrada: asistenciaDelDia.entrada, salida:asistenciaDelDia.salida, empleado:asistenciaDelDia.empleado,idAsistencia:asistenciaDelDia._id, fecha: new Date(dia, mes, anio)}; // 'asistencia', 'inconsistencia', etc.
  }


  cambiarPagina(event: PageEvent) {
    
    this.page= event.pageIndex+1;

    this.limit = event.pageSize+1;
  
    // Actualizar la lógica para cargar los empleados basada en pageIndex y pageSize
    this.actualizarAsistencias();
  }
 
}
