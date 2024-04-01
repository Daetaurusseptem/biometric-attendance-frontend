import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { itemResponse } from '../interfaces/itemResponse.interface';
import { Empleado } from '../interfaces/models.interface';

@Injectable({
  providedIn: 'root'
})
export class AsistenciasService {
  private baseURL: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAsistenciasMes(empresaId: string, month: number, year: number, page:number, limit:number) {
    // Reemplaza con la lógica adecuada para realizar la petición al backend

    console.log(typeof empresaId,typeof month, typeof year, typeof page );
    return this.http.get<itemResponse>(`${this.baseURL}/asistencias/mensuales/${empresaId}?page=${page}&limit=${limit}&month=${month}&year=${year}&limit=${limit}`);
  }

  obtenerAsistencia(empleado: Empleado, dia: Date): string {
    const fecha = new Date(dia).setHours(0, 0, 0, 0);
    const asistenciaDelDia = empleado.asistencias!.find(asistencia => {
      const entrada = new Date(asistencia.entrada).setHours(0, 0, 0, 0);
      return entrada === fecha;
    });
    
    return asistenciaDelDia ? 'Asistió' : 'No Asistió';
  }
  
}
