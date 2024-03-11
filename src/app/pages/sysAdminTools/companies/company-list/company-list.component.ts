import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Empresa } from 'src/app/interfaces/models.interface';

import {EmpresaService } from 'src/app/services/company.service';
import { ModalService } from 'src/app/services/modal.service';
import { UtilitiesService } from 'src/app/services/utilities.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.css']
})
export class CompanyListComponent implements OnInit {
  empresas!: Empresa[];

  constructor(
              private companyService: EmpresaService,
              private utilitiesService: UtilitiesService,
              private modalService: ModalService,
              
              ) {}

  ngOnInit(): void {
    this.companyService.getCompanies()
    .pipe(
      map(item=>{
        console.log(item);
        return item.empresas
      })
    )
    .subscribe(empresas=>{
      this.empresas = empresas!;
      console.log(this.empresas);
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
        this.companyService.deleteCompany(id)
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

          this.utilitiesService.redirectTo(`/dashboard/sysadmin/companies`)
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
