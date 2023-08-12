import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: 'solicitar-carona',
    loadComponent: () => import('./request-carpool/request-carpool.page').then(m => m.RequestCarpoolPage)
  },
  {
    path: 'validar-carona',
    loadComponent: () => import('./validate-carpool-proposal/validate-carpool-proposal.page').then((m) => m.ValidateCarpoolProposalPage),
  },
  {
    path: 'carona-confirmada',
    loadComponent: () => import('./carpool-scheduled/carona-confirmada.page').then(m => m.CaronaConfirmadaPage)
  },
  {
    path: 'carona-solicitada',
    loadComponent: () => import('./carpool-requested/carpool-requested.page').then(m => m.CarpoolRequestedPage)
  },
  {
    path: '',
    redirectTo: '/aluno/solicitar-carona',
    pathMatch: 'full'
  }
];
