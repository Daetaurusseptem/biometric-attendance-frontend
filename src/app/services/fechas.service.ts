import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FechasService {

  constructor() { }
  months = [
    { name: 'Enero', value: 1 },
    { name: 'Febrero', value: 2 },
    { name: 'Marzo', value: 3 },
    { name: 'Abril', value: 4 },
    { name: 'Mayo', value: 5 },
    { name: 'Junio', value: 6 },
    { name: 'Julio', value: 7 },
    { name: 'Agosto', value: 8 },
    { name: 'Septiembre', value: 9 },
    { name: 'Octubre', value: 10 },
    { name: 'Noviembre', value: 11 },
    { name: 'Diciembre', value: 12 }
  ];

  diasSemana = [{ index: 'Sun', dia: 'Dom' }, { index: 'Mon', dia: 'Lun' }, { index: 'Tue', dia: 'Mar' }, { index: 'Wed', dia: 'Mié' }, { index: 'Thu', dia: 'Jue' }, { index: 'Fri', dia: 'Vie' }, { index: 'Sat', dia: 'Sáb' }];

  getMesNombre(numeroMes:number|string){
    const mes = this.months.find(num=>num.value?numeroMes:num.name)
    console.log(mes);
    return mes?.name
  }

}
