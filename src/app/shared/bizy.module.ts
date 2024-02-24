import { NgModule } from '@angular/core';
import {
  ButtonModule,
  ConfirmButtonsModule,
  ErrorModule,
  FabButtonModule,
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
import { PopupModule, TranslatePipeModule } from '@bizy/services';

@NgModule({
  exports: [
    VirtualScrollModule,
    DirectivesModule,
    PipesModule,
    PopupModule,
    ButtonModule,
    FabButtonModule,
    ConfirmButtonsModule,
    ToggleModule,
    InputModule,
    ErrorModule,
    ConfirmButtonsModule,
    TabsModule,
    ToolbarModule,
    SidebarModule,
    TableModule,
    SelectModule,
    TranslatePipeModule
  ]
})
export class BizyModule {}
