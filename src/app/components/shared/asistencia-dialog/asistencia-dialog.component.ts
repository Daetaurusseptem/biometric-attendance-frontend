import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogClose } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AsistenciasService } from 'src/app/services/asistencias.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-asistencia-dialog',
  templateUrl: './asistencia-dialog.component.html',
  styleUrls: ['./asistencia-dialog.component.css']
})
export class AsistenciaDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private asistenciasService: AsistenciasService,
    private router: Router
  ) {

    this.fechaObj = this.data.fecha
  }
  fecha: Date | undefined;
  tipo: "asistencia" | "inconsistencia" | "inasistencia" = 'inasistencia'
  entradaHoras!: any
  entradaMinutos!: any
  salidaHoras!: any
  salidaMinutos!: any
  horasLaboradas!: any
  fechaObj: any
  horaEntrada: any;
  horaSalida: any;
  detalles!: string;
  empleadoId!: string;

  ngOnInit(): void {
    this.cargarHoras();
  }

  editarAsistencia(idAsistencia: string, asistenciaData: { entrada: any, salida: any, tipo: any, detalles?: string }) {

    console.log(idAsistencia, asistenciaData, this.fecha);


    const entradaFechaHora = asistenciaData.entrada.defaultTime;
    const salidaFechaHora = asistenciaData.salida.defaultTime;

    const partesEntrada = entradaFechaHora.split(':')
    const partesSalida = salidaFechaHora.split(':')

    const entradaFecha = new Date(this.fecha!.getFullYear(), this.fecha!.getMonth(), this.fecha!.getDay(), partesEntrada[0], partesEntrada[1]);
    const salidaFecha = new Date(this.fecha!.getFullYear(), this.fecha!.getMonth(), this.fecha!.getDay(), partesSalida[0], partesSalida[1]);
    console.log(entradaFecha);
    console.log(salidaFecha);

    const asistenciaPayload = {
      entrada: entradaFecha,
      salida: salidaFecha,
      tipo: asistenciaData.tipo,
      detalles: this.detalles
    }

    console.log(asistenciaPayload);
    

    if (this.tipo === 'inasistencia') {
      Swal.fire({
        title: 'estas seguro?',
        icon: 'question',
        showCancelButton: true,
        cancelButtonColor: '#F176B7'
      })
        .then(resp => {
          if (resp.isConfirmed) {
            console.log(this.empleadoId);
            this.asistenciasService.createAsistencia(this.empleadoId, asistenciaPayload)
              .subscribe(r => {

                console.log(r);
                return
              })  
          }
        }
      )
        .catch(r => { return })

    }else if (this.tipo === 'asistencia' || "inconsistencia") {

      Swal.fire({
        title: 'estas seguro?',
        icon: 'question',
        showCancelButton: true,
        cancelButtonColor: '#F176B7'
      })
        .then(resp => {
          if (resp.isConfirmed) {
            this.asistenciasService.updateAsistencia(idAsistencia, asistenciaPayload)
              .subscribe(r => {


                console.log(r);

              })
          }
        })
        .catch(r => { return })



    }



  }



  cargarHoras() {
    console.log('DATTAAAA CRUDA: ', this.data);
    console.log('type: ', this.data.fecha.tipo);



    if (this.data.fecha.entrada == null || this.data.fecha.entrada == null) {
      this.horasLaboradas = `No asistio`
      this.horaEntrada = "00:00"
      this.horaSalida = "00:00"
    } else {
      this.entradaHoras = new Date(this.fechaObj.entrada).getHours()
      this.salidaHoras = new Date(this.fechaObj.salida).getHours()


      this.entradaMinutos = new Date(this.fechaObj.salida).getMinutes()
      this.salidaMinutos = new Date(this.fechaObj.entrada).getMinutes()

      if (this.entradaMinutos < 10) {
        this.entradaMinutos = "0" + this.entradaMinutos
      }

      if (this.salidaMinutos < 10) {
        this.salidaMinutos = "0" + this.salidaMinutos
      }

      this.horaEntrada = `${this.entradaHoras}:${this.entradaMinutos}`
      this.horaSalida = `${this.salidaHoras}:${this.salidaMinutos}`

      this.horasLaboradas = `${this.entradaHoras}:${this.entradaMinutos} - ${this.salidaHoras}:${this.salidaMinutos}`



      if (this.horasLaboradas == '00:00') {
        this.horasLaboradas = 'No asistio'
      }

    }



    this.fecha = this.fechaObj.fecha
    this.tipo = this.fechaObj.tipo
    this.detalles = this.fechaObj.detalles || ""
    this.empleadoId = this.fechaObj.empleadoId

  }

}
