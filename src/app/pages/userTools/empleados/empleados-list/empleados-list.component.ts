import { Component } from '@angular/core';


import { ActivatedRoute } from '@angular/router';
import { Subscription, delay, map } from 'rxjs';
import { Empleado } from 'src/app/interfaces/models.interface';

import { AuthService } from 'src/app/services/auth.service';
import { EmpleadosService } from 'src/app/services/empleados.service';
import { ModalService } from 'src/app/services/modal.service';
import { UtilitiesService } from 'src/app/services/utilities.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-empleados-list',
  templateUrl: './empleados-list.component.html',
  styleUrls: ['./empleados-list.component.css']
})
export class EmpleadosListComponent {
  empleados: Empleado[] = [];
  public imgSubs!: Subscription;
  companyId!:any;
  id: string = '';

  usuario = this.authService.usuario;

  constructor(
    private empleadoService: EmpleadosService,
    private authService: AuthService,
    private utilitiesService: UtilitiesService,
    private modalService: ModalService,
    private activatedRoute:ActivatedRoute

  ) {
   

      if(this.usuario.rol = 'admin'){
        this.companyId = this.usuario.empresa!
      }


  }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }
  ngOnInit(): void {
    this.loadUsers()
    this.imgSubs = this.modalService.nuevaImagen
      .pipe(delay(100))
      .subscribe(img => this.loadUsers());
  }

  deleteUser(id: string) {
    Swal.fire({
      title: 'Esta Seguro?',
      text: 'Este proceso no se podrá deshacer',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#F56A52',
      iconColor: '#F56A52',
      allowEnterKey: false

    })
      .then(resp => {
        if (resp.isConfirmed) {
          this.empleadoService.deleteEmpleado(id)
            .subscribe(resp => {
              if (resp.ok == true) {
                Swal.fire({
                  title: 'Registro eliminado',
                  icon: 'success'
                })
              } else if (resp.ok == false) {
                Swal.fire({
                  title: 'El registro no pudo ser eliminado',
                  icon: 'error'
                })

              }

              this.utilitiesService.redirectTo(`/dashboard/sysadmin/users`)
            }, err => {
              Swal.fire({
                title: 'Registro no eliminado',
                icon: 'error',
                text: err.error.msg
              })
            })
        }
      })
  }

 


  deleteEmpleado(id: string) {
    Swal.fire({

      title: 'Esta Seguro?',
      text: 'Este proceso no se podrá deshacer',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#F56A52',
      iconColor: '#F56A52',
      allowEnterKey: false

    })
      .then(resp => {
        if (resp.isConfirmed) {
          this.empleadoService.deleteEmpleado(id)
            .subscribe(resp => {
              if (resp.ok == true) {
                Swal.fire({
                  title: 'Registro eliminado',
                  icon: 'success'
                })
              } else if (resp.ok == false) {
                Swal.fire({
                  title: 'El registro no pudo ser eliminado',
                  icon: 'error'
                })

              }

              this.utilitiesService.redirectTo(`/dashboard/sysadmin/users`)
            }, err => {
              Swal.fire({
                title: 'Registro no eliminado',
                icon: 'error',
                text: err.error.msg
              })
            })
        }
      })
  }

  abrirModal(user: Empleado) {
    console.log(user);
    const { _id } = user
    // this.modalService.abrirModal(user.img,'usuarios',_id!);
  }
  loadUsers() {
    const userRole = this.authService.usuario.rol;
    if (userRole == 'admin') {
      this.empleadoService.getEmpleadosEmpresa(this.authService.empresaId!)
      .pipe(
        map(resp=>resp.empleados)
      )
      .subscribe(empleados => {
        console.log(empleados);
        this.empleados = empleados!;

      })
    }
    
  }


}
