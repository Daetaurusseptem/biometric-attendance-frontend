import { Injectable } from '@angular/core';
import { Empresa } from '../interfaces/models.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { itemResponse } from '../interfaces/itemResponse.interface';
import { AuthService } from './auth.service';

const urlApi = `${environment.apiUrl}/empresas`
const urlApiCompanies = `${environment.apiUrl}/empresas`

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  constructor(
              private http:HttpClient,
              private authService:AuthService,

              ) { }
  // Método para obtener empresas de prueba
  getCompanies() {
    return this.http.get<itemResponse>(`${urlApiCompanies}`,
    this.authService.headers 
    );
  };
  getNumberOfCompanies() {
    return this.http.get<itemResponse>(`${urlApiCompanies}/number`,
    this.authService.headers 
    );
  };
  getCompany(id:string) {
    return this.http.get<itemResponse>(`${urlApiCompanies}/${id}`, this.authService.headers);
  };
  deleteCompany(id:string){
    return this.http.delete<itemResponse>(`${urlApiCompanies}/${id}`, this.authService.headers);
  }
  
  updateCompany(id:string, formData:FormData) {
    console.log(formData);
    return this.http.put<itemResponse>(`${urlApiCompanies}/${id}`, formData, this.authService.headers );
  };

  createCompany(company:Empresa){
    
    return this.http.post<itemResponse>(`${urlApiCompanies}`, company, this.authService.headers);
  };
}
