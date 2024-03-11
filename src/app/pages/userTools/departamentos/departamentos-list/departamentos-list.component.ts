import { Component } from '@angular/core';
import { Departamento } from 'src/app/interfaces/models.interface';
import { DepartamentosService } from 'src/app/services/departamentos.service';
import { ModalService } from 'src/app/services/modal.service';
import { UtilitiesService } from 'src/app/services/utilities.service';

import { map } from "rxjs/operators";
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-departamentos-list',
  templateUrl: './departamentos-list.component.html',
  styleUrls: ['./departamentos-list.component.css']
})
export class DepartamentosListComponent {


  departamentos!: Departamento[];

  constructor(
              private departamentoService: DepartamentosService,
              private authService: AuthService,
              private utilitiesService: UtilitiesService,
              private modalService: ModalService,
              private router:Router
              
              ) {}

  ngOnInit(): void {
    this.departamentoService.getDepartamentosEmpresa(this.authService.empresa._id!)
    .pipe(
      map(item=>{
        console.log(item);
        return item.departamentos
      })
    )
    .subscribe(departamentos=>{
      this.departamentos = departamentos!;
      console.log(this.departamentos);
    });
  }

 

  deleteCompany(id:string){
    Swal.fire({
      title:'Esta Seguro?',
      text:'Este proceso no se podrá deshacer',
      icon:'warning',
      showCancelButton:true,
      cancelButtonColor:'#F56A52',
      iconColor:'#F56A52',
      allowEnterKey:false

    })
    .then(resp=>{
      if(resp.isConfirmed){
        this.departamentoService.deleteDepartamento(id)
        .subscribe(resp=>{
          if(resp.ok==true){
            Swal.fire({
              title:'Registro eliminado',
              icon:'success'
            })
          }else if(resp.ok==false){
            Swal.fire({
              title:'El registro no pudo ser eliminado',
              icon:'error'
            })

          }
          this.router.navigateByUrl(`/dashboard/admin/departments`);
          
        }, err=>{
          Swal.fire({
            title:'Registro no eliminado',
            icon:'error',
            text:err.error.msg
          })
        })
      }
    })
  }
  // abrirModal( company: Empresa ) {
  //   const {_id} = company
  //   this.modalService.abrirModal(company.img,'empresas',_id!);
  // }

}
