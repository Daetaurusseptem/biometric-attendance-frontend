import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Usuario } from 'src/app/interfaces/models.interface';
import { UsuariosService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';


const pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
const control = new FormControl('bad@', Validators.email);

@Component({
  selector: 'app-user-edit',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class UserEditComponent {

  user!: Usuario;
  id: string = '';



  userForm: FormGroup = this.fb.group({
    nombre: ['', Validators.required], // Inicializa con un string vacío o datos existentes
    username: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]]
    
  }
  );

  constructor(
    private userService: UsuariosService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
      this.getUser(this.id);
    })
  }

  getUser(id: string) {
    return this.userService.getUserById(id)
      .pipe(
        map(item => {
          console.log(item);
          return item.usuario
        })
      )
      .subscribe(usuario => {
        console.log(usuario);
        
        this.user = usuario!;
        
        console.log(this.user);
        
        this.userForm.setValue({
          nombre: this.user.nombre,
          username: this.user.username,
          email: this.user.email
        })
      })

  }


  updateUser() {
    if (this.userForm.valid) {
      console.log('Empresa actualizada:', this.userForm.value);
      // Aquí iría el código para enviar los datos actualizados a un servicio o backend


      Swal.fire({
        title: 'estas seguro?',
        icon: 'question',
        showCancelButton: true,
        cancelButtonColor: '#F176B7'
      })
        .then(resp => {
    

          if (resp.isConfirmed) {
            this.userService.updateUser(this.user._id!, this.userForm.value)
              .subscribe(r => {
                this.router.navigateByUrl('/dashboard/sysadmin/users')
              })
          }
        })
        .catch(r => { return })

    }
  }

  campoNoValidoDatosUsuario(campo: string): boolean {
    if (this.userForm.get(campo)?.invalid) {
      return true;
    } else {
      return false;
    }
  }
}
