import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { itemResponse } from '../interfaces/itemResponse.interface';
import { environment } from 'src/environments/environment';
import { Empleado } from '../interfaces/models.interface';

const urlApi = `${environment.apiUrl}/empleados`
const urlApiDepartamento = `${environment.apiUrl}/empleados`


@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {

  constructor(
    private http:HttpClient,
    private authService:AuthService,

    ) { }
// Método para obtener empresas de prueba
getEmpleados() {
return this.http.get<itemResponse>(`${urlApiDepartamento}`,
this.authService.headers 
);
};
getEmpleadosEmpresa(idEmpresa:string) {
return this.http.get<itemResponse>(`${urlApiDepartamento}/empresa/${idEmpresa}`,
this.authService.headers 
);
};

getEmpleado(id:string) {
return this.http.get<itemResponse>(`${urlApiDepartamento}/${id}`, this.authService.headers);
};
getEmpleadosDepartamento(departamentoId:string) {
  ///by-department/:departmentId
return this.http.get<itemResponse>(`${urlApiDepartamento}/by-department/${departamentoId}`, this.authService.headers);
};
deleteEmpleado(id:string){
return this.http.delete<itemResponse>(`${urlApiDepartamento}/${id}`, this.authService.headers);
}

updateEmpleado(id:string, formData:FormData) {
console.log(formData);
return this.http.put<itemResponse>(`${urlApiDepartamento}/${id}`, formData, this.authService.headers );
};

createEmpleado(departamento:Empleado){
return this.http.post<itemResponse>(`${urlApiDepartamento}`, departamento, this.authService.headers);
};
}
