import { Routes } from '@angular/router';
import { authGuard } from '@core/guards';

export enum PATH {
  EMPTY = '',
  DASHBOARD = 'dashboard',
  CASH_FLOW = 'cash-flow',
  INFO = 'info',
  CONFIG = 'config',
  ANY = '**'
}

export const ROUTES: Routes = [
  {
    path: PATH.EMPTY,
    loadComponent: () => import('@home/home.component').then(m => m.HomeComponent),
    children: [
      {
        path: PATH.EMPTY,
        redirectTo: PATH.DASHBOARD,
        pathMatch: 'full'
      },
      {
        path: PATH.CASH_FLOW,
        loadChildren: () => import('@cash-flow/cash-flow.routing').then(m => m.ROUTES),
        canActivate: [authGuard]
      },
      {
        path: PATH.DASHBOARD,
        loadChildren: () => import('@dashboard/dashboard.routing').then(m => m.ROUTES),
        canActivate: [authGuard]
      },
      {
        path: PATH.INFO,
        loadChildren: () => import('@info/info.routing').then(m => m.ROUTES),
        canActivate: [authGuard]
      },
      {
        path: PATH.CONFIG,
        loadChildren: () => import('@config/config.routing').then(m => m.ROUTES),
        canActivate: [authGuard]
      },
      {
        path: PATH.ANY,
        redirectTo: PATH.DASHBOARD
      }
    ]
  }
];
