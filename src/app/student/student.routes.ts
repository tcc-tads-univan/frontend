import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: 'carona',
    loadComponent: () => import('./request-carpool/request-carpool.page').then(m => m.RequestCarpoolPage)
  },
  {
    path: 'carona/validar',
    loadComponent: () => import('./validate-carpool-proposal/validate-carpool-proposal.page').then((m) => m.ValidateCarpoolProposalPage),
  },
  {
    path: 'carona/confirmacao',
    loadComponent: () => import('./carpool-scheduled/carpool-scheduled').then(m => m.CarpoolScheduled)
  },
  {
    path: 'carona/atual',
    loadComponent: () => import('./carpool-requested/carpool-requested.page').then(m => m.CarpoolRequestedPage)
  },
  {
    path: 'cadastro',
    loadComponent: () => import('./registration/registration.page').then( m => m.RegistrationPage)
  },
  {
    path: '',
    redirectTo: '/aluno/carona',
    pathMatch: 'full'
  },
  {
    path: 'endereco',
    loadComponent: () => import('./register-edit-destination/register-edit-destination.page').then( m => m.RegisterEditDestinationPage)
  },
  {
    path: 'carona/historico',
    loadComponent: () => import('./carpool-history/carpool-history.page').then( m => m.CarpoolHistoryPage)
  },
  {
    path: 'mensalista',
    loadComponent: () => import('./regular-student/regular-student.page').then( m => m.RegularStudentPage)
  }
];
