import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: 'inicio',
    loadComponent: () => import('./driver-landing/driver-landing-page.component').then(m => m.DriverLandingPage)
  },
  {
    path: 'caronas',
    loadComponent: () =>
      import('./carpool-requests/carpool-requests.page').then((m) => m.CarpoolRequestsPage),
  },
  {
    path: 'caronas/procurar',
    loadComponent: () => import('./find-carpool/find-carpool.page').then(m => m.FindCarpoolPage)
  },
  {
    path: 'caronas/detalhe',
    loadComponent: () => import('./carpool-route-detail/carpool-route-detail.page').then( m => m.CarpoolRouteDetailPage)
  },
  {

    path: 'caronas/historico',
    loadComponent: () => import('./carpool-history/carpool-history.page').then( m => m.CarpoolHistoryPage)
  },
  {
    path: 'perfil',
    loadComponent: () => import('./register-edit/driver-registration-page.component').then(m => m.DriverRegistrationPage)
  },
  {
    path: 'van',
    loadComponent: () => import('./register-edit-vehicle/register-edit-vehicle.page').then( m => m.RegisterEditVehiclePage)
  },
  {
    path: 'mensalistas/editar',
    loadComponent: () => import('./register-edit-regular-student/register-edit-regular-student.page').then( m => m.RegisterEditRegularStudentPage)
  },
  {
    path: 'mensalistas/novo',
    loadComponent: () => import('./add-regular-student/add-regular-student.page').then( m => m.AddRegularStudentPage)
  },
  {
    path: '',
    redirectTo: '/motorista/inicio',
    pathMatch: 'full'
  },
];
