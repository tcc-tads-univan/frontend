import {Routes} from "@angular/router";

export const routes: Routes = [
  {
    path: 'inicio',
    loadComponent: () => import('./home-page/home.page').then(m => m.HomePage)
  },
  {
    path: 'entrar',
    loadComponent: () => import('./authentication/authentication.page').then(m => m.AuthenticationPage)
  },
  {
    path: '',
    redirectTo: '/inicio',
    pathMatch: 'full'
  }
];
