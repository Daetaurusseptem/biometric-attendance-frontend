import { Empresa } from "../interfaces/models.interface";


export class UsuarioModel {

    constructor(
        public id: string,
        public username: string,
        public name: string,
        public rol: 'user'|'admin'|'sysadmin',
        public email: string,
        public img?: string,
        public password?: string,
        public empresa?: Empresa|string,
        
    ) {}
  }