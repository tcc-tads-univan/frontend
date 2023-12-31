import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: 'carona',
    loadComponent: () => import('./request-carpool/request-carpool.page').then(m => m.RequestCarpoolPage)
  },
  {
    path: 'carona/solicitada',
    loadComponent: () => import('./carpool-requested/carpool-requested.page').then(m => m.CarpoolRequestedPage)
  },
  {
    path: 'carona/validar',
    loadComponent: () => import('./validate-carpool-proposal/validate-carpool-proposal.page').then((m) => m.ValidateCarpoolProposalPage),
  },
  {
    path: 'carona/confirmada',
    loadComponent: () => import('./carpool-scheduled/carpool-scheduled').then(m => m.CarpoolScheduled)
  },
  {
    path: 'perfil',
    loadComponent: () => import('./student-register-update/student-register-update.page').then(m => m.StudentRegisterUpdatePage)
  },
  {
    path: 'endereco',
    loadComponent: () => import('./register-edit-destination/register-edit-destination.page').then(m => m.RegisterEditDestinationPage)
  },
  {
    path: 'carona/historico',
    loadComponent: () => import('../shared/pages/carpool-history/carpool-history.page').then(m => m.CarpoolHistoryPage)
  },
  {
    path: 'mensalista',
    loadComponent: () => import('./regular-student/regular-student.page').then(m => m.RegularStudentPage)
  },
  {
    path: 'inicio',
    loadComponent: () => import('../shared/pages/landing/landing.page').then(m => m.LandingPage)
  },
  {
    path: 'carona/avaliar',
    loadComponent: () => import('../shared/pages/rank-trip/rank-trip.page').then(m => m.RankTripPage)
  },
  {
    path: '',
    redirectTo: '/aluno/inicio',
    pathMatch: 'full'
  }
];
