import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-asistencia-dialog',
  templateUrl: './asistencia-dialog.component.html',
  styleUrls: ['./asistencia-dialog.component.css']
})
export class AsistenciaDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
  fecha:Date | undefined;
  ngOnInit(): void {
    console.log(this.data);
    this.fecha = new Date(this.data.fecha.selectedYear,this.data.fecha.selectedMonth-1, this.data.fecha.dia)
    console.log(this.fecha);
  }

}
