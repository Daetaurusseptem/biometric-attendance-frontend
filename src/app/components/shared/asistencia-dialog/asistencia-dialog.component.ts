import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AsistenciasService } from 'src/app/services/asistencias.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-asistencia-dialog',
  templateUrl: './asistencia-dialog.component.html',
  styleUrls: ['./asistencia-dialog.component.css']
})
export class AsistenciaDialogComponent implements OnInit {
  fecha!: Date;
  tipo: 'asistencia' | 'inconsistencia' | 'inasistencia' = 'inasistencia';
  entradaHoras!: string;
  salidaHoras!: string;
  entradaMinutos!: string;
  salidaMinutos!: string;
  horasLaboradas!: string;
  horaEntrada!: string;
  horaSalida!: string;
  detalles: string = '';
  empleadoId!: string;
  asistenciaExiste: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,  // La data llega en el formato crudo que mencionaste
    private asistenciasService: AsistenciasService,
    private dialogRef: MatDialogRef<AsistenciaDialogComponent>
  ) {
    // Asegúrate de que los datos tengan una estructura válida, incluso si no están completamente definidos
    this.data = this.data || {};
    this.data.asistencia = this.data.asistencia || {};
    this.fecha = this.data.asistencia.fecha || new Date(); // Se asigna la fecha de la asistencia o una fecha por defecto
    this.tipo = this.data.asistencia.tipo || 'inasistencia'; // Tipo de asistencia que viene en el payload
    this.empleadoId = this.data.asistencia.empleadoId; // Empleado asociado a la asistencia
    this.asistenciaExiste = !!this.data.asistencia.asistenciaId;  // Verifica si existe una asistencia previa
  }

  ngOnInit(): void {
    this.cargarHoras();
  }

  cargarHoras() {
    // Verifica si los datos de asistencia tienen entrada y salida definidas
    if (!this.data.asistencia || !this.data.asistencia.entrada || !this.data.asistencia.salida) {
      this.horasLaboradas = `No asistió`;
      this.horaEntrada = "00:00";
      this.horaSalida = "00:00";
    } else {
      // Extraer las horas y minutos de entrada y salida
      const entrada = new Date(this.data.asistencia.entrada);
      const salida = new Date(this.data.asistencia.salida);

      this.entradaHoras = this.formatTwoDigits(entrada.getHours());
      this.entradaMinutos = this.formatTwoDigits(entrada.getMinutes());
      this.salidaHoras = this.formatTwoDigits(salida.getHours());
      this.salidaMinutos = this.formatTwoDigits(salida.getMinutes());

      this.horaEntrada = `${this.entradaHoras}:${this.entradaMinutos}`;
      this.horaSalida = `${this.salidaHoras}:${this.salidaMinutos}`;
      this.horasLaboradas = `${this.horaEntrada} - ${this.horaSalida}`;
    }

    // Detalles (si existen)
    this.detalles = this.data.asistencia.detalles || '';
  }

  formatTwoDigits(num: number): string {
    return num < 10 ? `0${num}` : `${num}`;
  }

  // Método para crear una nueva asistencia
  crearAsistencia() {
    const partesEntrada = this.horaEntrada.split(':');
    const partesSalida = this.horaSalida.split(':');

    const entradaFecha = new Date(this.fecha.getFullYear(), this.fecha.getMonth(), this.fecha.getDate(), +partesEntrada[0], +partesEntrada[1]);
    const salidaFecha = new Date(this.fecha.getFullYear(), this.fecha.getMonth(), this.fecha.getDate(), +partesSalida[0], +partesSalida[1]);

    const asistenciaPayload = {
      entrada: entradaFecha,
      salida: salidaFecha,
      tipo: this.tipo,
      detalles: this.detalles || ''
    };

    Swal.fire({
      title: '¿Estás seguro de crear esta asistencia?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, crear',
      cancelButtonText: 'Cancelar',
      cancelButtonColor: '#F176B7'
    }).then(resp => {
      if (resp.isConfirmed) {
        this.asistenciasService.createAsistencia(this.empleadoId, asistenciaPayload).subscribe(() => {
          this.dialogRef.close({ actualizado: true }); // Notifica que se creó
        });
      }
    }).catch(() => {
      this.dialogRef.close({ actualizado: false }); // En caso de cancelación, cierra sin cambios
    });
  }

  // Método para editar una asistencia existente
  editarAsistencia(idAsistencia: string) {
    const partesEntrada = this.horaEntrada.split(':');
    const partesSalida = this.horaSalida.split(':');

    const entradaFecha = new Date(this.fecha.getFullYear(), this.fecha.getMonth(), this.fecha.getDate(), +partesEntrada[0], +partesEntrada[1]);
    const salidaFecha = new Date(this.fecha.getFullYear(), this.fecha.getMonth(), this.fecha.getDate(), +partesSalida[0], +partesSalida[1]);

    const asistenciaPayload = {
      entrada: entradaFecha,
      salida: salidaFecha,
      tipo: this.tipo,
      detalles: this.detalles || ''
    };

    Swal.fire({
      title: '¿Estás seguro de editar esta asistencia?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, editar',
      cancelButtonText: 'Cancelar',
      cancelButtonColor: '#F176B7'
    }).then(resp => {
      if (resp.isConfirmed) {
        this.asistenciasService.updateAsistencia(idAsistencia, asistenciaPayload).subscribe(() => {
          this.dialogRef.close({ actualizado: true }); // Notifica que se editó
        });
      }
    }).catch(() => {
      this.dialogRef.close({ actualizado: false }); // En caso de cancelación, cierra sin cambios
    });
  }

  // Este método se ejecuta al hacer clic en "Guardar" y decide si crear o editar
  guardarAsistencia() {
    if (this.asistenciaExiste) {
      // Editar asistencia existente
      this.editarAsistencia(this.data.asistencia.asistenciaId);
    } else {
      // Crear nueva asistencia
      this.crearAsistencia();
    }
  }
}
