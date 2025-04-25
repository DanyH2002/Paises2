import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { MegaMenuItem } from 'primeng/api';
import { MegaMenu } from 'primeng/megamenu';
import { AvatarModule } from 'primeng/avatar';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService } from '../shared/Services/api.service';

@Component({
  selector: 'app-menu',
  imports: [RouterModule, RouterOutlet, AvatarModule, MegaMenu, CommonModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {

  constructor(private router: Router, private api: ApiService) { }
  items: MegaMenuItem[] | undefined;

  ngOnInit() {
    this.items = [
      {
        label: 'Lista de Paises',
        root: true,
        command: () => {
          this.router.navigateByUrl('/menu/paises');
        }
      },

      {
        label: 'Crear Pais',
        root: true,
        command: () => {
          this.router.navigateByUrl('/menu/paises/agregar');
        }
      }
    ];
  }

  logout() {
    this.api.logout().subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: (err) => console.error('Error al cerrar sesión:', err)
    }
    );
  }
}
