import { Component, Input } from '@angular/core';
import { menu } from 'src/app/interfaces/menu.interface';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'dyn-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  


  menus: any[] = [];

  constructor(private menuService:MenuService) { }

  ngOnInit(): void {
    this.menuService.cargarMenu();
    this.menus = this.menuService.menu;
  }


}
