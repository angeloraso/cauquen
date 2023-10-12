import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from '@dashboard/dashboard.component';
import { FixedRateComponent } from '@fixed-rate/fixed-rate.component';
import { HistoryComponent } from '@history/history.component';
import { InflationComponent } from '@inflation/inflation.component';
import { HomeComponent } from './home.component';

export enum PATH {
  EMPTY = '',
  DASHBOARD = 'dashboard',
  HISTORY = 'history',
  INFLATION = 'inflation',
  FIXED_RATE = 'fixed-rate',
  ANY = '**'
}

const routes: Routes = [
  {
    path: PATH.EMPTY,
    component: HomeComponent,
    children: [
      {
        path: PATH.EMPTY,
        redirectTo: PATH.DASHBOARD,
        pathMatch: 'full'
      },
      {
        path: PATH.DASHBOARD,
        component: DashboardComponent
      },
      {
        path: PATH.HISTORY,
        component: HistoryComponent
      },
      {
        path: PATH.INFLATION,
        component: InflationComponent
      },
      {
        path: PATH.FIXED_RATE,
        component: FixedRateComponent
      },
      {
        path: PATH.ANY,
        redirectTo: PATH.DASHBOARD
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {
  static COMPONENTS = [HomeComponent];
}
