import {Routes} from '@angular/router';

export const routes: Routes = [
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
    path: '',
    redirectTo: '/motorista/caronas',
    pathMatch: 'full'
  }
];
