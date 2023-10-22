import {Routes} from '@angular/router';
import {driverAuthentication, studentAuthentication} from "./shared/auth/auth.guard";

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/home.routes').then(m => m.routes)
  },
  {
    path: 'aluno/cadastro',
    loadComponent: () => import('./student/registration/registration.page').then(m => m.RegistrationPage)
  },
  {
    path: 'motorista/cadastro',
    loadComponent: () => import('./driver/register-edit/register-edit.page').then(m => m.RegisterEditPage)
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
];
