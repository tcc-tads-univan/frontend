import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: 'iniciar',
    loadComponent: () => import('./home/home.page').then( m => m.HomePage)
  },
  {
    path: 'caronas',
    loadComponent: () =>
      import('./carpool-requests/carpool-requests.page').then((m) => m.CarpoolRequestsPage),
  },
  {
    path: 'editar',
    loadComponent: () => import('./register-edit/register-edit.page').then(m => m.RegisterEditPage)
  },
  {
    path: 'van',
    loadComponent: () => import('./register-edit-vehicle/register-edit-vehicle.page').then( m => m.RegisterEditVehiclePage)
  },
  {

    path: 'caronas/historico',
    loadComponent: () => import('./carpool-history/carpool-history.page').then( m => m.CarpoolHistoryPage)
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
    path: 'inicio',
    loadComponent: () => import('./home-screen/home-screen.page').then( m => m.HomeScreenPage)
  },
  {
    path: '',
    redirectTo: '/motorista/inicio',
    pathMatch: 'full'
  },

];
