import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import * as FileSaver from 'file-saver';
import { environment } from 'src/environments/environment.development';
import { AuthService } from './services/auth.service';
import { map } from 'rxjs';




@Injectable({
  providedIn: 'root'
})
export class ReportService {
  //'/mes/:empresaId'
  getResumenAsistencias(empresaId:string) {
    return this.http.get<any>(`${this.baseURL}/reportes/mes/${empresaId}`,this.auth.headers).pipe(
      map(response => {
        const data = response.resumen;
        const chartData = {
          labels: Object.keys(data).map(day => `Día ${day}`),
          datasets: [
            {
              label: 'Asistencias',
              data: Object.values(data).map((stats:any) => stats.asistencias),
              fill: false,
              borderColor: 'rgb(255, 205, 86)',
              tension: 0.1
            },
            {
              label: 'Inconsistencias',
              data: Object.values(data).map((stats:any) => stats.inconsistencias),
              fill: false,
              borderColor: 'rgb(75, 192, 192)',
              tension: 0.1
            },
            {
              label: 'Faltas',
              data: Object.values(data).map((stats:any) => stats.faltas),
              fill: false,
              borderColor: 'rgb(255, 99, 132)',
              tension: 0.1
            }
          ]
        };
        return chartData;
      })
    );
  }
  constructor(
    private http: HttpClient,
    private auth: AuthService,
  ) {}

  private baseURL: string = environment.apiUrl;
  downloadReport(empresaId: string, mes: string|number, anio: string|number) {
    const url = `${this.baseURL}/reportes/${empresaId}?mes=${mes}&year=${anio}`;
    //Se obtienen las asistencias para el reporte
    this.http.get<any[]>(url).subscribe(data => {
      console.log(data);
      const csvData = this.convertToCSV(data);
    
      const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
      FileSaver.saveAs(blob, `reporte-${mes}-${anio}.csv`);
    });
  }

  private convertToCSV(data: any[]): string {
    const replacer = (key:any, value:any) => (value === null ? '' : value); // handle null values
    const header = Object.keys(data[0]);
    let csv = data.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','));
    csv.unshift(header.join(','));
    return csv.join('\r\n');
  }


  
}