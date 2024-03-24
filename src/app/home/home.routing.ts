import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';

export enum PATH {
  EMPTY = '',
  DASHBOARD = 'dashboard',
  CASH_FLOW = 'cash-flow',
  INFO = 'info',
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
        path: PATH.CASH_FLOW,
        loadChildren: () => import('@cash-flow/cash-flow.module').then(m => m.CashFlowModule)
      },
      {
        path: PATH.INFO,
        loadChildren: () => import('@info/info.module').then(m => m.InfoModule)
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
