import { Injectable } from '@angular/core';
import { Usuario } from '../interfaces/models.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { itemResponse } from '../interfaces/itemResponse.interface';
import { AuthService } from './auth.service';



const urlApi = `${environment.apiUrl}`;
const urlApiUsuarios = `${environment.apiUrl}/usuarios`;

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(
              private http:HttpClient,
              private authService:AuthService
             ) { }

  // Método para obtener empresas de prueba
  getUsers() {
    return this.http.get<Usuario[]>(`${urlApiUsuarios}`, this.authService.headers);
  }
  getCompanyUsers(companyId:string) {

    return this.http.get<Usuario[]>(`${urlApiUsuarios}all/${companyId}`, this.authService.headers);
  }
  getNumberUsers() {
    return this.http.get<itemResponse>(`${urlApiUsuarios}/number`, this.authService.headers);
  }
  getUserById(id:string) {
    return this.http.get<itemResponse>(`${urlApiUsuarios}/${id}`, this.authService.headers);
  }
  getCompanyAdmin(id:string) {
    return this.http.get<itemResponse>(`${urlApiUsuarios}/company/admin/${id}`, this.authService.headers);
  }

  getAllNonAdminUsersOfCompany(empresaId:string) {
    
    return this.http.get<itemResponse>(`${urlApiUsuarios}/company/all/${empresaId}`, this.authService.headers);
  }
  getAllAdmins() {
    
    return this.http.get<itemResponse>(`${urlApiUsuarios}/company/admins/all`, this.authService.headers);
  }
  isAdmin(empresaId:string, adminId:string) {
    return this.http.get<itemResponse>(`${urlApiUsuarios}/admins/${empresaId}/${adminId}`, this.authService.headers);


  }
  deleteUser(id:string){
    return this.http.delete<itemResponse>(`${urlApiUsuarios}/${id}`, this.authService.headers);
  }
  


  updateUser(id:string, formData:FormData) {
    console.log(formData);
    return this.http.put<itemResponse>(`${urlApiUsuarios}/${id}`, formData, this.authService.headers )
    
    
  }
    allAdminsEmpresa(){
    return this.http.get<itemResponse>(`${urlApiUsuarios}/company/admins/all`, this.authService.headers);
  }
    availableAdminsDepartamento(empresa:string){
      ///usuarios-disponibles/:empresaId
    return this.http.get<itemResponse>(`${urlApiUsuarios}/usuarios-disponibles/${empresa}`, this.authService.headers);
  }
  getAvailableAdmins() {
    return this.http.get<itemResponse>(`${urlApiUsuarios}/company/admins/available`);
  }


  createUser(Usuario:Usuario){
    
    return this.http.post<itemResponse>(`${urlApiUsuarios}`, Usuario,this.authService.headers);
  };
}
