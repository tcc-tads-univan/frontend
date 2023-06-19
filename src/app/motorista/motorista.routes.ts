import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: 'caronas',
    loadComponent: () =>
      import('./listar-solicitacoes/listar-solicitacoes.page').then((m) => m.ListarSolicitacoesPage),
  },
  {
    path: '',
    redirectTo: '/motorista/caronas',
    pathMatch: 'full'
  }
];
