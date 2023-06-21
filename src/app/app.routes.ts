import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./inicio/inicio.routes').then(m => m.routes)
  },
  {
    path: 'motorista',
    loadChildren: () => import('./motorista/motorista.routes').then((m) => m.routes),
  },
  {
    path: 'aluno',
    loadChildren: () => import('./aluno/aluno.routes').then((m) => m.routes)
  },
];
