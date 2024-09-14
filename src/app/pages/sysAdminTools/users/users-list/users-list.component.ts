import { NgIf } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, delay, map } from 'rxjs';
import { Usuario } from 'src/app/interfaces/models.interface';
import { AuthService } from 'src/app/services/auth.service';
import { ModalService } from 'src/app/services/modal.service';
import { UsuariosService } from 'src/app/services/users.service';
import { UtilitiesService } from 'src/app/services/utilities.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-user-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UserListComponent implements OnInit, OnDestroy {
  users: Usuario[] = [];
  public imgSubs!: Subscription;
  companyId!: any;

  usuario = this.authService.usuario;

  constructor(
    private userService: UsuariosService,
    private authService: AuthService,
    private utilitiesService: UtilitiesService,
    private modalService: ModalService

  ) {
    if (this.usuario.rol = 'admin') {
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
          this.userService.deleteUser(id)
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

  abrirModal(user: Usuario) {
    console.log(user);
    const { _id } = user
    // this.modalService.abrirModal(user.img,'usuarios',_id!);
  }
  loadUsers() {
    const userRole = this.authService.usuario.rol;
    if (userRole == 'sysadmin') {
      this.userService.getAllAdmins()

        .pipe(map(item => {
          console.log(item);
          item.usuarios
        }))
        .subscribe(users => {
          this.users = users!;
        })
    }
    else if (userRole == 'admin') {
      this.userService.getUsers().subscribe(users => {
        this.users = users;
      })
    }
  }

}
