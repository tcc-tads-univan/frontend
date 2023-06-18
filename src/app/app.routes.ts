import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./inicio/tela-inicio/tela-inicio.page').then(m => m.TelaInicioPage)
  },
  {
    path: 'motorista',
    loadChildren: () => import('./motorista/motorista.routes').then((m) => m.routes),
  },
  {
    path: 'aluno',
    loadChildren: () => import('./aluno/aluno.routes').then((m) => m.routes)
  }
];
