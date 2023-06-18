import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: 'carona',
    loadComponent: () =>
      import('./listar-solicitacoes/listar-solicitacoes.page').then((m) => m.ListarSolicitacoesPage),
  },
  {
    path: '',
    redirectTo: '/motorista/carona',
    pathMatch: 'full'
  }
];
