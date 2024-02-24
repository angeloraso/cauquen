import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { ShowHidePasswordComponent } from './show-hide-password.component';

@NgModule({
  imports: [SharedModule],
  declarations: [ShowHidePasswordComponent],
  exports: [ShowHidePasswordComponent]
})
export class ShowHidePasswordModule {}
