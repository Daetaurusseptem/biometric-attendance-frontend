// asistencia.interface.ts
export interface Asistencia {
    _id?: string;
    empleado: string; // Referencia al ID de Empleado
    entrada: Date;
    salida: Date;
    tipo: 'asistencia' | 'falta' | 'vacaciones' | 'permiso'|'inasistencia';
    detalles?: string;
  }
  
  // departamento.interface.ts
  export interface Departamento {
    _id?: string;
    nombre: string;
    descripcion?: string;
    empresa: string|Empresa;
  }
  
  // empleado.interface.ts
  export interface Empleado {
    _id?: string;
    uidBiometrico: string;
    nombre: string;
    apellido1: string;
    apellido2?: string;
    direccion?: string;
    telefono: string;
    email: string;
    empresa: string; // Referencia al ID de Empresa
    departamento: string|Departamento; // Referencia al ID de Departamento
    fechaIngreso?: Date;
    numeroEmpleado: string;
    posicion?: string;
    sincronizadoBiometrico?: boolean;
    asistencias?:Asistencia[]
  }
  
  // empresa.interface.ts
  export interface Empresa {
    _id?: string; // Optional since it's provided by the database upon creation
    nombre: string;
    direccion: string;
    email: string;
    descripcion: string;
    tel: string;
    admin: string; // Array of User ObjectId represented as strings
  }
  
  // horario.interface.ts
  export interface Horario {
    _id?: string;
    departamento: string; // Referencia al ID de Departamento
    dias: Array<'Lunes' | 'Martes' | 'Miércoles' | 'Jueves' | 'Viernes' | 'Sábado' | 'Domingo'>;
    horaInicio: string;
    horaFin: string;
  }
  
  // usuario.interface.ts
  export interface Usuario {
    _id?: string;
    nombre:string;
    username: string;
    email: string;
    password: string;
    rol: 'admin' | 'user' | 'sysadmin';
    empresa?: string|Empresa; // Referencia al ID de Empresa, opcional
  }
  
  export interface Login {
    
    username: string;
    
    password: string;

  }
  
  // vacaciones.interface.ts
  export interface Vacaciones {
    _id?: string;
    empleado: string; // Referencia al ID de Empleado
    fechaInicio: Date;
    fechaFin: Date;
    aprobado?: boolean;
  }
  