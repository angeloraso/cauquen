import { NgModule } from '@angular/core';
import { VirtualScrollModule } from '@bizy/components';
import { DirectivesModule } from '@bizy/directives';

@NgModule({
  exports: [VirtualScrollModule, DirectivesModule]
})
export class BizyModule {}
