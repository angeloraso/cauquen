import { Routes } from '@angular/router';
import { adminGuard } from '@core/guards';

export enum PATH {
  EMPTY = '',
  ADD = 'add'
}

export const ROUTES: Routes = [
  {
    path: PATH.EMPTY,
    loadComponent: () => import('@info/info.component').then(m => m.InfoComponent),
    pathMatch: 'full'
  },
  {
    path: PATH.ADD,
    loadComponent: () => import('@info/add-country-record/add-country-record.component').then(m => m.AddCountryRecordComponent),
    canActivate: [adminGuard]
  }
];
