import { Routes, CanActivateFn } from '@angular/router';
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
    component: MenuComponent,
    children: [
      { path: '', redirectTo: 'home' },
      { path: 'paises', component: ListaComponent },
      { path: 'paises/agregar', loadComponent: () => import('./paises/forms/forms.component').then(c => c.FormsComponent) },
      { path: 'paises/editar/:id', loadComponent: () => import('./paises/forms/forms.component').then(c => c.FormsComponent) },
      { path: 'paises/ver/:id', loadComponent: () => import('./paises/show/show.component').then(c => c.ShowComponent) },
      { path: 'user/editar/:id', loadComponent: () => import('./user/perfile/perfile.component').then(c => c.PerfileComponent) },
      { path: 'user/password/:id', loadComponent: () => import('./user/password/password.component').then(c => c.PasswordComponent) },

    ]
  },
  { path: '**', redirectTo: '/login' },
];
