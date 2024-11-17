import { NgModule } from '@angular/core';
import {
  BizyBarLineChartModule,
  BizyButtonModule,
  BizyCardModule,
  BizyDatePickerModule,
  BizyFormModule,
  BizyInputModule,
  BizySelectModule,
  BizySidebarModule,
  BizyTableModule,
  BizyTabsModule,
  BizyToggleModule,
  BizyToolbarModule
} from '@bizy/components';
import { BizyDirectivesModule } from '@bizy/directives';
import { BizyPipesModule } from '@bizy/pipes';
import { BizyPopupModule, BizyToastModule, BizyTranslatePipeModule } from '@bizy/services';

@NgModule({
  exports: [
    BizyDirectivesModule,
    BizyPipesModule,
    BizyPopupModule,
    BizyToastModule,
    BizyButtonModule,
    BizyToggleModule,
    BizyInputModule,
    BizyTabsModule,
    BizyToastModule,
    BizyToolbarModule,
    BizySidebarModule,
    BizyTableModule,
    BizySelectModule,
    BizyTranslatePipeModule,
    BizyCardModule,
    BizyDatePickerModule,
    BizyBarLineChartModule,
    BizyFormModule
  ]
})
export class BizyModule {}
