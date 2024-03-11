import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Usuario, Empresa } from 'src/app/interfaces/models.interface';
import { EmpresaService } from 'src/app/services/company.service';
import { UsuariosService } from 'src/app/services/users.service';

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.css']
})
export class CompanyDetailsComponent implements OnInit {
  company!: Empresa;
  admin!: Usuario
  id: string = '';

ngOnInit(): void {
  this.activatedRoute.params.subscribe(params => {  
    this.id = params['id'];
        this.getCompany(this.id);
  })
}



  constructor(
    private companyService: EmpresaService,
    private userService: UsuariosService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
   
  }
  
  getCompany(id: string) {
    return this.companyService.getCompany(id)
    .pipe(
      map(item => {
        return item.empresa
      })
      )
      .subscribe(company => {
        
        this.company = company!;
        this.getAdmin(company!.admin!)

      })

  }
  getAdmin(adminId:string){
    this.userService.getUserById(adminId)
    .pipe(
      map(item=>{
        
        return item.usuario
      })
      )
      .subscribe(adminCompany=>{
        this.admin=adminCompany!;
        console.log(this.admin);
    })

  }


}
