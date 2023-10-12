import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FixedRateComponent } from './fixed-rate.component';

export enum PATH {
  EMPTY = ''
}

const routes: Routes = [
  {
    path: PATH.EMPTY,
    component: FixedRateComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FixedRateRoutingModule {
  static COMPONENTS = [FixedRateComponent];
}
