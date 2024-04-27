import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { menu } from 'src/app/interfaces/menu.interface';
import { AuthService } from 'src/app/services/auth.service';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'dyn-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  
  menus: any[] = [];

  constructor(
    private menuService:MenuService,
    private authServices:AuthService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.menuService.cargarMenu();
    this.menus = this.menuService.menu;
  }
  logOut(){
    this.authServices.borrarLocalStorage();
    this.router.navigateByUrl('login')
  }

}
