import { Routes } from '@angular/router';
import { authGuard } from './shared/Guard/auth.guard';
import { LoginComponent } from './user/login/login.component';
import { MenuComponent } from './menu/menu.component';
import { ListaComponent } from './paises/lista/lista.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'registro', loadComponent: () => import('./user/register/register.component').then(c => c.RegisterComponent) },
  {
    path: 'menu',
    component: MenuComponent, canActivate: [authGuard],
    children: [
      { path: '', component: ListaComponent, canActivate: [authGuard] },
      { path: 'paises', component: ListaComponent, canActivate: [authGuard] },
      { path: 'paises/agregar', loadComponent: () => import('./paises/forms/forms.component').then(c => c.FormsComponent), canActivate: [authGuard] },
      { path: 'paises/editar/:id', loadComponent: () => import('./paises/forms/forms.component').then(c => c.FormsComponent), canActivate: [authGuard] },
      { path: 'paises/ver/:id', loadComponent: () => import('./paises/show/show.component').then(c => c.ShowComponent), canActivate: [authGuard] },
    ]
  },
  { path: '**', redirectTo: '/login' },
];
