import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { adminGuard, authGuard } from '@core/guards';
import { AddCountryRecordComponent } from './add-country-record/add-country-record.component';
import { EditCountryRecordComponent } from './edit-country-record/edit-country-record.component';
import { InfoComponent } from './info.component';

export enum PATH {
  EMPTY = '',
  ADD = 'add'
}

const routes: Routes = [
  {
    path: PATH.EMPTY,
    component: InfoComponent,
    pathMatch: 'full',
    canActivate: [authGuard]
  },
  {
    path: PATH.ADD,
    component: AddCountryRecordComponent,
    canActivate: [authGuard, adminGuard]
  },
  {
    path: ':countryRecordId',
    component: EditCountryRecordComponent,
    canActivate: [authGuard, adminGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InfoRoutingModule {
  static COMPONENTS = [InfoComponent, AddCountryRecordComponent, EditCountryRecordComponent];
}
