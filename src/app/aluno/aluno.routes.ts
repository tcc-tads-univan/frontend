import {Routes} from '@angular/router';

export const routes: Routes = [
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
    path: '',
    redirectTo: '/aluno/validar-carona',
    pathMatch: 'full'
  }
];
