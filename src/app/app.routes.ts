import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./inicio/tela-inicio/tela-inicio.page').then(m => m.TelaInicioPage)
  },
  // {
  //   path: '/teste',
  //   loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  // },
];
