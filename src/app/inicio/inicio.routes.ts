import {Routes} from "@angular/router";

export const routes: Routes = [
  {
    path: 'inicio',
    loadComponent: () => import('./tela-inicio/tela-inicio.page').then(m => m.TelaInicioPage)
  },
  {
    path: 'autenticacao',
    loadComponent: () => import('./autenticacao/autenticacao.page').then( m => m.AutenticacaoPage)
  },
  {
    path: '',
    redirectTo: '/inicio',
    pathMatch: 'full'
  }
];
