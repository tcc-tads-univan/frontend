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
    path: 'carona/confirmada',
    loadComponent: () => import('./carpool-scheduled/carpool-scheduled').then(m => m.CarpoolScheduled)
  },
  {
    path: 'carona/atual',
    loadComponent: () => import('./carpool-requested/carpool-requested.page').then(m => m.CarpoolRequestedPage)
  },
  {
    path: 'editar',
    loadComponent: () => import('./student-registration/student-registration-page.component').then(m => m.StudentRegistrationPage)
  },
  {
    path: 'endereco',
    loadComponent: () => import('./register-edit-destination/register-edit-destination.page').then(m => m.RegisterEditDestinationPage)
  },
  {
    path: 'carona/historico',
    loadComponent: () => import('./carpool-history/carpool-history.page').then(m => m.CarpoolHistoryPage)
  },
  {
    path: 'mensalista',
    loadComponent: () => import('./regular-student/regular-student.page').then(m => m.RegularStudentPage)
  },
  {
    path: 'inicio',
    loadComponent: () => import('./home-screen/home-screen.page').then(m => m.HomeScreenPage)
  },
  {
    path: '',
    redirectTo: '/aluno/inicio',
    pathMatch: 'full'
  }
];
