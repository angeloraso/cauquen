import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from '@core/guards';
import { DashboardComponent } from './dashboard.component';

export enum PATH {
  EMPTY = ''
}

const routes: Routes = [
  {
    path: PATH.EMPTY,
    component: DashboardComponent,
    pathMatch: 'full',
    canActivate: [authGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {
  static COMPONENTS = [DashboardComponent];
}
