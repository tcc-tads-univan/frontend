import {Routes} from '@angular/router';
import {driverAuthentication, studentAuthentication} from "./shared/guards/auth.guard";

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
    loadComponent: () => import('./driver/register-edit/driver-registration-page.component').then(m => m.DriverRegistrationPage)
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
