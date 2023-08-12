import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: 'caronas',
    loadComponent: () =>
      import('./carpool-requests/carpool-requests.page').then((m) => m.CarpoolRequestsPage),
  },
  {
    path: '',
    redirectTo: '/motorista/caronas',
    pathMatch: 'full'
  }
];
