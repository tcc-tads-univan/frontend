import {Routes} from '@angular/router';
import {driverAuthentication, studentAuthentication} from "./shared/auth/auth.guard";

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/home.routes').then(m => m.routes)
  },
  {
    path: 'motorista',
    loadChildren: () => import('./driver/driver.routes').then((m) => m.routes),
    canActivate: [driverAuthentication]
  },
  {
    path: 'aluno',
    loadChildren: () => import('./student/student.routes').then((m) => m.routes),
    canActivate: [studentAuthentication]
  },
];
