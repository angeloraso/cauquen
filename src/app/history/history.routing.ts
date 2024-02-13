import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authCanActivateGuard } from '@core/guards';
import { AddHistoryRecordComponent } from './add-history-record/add-history-record.component';
import { EditHistoryRecordComponent } from './edit-history-record/edit-history-record.component';
import { HistoryComponent } from './history.component';

export enum PATH {
  EMPTY = '',
  ADD = 'add'
}

const routes: Routes = [
  {
    path: PATH.EMPTY,
    component: HistoryComponent,
    pathMatch: 'full',
    canActivate: [authCanActivateGuard]
  },
  {
    path: PATH.ADD,
    component: AddHistoryRecordComponent,
    canActivate: [authCanActivateGuard]
  },
  {
    path: ':historyRecordId',
    component: EditHistoryRecordComponent,
    canActivate: [authCanActivateGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HistoryRoutingModule {
  static COMPONENTS = [HistoryComponent, AddHistoryRecordComponent, EditHistoryRecordComponent];
}
