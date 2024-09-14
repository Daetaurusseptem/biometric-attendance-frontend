import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { itemResponse } from '../interfaces/itemResponse.interface';
import { Asistencia, Empleado } from '../interfaces/models.interface';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AsistenciasService {
  private baseURL: string = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private authService:AuthService
  ) { }

  getAsistenciasMes(empresaId: string, month: number, year: number, page:number, limit:number) {
    // Reemplaza con la lógica adecuada para realizar la petición al backend
    
    console.log(typeof empresaId,typeof month, typeof year, typeof page );
    return this.http.get<itemResponse>(`${this.baseURL}/asistencias/mensuales/${empresaId}?page=${page}&limit=${limit}&month=${month}&year=${year}&limit=${limit}`);
  }

  updateAsistencia(idAsistencia: string, formData: FormData | { entrada: Date, salida: Date, tipo: 'asistencia' | 'inasistencia' | 'inconsistencia' }): Observable<itemResponse> {
    console.log('Actualizando asistencia:', formData);

    let payload = formData;
    if (!(formData instanceof FormData)) {
      payload = {
        entrada: formData.entrada,
        salida: formData.salida,
        tipo: formData.tipo
      };
    }

    return this.http.put<itemResponse>(
      `${this.baseURL}/asistencias/${idAsistencia}`,
      payload,
      this.authService.headers
    );
  }
  createAsistencia(idEmpleado: string, asistencia: { entrada: Date, salida: Date, detalles: string }): Observable<itemResponse> {
    console.log('Creando asistencia', asistencia, idEmpleado); // Consola mejorada
    return this.http.post<itemResponse>(
      `${this.baseURL}/asistencias/${idEmpleado}`,
      asistencia,
      this.authService.headers
    );  
  }
  
}
