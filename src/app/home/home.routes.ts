import {Routes} from "@angular/router";

export const routes: Routes = [
  {
    path: 'inicio',
    loadComponent: () => import('./landing-page/landing-page.page').then(m => m.LandingPagePage)
  },
  {
    path: 'autenticacao',
    loadComponent: () => import('./authentication/authentication.page').then(m => m.AuthenticationPage)
  },
  {
    path: '',
    redirectTo: '/inicio',
    pathMatch: 'full'
  }
];
