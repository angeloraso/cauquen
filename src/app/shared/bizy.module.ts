import { NgModule } from '@angular/core';
import {
  BizyBarLineChartModule,
  BizyButtonModule,
  BizyCardModule,
  BizyDatePickerModule,
  BizyInputModule,
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
import { BizyPopupModule, BizyToastModule, BizyTranslatePipeModule } from '@bizy/services';

@NgModule({
  exports: [
    BizyVirtualScrollModule,
    BizyDirectivesModule,
    BizyPipesModule,
    BizyPopupModule,
    BizyToastModule,
    BizyButtonModule,
    BizyToggleModule,
    BizyInputModule,
    BizyTabsModule,
    BizyToolbarModule,
    BizySidebarModule,
    BizyTableModule,
    BizySelectModule,
    BizyTranslatePipeModule,
    BizyCardModule,
    BizyDatePickerModule,
    BizyBarLineChartModule
  ]
})
export class BizyModule {}
