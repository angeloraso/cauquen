import { NgModule } from '@angular/core';
import {
  BarChartModule,
  ButtonModule,
  ConfirmButtonsModule,
  ErrorModule,
  FabButtonModule,
  InputModule,
  LineChartModule,
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
    TranslatePipeModule,
    LineChartModule,
    BarChartModule
  ]
})
export class BizyModule {}
