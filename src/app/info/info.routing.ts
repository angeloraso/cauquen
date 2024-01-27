import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddInfoRecordComponent } from './add-info-record/add-info-record.component';
import { EditInfoRecordComponent } from './edit-info-record/edit-info-record.component';
import { InfoComponent } from './info.component';

export enum PATH {
  EMPTY = '',
  ADD = 'add'
}

const routes: Routes = [
  {
    path: PATH.EMPTY,
    component: InfoComponent,
    pathMatch: 'full'
  },
  {
    path: PATH.ADD,
    component: AddInfoRecordComponent
  },
  {
    path: ':countryRecordId',
    component: EditInfoRecordComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InfoRoutingModule {
  static COMPONENTS = [InfoComponent, AddInfoRecordComponent, EditInfoRecordComponent];
}