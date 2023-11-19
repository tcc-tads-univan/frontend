import {Routes} from '@angular/router';
import {driverAuthentication, studentAuthentication} from "./services/authentication/auth.guard";

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/home.routes').then(m => m.routes)
  },
  {
    path: 'aluno/cadastro',
    loadComponent: () => import('./student/student-register-update/student-register-update.page').then(m => m.StudentRegisterUpdatePage)
  },
  {
    path: 'motorista/cadastro',
    loadComponent: () => import('./driver/driver-register-update/driver-register-update.page').then(m => m.DriverRegisterUpdatePage)
  },
  {
    path: 'aluno',
    loadChildren: () => import('./student/student.routes').then((m) => m.routes),
    canActivate: [studentAuthentication]
  },
  {
    path: 'motorista',
    loadChildren: () => import('./driver/driver.routes').then((m) => m.routes),
    canActivate: [driverAuthentication]
  },
  {
    path: 'user-landing-page',
    loadComponent: () => import('./shared/pages/landing/landing.page').then(m => m.LandingPage)
  },
  {
    path: 'rank-trip',
    loadComponent: () => import('./shared/pages/rank-trip/rank-trip.page').then(m => m.RankTripPage)
  },
];
