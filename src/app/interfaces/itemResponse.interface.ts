;
import { Asistencia, Vacaciones, Usuario, Departamento, Empleado, Empresa,Horario} from './models.interface';
import { StripeResponse } from './stripeProduct.interface';

export interface itemResponse {
  ok?:boolean,
  msg?:string,
  empresa?:Empresa,
  empresas?:Empresa[],
  departamento?:Departamento,
  departamentos?:Departamento[],
  empleados?:Empleado[],
  empleado?:Empleado,
  horario?:Horario,
  horarios?:Horario[],
  vacacion?:Vacaciones,
  vacaciones?:Vacaciones[],
  usuarios?:Usuario[],
  usuario?:Usuario,
  asistencia:Asistencia,
  asistencias:Asistencia[]
  totalPages?:number,
  page?:number
  limit?:number,
  img:string;
  stripeResponse:StripeResponse;
  numberOfUsers:number,
  numberOfCompanies:number,
  numberOfProducts:number,
  employeesAttendances:[{
    empleado:Empleado, 
    asistencias:Asistencia[]
  }]
  totalEmpleados:any
}