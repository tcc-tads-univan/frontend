import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: 'solicitar-carona',
    loadComponent: () => import('./solicitar-carona/solicitar-carona.page').then( m => m.SolicitarCaronaPage)
  },
  {
    path: 'validar-carona',
    loadComponent: () =>
      import('./validar-carona/validar-carona.page').then((m) => m.ValidarCaronaPage),
  },
  {
    path: 'carona-confirmada',
    loadComponent: () => import('./carona-confirmada/carona-confirmada.page').then( m => m.CaronaConfirmadaPage)
  },
  {
    path: 'carona-solicitada',
    loadComponent: () => import('./carona-solicitada/carona-solicitada.page').then( m => m.CaronaSolicitadaPage)
  },
  {
    path: '',
    redirectTo: '/aluno/validar-carona',
    pathMatch: 'full'
  }
];
