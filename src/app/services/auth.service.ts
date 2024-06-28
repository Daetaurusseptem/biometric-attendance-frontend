import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { UsuarioModel } from '../models/usuario.model';

import {  tap, Observable,of} from "rxjs";
import {map,catchError} from "rxjs/operators";
import { environment } from 'src/environments/environment';
import { Empresa } from '../interfaces/models.interface';
import { EmpresaService } from './company.service';

const url = environment.apiUrl;
const urlAuth = `${url}/auth`;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public idUsuario!:string
  usuario!:UsuarioModel;
  empresa!:Empresa;
  empresaId!:string;


  constructor(
                private http:HttpClient,
                
                
                ) { }
  login(formData:{usuario?:string,password?:string}){
    this.borrarLocalStorage()
    
    return this.http.post(`${urlAuth}`, formData)
    .pipe(
      tap( (resp: any) => {
        this.guardarLocalStorage(resp.token, resp.menu)
      })
    );
  }


  validarToken(): Observable<boolean> {
    
    return this.http.get(`${urlAuth}/renew`, this.headers)
    .pipe(
      map( (resp: any) => {
        console.log(resp);
        this.idUsuario = resp.uid
    
        const {nombre, username, rol, email, _id, empresa} = resp.usuario;
        this.usuario = new UsuarioModel(_id, username, nombre, rol,email, empresa);
        this.empresaId = empresa!;
        
    
        console.log(this.usuario);
        
        this.guardarLocalStorage(resp.token, resp.menu)
        return true;
      }),
      catchError( error => of(false) )
    );

  }
  get headers(): object{
    return {
      headers: {
        'x-token': this.token
      }
    };
  }
  get getCompany(): Empresa{
    return this.empresa;
  }
  get token(): string{
    return localStorage.getItem('token') || '';
  }
   get role(){
     return this.usuario.rol
   }

   get id(): string{
     return this.usuario!.id || '';
   }
   guardarLocalStorage(token:string, menu:any){
    var a = JSON.stringify(menu)
    localStorage.setItem('token', token );
    localStorage.setItem('menu', a );
}
  borrarLocalStorage(){
    localStorage.removeItem('token');
    localStorage.removeItem('menu');
}
}
