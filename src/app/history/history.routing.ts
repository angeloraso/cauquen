import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
    pathMatch: 'full'
  },
  {
    path: PATH.ADD,
    component: AddHistoryRecordComponent
  },
  {
    path: ':historyRecordId',
    component: EditHistoryRecordComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HistoryRoutingModule {
  static COMPONENTS = [HistoryComponent, AddHistoryRecordComponent, EditHistoryRecordComponent];
}
