import { NgModule } from '@angular/core';
import {
  ButtonModule,
  ConfirmButtonsModule,
  ErrorModule,
  InputModule,
  ToggleModule,
  VirtualScrollModule
} from '@bizy/components';
import { DirectivesModule } from '@bizy/directives';
import { PopupModule } from '@bizy/services';

@NgModule({
  exports: [
    VirtualScrollModule,
    DirectivesModule,
    PopupModule,
    ButtonModule,
    ConfirmButtonsModule,
    ToggleModule,
    InputModule,
    ErrorModule
  ]
})
export class BizyModule {}
