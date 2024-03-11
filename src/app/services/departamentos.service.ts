import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { itemResponse } from '../interfaces/itemResponse.interface';
import { environment } from 'src/environments/environment';
import { Departamento } from '../interfaces/models.interface';

const urlApi = `${environment.apiUrl}/departamentos`
const urlApiDepartamentos = `${environment.apiUrl}/departamentos`

@Injectable({
  providedIn: 'root'
})
export class DepartamentosService {

  constructor(
    private http:HttpClient,
    private authService:AuthService,

    ) { }
// Método para obtener empresas de prueba
getDepartamentos() {
return this.http.get<itemResponse>(`${urlApiDepartamentos}`,
this.authService.headers 
);
};
getDepartamentosEmpresa(idEmpresa:string) {
return this.http.get<itemResponse>(`${urlApiDepartamentos}/empresa/${idEmpresa}`,
this.authService.headers 
);
};
getNumberOfDepartamentos() {
return this.http.get<itemResponse>(`${urlApiDepartamentos}/number`,
this.authService.headers 
);
};
getDepartamento(id:string) {
return this.http.get<itemResponse>(`${urlApiDepartamentos}/${id}`, this.authService.headers);
};
deleteDepartamento(id:string){
return this.http.delete<itemResponse>(`${urlApiDepartamentos}/${id}`, this.authService.headers);
}

updateDepartamento(id:string, formData:FormData) {
console.log(formData);
return this.http.put<itemResponse>(`${urlApiDepartamentos}/${id}`, formData, this.authService.headers );
};

createDepartamento(departamento:Departamento){
return this.http.post<itemResponse>(`${urlApiDepartamentos}`, departamento, this.authService.headers);
};
}
