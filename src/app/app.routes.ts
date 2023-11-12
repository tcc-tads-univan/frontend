import {Routes} from '@angular/router';
import {driverAuthentication, studentAuthentication} from "./services/authentication/auth.guard";

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/home.routes').then(m => m.routes)
  },
  {
    path: 'aluno/cadastro',
    loadComponent: () => import('./student/student-registration/student-registration-page.component').then(m => m.StudentRegistrationPage)
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
    path: 'carpool-history',
    loadComponent: () => import('./shared/pages/carpool-history/carpool-history.page').then( m => m.CarpoolHistoryPage)
  },
];
