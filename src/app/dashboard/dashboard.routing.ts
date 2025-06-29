import { Routes } from '@angular/router';

export enum PATH {
  EMPTY = ''
}

export const ROUTES: Routes = [
  {
    path: PATH.EMPTY,
    loadComponent: () => import('@dashboard/dashboard.component').then(m => m.DashboardComponent),
    pathMatch: 'full'
  }
];
