import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InflationComponent } from './inflation.component';

export enum PATH {
  EMPTY = ''
}

const routes: Routes = [
  {
    path: PATH.EMPTY,
    component: InflationComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InflationRoutingModule {
  static COMPONENTS = [InflationComponent];
}
