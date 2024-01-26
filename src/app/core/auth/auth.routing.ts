import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

export enum PATH {
  EMPTY = '',
  LOGIN = 'login'
}

const routes: Routes = [
  {
    path: '',
    redirectTo: PATH.LOGIN,
    pathMatch: 'full'
  },
  {
    path: PATH.LOGIN,
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {
  static COMPONENTS = [LoginComponent];
}
