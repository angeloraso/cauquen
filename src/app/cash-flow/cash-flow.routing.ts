import { Routes } from '@angular/router';

export enum PATH {
  EMPTY = '',
  ADD = 'add'
}

export const ROUTES: Routes = [
  {
    path: PATH.EMPTY,
    loadComponent: () => import('@cash-flow/cash-flow.component').then(m => m.CashFlowComponent),
    pathMatch: 'full'
  },
  {
    path: PATH.ADD,
    loadComponent: () => import('@cash-flow/add-cash-flow-record/add-cash-flow-record.component').then(m => m.AddCashFlowRecordComponent)
  },
  {
    path: ':cashFlowRecordId',
    loadComponent: () => import('@cash-flow/edit-cash-flow-record/edit-cash-flow-record.component').then(m => m.EditCashFlowRecordComponent)
  }
];
