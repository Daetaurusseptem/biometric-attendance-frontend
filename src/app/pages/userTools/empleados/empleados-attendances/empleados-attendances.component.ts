import { ChangeDetectorRef, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import * as dayjs from 'dayjs';
import { map } from 'rxjs/operators';
import { AsistenciaDialogComponent } from 'src/app/components/shared/asistencia-dialog/asistencia-dialog.component';
import { Asistencia, Empleado } from 'src/app/interfaces/models.interface';
import { ReportService } from 'src/app/report.service';
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
  months = [
    { name: 'Enero', value: 1 }, { name: 'Febrero', value: 2 }, { name: 'Marzo', value: 3 },
    { name: 'Abril', value: 4 }, { name: 'Mayo', value: 5 }, { name: 'Junio', value: 6 },
    { name: 'Julio', value: 7 }, { name: 'Agosto', value: 8 }, { name: 'Septiembre', value: 9 },
    { name: 'Octubre', value: 10 }, { name: 'Noviembre', value: 11 }, { name: 'Diciembre', value: 12 }
  ];

  diasSemana = [
    { index: 'Sun', dia: 'Dom' }, { index: 'Mon', dia: 'Lun' }, { index: 'Tue', dia: 'Mar' },
    { index: 'Wed', dia: 'Mié' }, { index: 'Thu', dia: 'Jue' }, { index: 'Fri', dia: 'Vie' }, { index: 'Sat', dia: 'Sáb' }
  ];

  cargado = false;
  page: number = 1;
  limit: number = 10;
  totalEmpleados: number = 0;
  years: Number[] = Array.from({ length: 16 }, (_, index) => new Date().getFullYear() - 15 + index);
  selectedMonth = new Date().getMonth() + 1;
  selectedYear = new Date().getFullYear();
  employees: Empleado[] = [];
  empresaId = this.authService.empresaId;

  constructor(
    private asistenciasService: AsistenciasService,
    private authService: AuthService,
    public dialog: MatDialog,
    public reportService: ReportService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.actualizarAsistencias();
  }

  actualizarAsistencias() {
    this.cargado = false;

    this.asistenciasService.getAsistenciasMes(this.empresaId!, this.selectedMonth, this.selectedYear, this.page, this.limit)
      .pipe(
        map((response: any) => {

          this.employees = response.empleados || [];
          console.log(this.employees);
          this.totalEmpleados = response.totalEmpleados || 0;
          this.cargado = true;
        })
      )
      .subscribe({
        next: () => {
          this.cdr.detectChanges(); // Forzamos la detección de cambios
        },
        error: (err) => console.error('Error fetching attendances:', err)
      });
  }

  abrirDialogoAsistencia(dataAsistencia: any): void {
    const dialogRef = this.dialog.open(AsistenciaDialogComponent, {
      width: '400px',
      panelClass: 'dialog-above',
      data: { asistencia: dataAsistencia } // Pasa la data relevante
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.actualizado) {
        this.actualizarAsistencias();  // Recargar los datos si hubo una actualización
      }
    });
  }

  diasDelMes(mes: number, anio: number): DiaConDiaSemana[] {
    const dias = new Date(anio, mes, 0).getDate();
    return Array.from({ length: dias }, (_, i) => {
      const fecha = new Date(anio, mes - 1, i + 1);
      const diaSemana = this.diasSemana.find(dia => dia.index === dayjs(fecha).format('ddd'))?.dia || '';
      return { dia: i + 1, diaSemana };
    });
  }

  obtenerAsistencia(empleadoId: string, dia: number, mes: number, anio: number): string {
    const asistencia = this.obtenerAsistenciaData(empleadoId, dia, mes, anio);
    return asistencia?.tipo || 'inasistencia';
  }

  obtenerAsistenciaData(empleadoId: string, dia: number, mes: number, anio: number): any {
    const empleado = this.employees.find(emp => emp._id === empleadoId);
    if (!empleado || !empleado.asistencias) return null;

    const asistenciaDelDia = empleado.asistencias.find(asist => {
      const fechaAsistencia = new Date(asist.entrada);
      return fechaAsistencia.getDate() === dia && fechaAsistencia.getMonth() === mes - 1 && fechaAsistencia.getFullYear() === anio;
    });

    if (!asistenciaDelDia) {
      return {
        tipo: 'inasistencia',
        fecha: new Date(anio, mes - 1, dia),
        empleadoId
      };
    }

    return {
      tipo: asistenciaDelDia.tipo || 'asistencia',
      entrada: asistenciaDelDia.entrada,
      salida: asistenciaDelDia.salida,
      asistenciaId: asistenciaDelDia._id,
      detalles: asistenciaDelDia.detalles,
      empleadoId,
      fecha: new Date(anio, mes - 1, dia)
    };
  }

  cambiarPagina(event: PageEvent) {
    this.page = event.pageIndex + 1;
    this.limit = event.pageSize;
    this.actualizarAsistencias();
  }

  getAsistenciaClass(tipo: string): string {
    switch (tipo) {
      case 'asistencia':
        return 'table-success';
      case 'inconsistencia':
        return 'table-warning';
      case 'inasistencia':
        return 'table-danger';
      default:
        return '';
    }
  }
}
