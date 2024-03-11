import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuariosService } from '../services/users.service';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class SysAdminGuard implements CanActivate {
  constructor(
    private authService:AuthService,
    private router:Router
    ){}
canActivate(
route: ActivatedRouteSnapshot,
state: RouterStateSnapshot):  boolean  {
if(this.authService.role=='sysadmin'){
return true;
}else{
 
  return false
}


}
}