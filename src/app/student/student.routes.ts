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
    loadComponent: () => import('./carpool-scheduled/carpool-scheduled').then(m => m.CarpoolScheduled)
  },
  {
    path: 'carona-solicitada',
    loadComponent: () => import('./carpool-requested/carpool-requested.page').then(m => m.CarpoolRequestedPage)
  },
  {
    path: 'cadastro',
    loadComponent: () => import('./registration/registration.page').then( m => m.RegistrationPage)
  },
  {
    path: '',
    redirectTo: '/aluno/solicitar-carona',
    pathMatch: 'full'
  },
  {
    path: 'endereco',
    loadComponent: () => import('./register-edit-destination/register-edit-destination.page').then( m => m.RegisterEditDestinationPage)
  },
  {
    path: 'historico',
    loadComponent: () => import('./carpool-history/carpool-history.page').then( m => m.CarpoolHistoryPage)
  },
  {
    path: 'mensalista',
    loadComponent: () => import('./regular-student/regular-student.page').then( m => m.RegularStudentPage)
  }
];
