import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authCanActivateGuard } from '@core/guards';
import { AddCashFlowRecordComponent } from './add-cash-flow-record/add-cash-flow-record.component';
import { CashFlowComponent } from './cash-flow.component';
import { EditCashFlowRecordComponent } from './edit-cash-flow-record/edit-cash-flow-record.component';

export enum PATH {
  EMPTY = '',
  ADD = 'add'
}

const routes: Routes = [
  {
    path: PATH.EMPTY,
    component: CashFlowComponent,
    pathMatch: 'full',
    canActivate: [authCanActivateGuard]
  },
  {
    path: PATH.ADD,
    component: AddCashFlowRecordComponent,
    canActivate: [authCanActivateGuard]
  },
  {
    path: ':cashFlowRecordId',
    component: EditCashFlowRecordComponent,
    canActivate: [authCanActivateGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CashFlowRoutingModule {
  static COMPONENTS = [CashFlowComponent, AddCashFlowRecordComponent, EditCashFlowRecordComponent];
}
