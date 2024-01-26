import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';

export enum PATH {
  EMPTY = '',
  DASHBOARD = 'dashboard',
  HISTORY = 'history',
  INFLATION = 'inflation',
  FIXED_RATE = 'fixed-rate',
  CONFIG = 'config',
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
        loadChildren: () => import('@dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: PATH.HISTORY,
        loadChildren: () => import('@history/history.module').then(m => m.HistoryModule)
      },
      {
        path: PATH.INFLATION,
        loadChildren: () => import('@inflation/inflation.module').then(m => m.InflationModule)
      },
      {
        path: PATH.FIXED_RATE,
        loadChildren: () => import('@fixed-rate/fixed-rate.module').then(m => m.FixedRateModule)
      },
      {
        path: PATH.CONFIG,
        loadChildren: () => import('@config/config.module').then(m => m.ConfigModule)
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
