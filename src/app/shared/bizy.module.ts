import { NgModule } from '@angular/core';
import {
  BizyBarChartModule,
  BizyButtonModule,
  BizyConfirmButtonsModule,
  BizyErrorModule,
  BizyFabButtonModule,
  BizyInputModule,
  BizyLineChartModule,
  BizySelectModule,
  BizySidebarModule,
  BizyTableModule,
  BizyTabsModule,
  BizyToggleModule,
  BizyToolbarModule,
  BizyVirtualScrollModule
} from '@bizy/components';
import { BizyDirectivesModule } from '@bizy/directives';
import { BizyPipesModule } from '@bizy/pipes';
import { BizyPopupModule, TranslatePipeModule } from '@bizy/services';

@NgModule({
  exports: [
    BizyVirtualScrollModule,
    BizyDirectivesModule,
    BizyPipesModule,
    BizyPopupModule,
    BizyButtonModule,
    BizyFabButtonModule,
    BizyConfirmButtonsModule,
    BizyToggleModule,
    BizyInputModule,
    BizyErrorModule,
    BizyConfirmButtonsModule,
    BizyTabsModule,
    BizyToolbarModule,
    BizySidebarModule,
    BizyTableModule,
    BizySelectModule,
    TranslatePipeModule,
    BizyLineChartModule,
    BizyBarChartModule
  ]
})
export class BizyModule {}
