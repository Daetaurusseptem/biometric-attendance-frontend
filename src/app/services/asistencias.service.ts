import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { itemResponse } from '../interfaces/itemResponse.interface';

@Injectable({
  providedIn: 'root'
})
export class AsistenciasService {
  private baseURL: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAsistenciasMes(empresaId: string, month: string, year: string, departamentoId?: string): Observable<itemResponse> {
    let query = `?month=${month}&year=${year}`;
    if (departamentoId) query += `&departamentoId=${departamentoId}`;

    return this.http.get<itemResponse>(`${this.baseURL}/asistencias/mensuales/${empresaId}${query}`);
  }
}
