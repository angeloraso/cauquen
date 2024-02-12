import { NgModule } from '@angular/core';
import {
  ButtonModule,
  ConfirmButtonsModule,
  ErrorModule,
  InputModule,
  SelectModule,
  SidebarModule,
  TableModule,
  TabsModule,
  ToggleModule,
  ToolbarModule,
  VirtualScrollModule
} from '@bizy/components';
import { DirectivesModule } from '@bizy/directives';
import { PipesModule } from '@bizy/pipes';
import { PopupModule } from '@bizy/services';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  exports: [
    VirtualScrollModule,
    DirectivesModule,
    PipesModule,
    PopupModule,
    ButtonModule,
    ConfirmButtonsModule,
    ToggleModule,
    InputModule,
    ErrorModule,
    ConfirmButtonsModule,
    TabsModule,
    TranslateModule,
    ToolbarModule,
    SidebarModule,
    TableModule,
    SelectModule
  ]
})
export class BizyModule {}
