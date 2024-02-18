import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authCanActivateGuard } from '@core/guards';
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
    canActivate: [authCanActivateGuard]
  },
  {
    path: PATH.ADD,
    component: AddCountryRecordComponent,
    canActivate: [authCanActivateGuard]
  },
  {
    path: ':countryRecordId',
    component: EditCountryRecordComponent,
    canActivate: [authCanActivateGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InfoRoutingModule {
  static COMPONENTS = [InfoComponent, AddCountryRecordComponent, EditCountryRecordComponent];
}
