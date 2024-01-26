import { NgModule } from '@angular/core';
import {
  ButtonModule,
  ConfirmButtonsModule,
  ErrorModule,
  InputModule,
  TabsModule,
  ToggleModule,
  ToolbarModule,
  VirtualScrollModule
} from '@bizy/components';
import { DirectivesModule } from '@bizy/directives';
import { PopupModule } from '@bizy/services';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  exports: [
    VirtualScrollModule,
    DirectivesModule,
    PopupModule,
    ButtonModule,
    ConfirmButtonsModule,
    ToggleModule,
    InputModule,
    ErrorModule,
    ConfirmButtonsModule,
    TabsModule,
    TranslateModule,
    ToolbarModule
  ]
})
export class BizyModule {}
