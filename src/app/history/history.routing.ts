import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HistoryComponent } from './history.component';

export enum PATH {
  EMPTY = ''
}

const routes: Routes = [
  {
    path: PATH.EMPTY,
    component: HistoryComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HistoryRoutingModule {
  static COMPONENTS = [HistoryComponent];
}
