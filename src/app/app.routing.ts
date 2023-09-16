import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export enum PATH {
  EMPTY = '',
  MENU = '-',
  ANY = '**'
}

const routes: Routes = [
  {
    path: PATH.EMPTY,
    redirectTo: PATH.MENU,
    pathMatch: 'full'
  },
  {
    path: PATH.MENU,
    loadChildren: () => import('@menu/side-menu.module').then(m => m.SideMenuModule)
  },
  {
    path: PATH.ANY,
    redirectTo: PATH.MENU
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
