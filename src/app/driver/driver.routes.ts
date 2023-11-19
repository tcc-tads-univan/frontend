import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: 'inicio',
    loadComponent: () => import('../shared/pages/landing/landing.page').then(m => m.LandingPage)
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
    loadComponent: () => import('../shared/pages/carpool-history/carpool-history.page').then(m => m.CarpoolHistoryPage)
  },
  {
    path: 'perfil',
    loadComponent: () => import('./driver-register-update/driver-register-update.page').then(m => m.DriverRegisterUpdatePage)
  },
  {
    path: 'van',
    loadComponent: () => import('./register-edit-vehicle/register-edit-vehicle.page').then( m => m.RegisterEditVehiclePage)
  },
  {
    path: 'mensalistas',
    loadComponent: () => import('./regular-students-list/regular-students-list.page').then(m => m.RegularStudentsListPage)
  },
  {
    path: 'mensalistas/novo',
    loadComponent: () => import('./add-regular-student/add-regular-student.page').then( m => m.AddRegularStudentPage)
  },
  {
    path: 'caronas/iniciar',
    loadComponent: () => import('./manage-carpool/manage-carpool.page').then( m => m.ManageCarpoolPage)
  },
  {
    path: 'caronas/avaliar',
    loadComponent: () => import('../shared/pages/rank-trip/rank-trip.page').then(m => m.RankTripPage)
  },
  {
    path: '',
    redirectTo: '/motorista/inicio',
    pathMatch: 'full'
  },

];
