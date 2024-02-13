import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authCanLoadGuard, autoSignInCanLoadGuard } from '@core/guards';

export enum PATH {
  EMPTY = '',
  HOME = 'home',
  AUTH = 'auth',
  ANY = '**'
}

const routes: Routes = [
  {
    path: PATH.EMPTY,
    redirectTo: PATH.AUTH,
    pathMatch: 'full'
  },
  {
    path: PATH.AUTH,
    loadChildren: () => import('@auth/auth.module').then(m => m.AuthModule),
    canLoad: [autoSignInCanLoadGuard]
  },
  {
    path: PATH.HOME,
    loadChildren: () => import('@home/home.module').then(m => m.HomeModule),
    canLoad: [authCanLoadGuard]
  },
  {
    path: PATH.ANY,
    redirectTo: PATH.AUTH
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
