import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: 'inicio',
    loadComponent: () => import('./home/home.page').then( m => m.HomePage)
  },
  {
    path: 'caronas',
    loadComponent: () =>
      import('./carpool-requests/carpool-requests.page').then((m) => m.CarpoolRequestsPage),
  },
  {
    path: 'cadastro',
    loadComponent: () => import('./registration/registration.page').then( m => m.RegistrationPage)
  },
  {
    path: 'van',
    loadComponent: () => import('./register-edit-vehicle/register-edit-vehicle.page').then( m => m.RegisterEditVehiclePage)
  },
  {
    path: '',
    redirectTo: '/motorista/inicio',
    pathMatch: 'full'
  },
  {
    path: 'historico',
    loadComponent: () => import('./carpool-history/carpool-history.page').then( m => m.CarpoolHistoryPage)
  },
  {
    path: 'manter-aluno',
    loadComponent: () => import('./register-edit-regular-student/register-edit-regular-student.page').then( m => m.RegisterEditRegularStudentPage)
  },
  {
    path: 'adicionar-aluno',
    loadComponent: () => import('./add-regular-student/add-regular-student.page').then( m => m.AddRegularStudentPage)
  }
];
