import { Routes } from '@angular/router';

export enum PATH {
  EMPTY = ''
}

export const ROUTES: Routes = [
  {
    path: PATH.EMPTY,
    loadComponent: () => import('@config/config.component').then(m => m.ConfigComponent),
    pathMatch: 'full'
  }
];
