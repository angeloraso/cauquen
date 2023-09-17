import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { HistoryRoutingModule } from './history.routing';

@NgModule({
  imports: [SharedModule, HistoryRoutingModule],
  declarations: [HistoryRoutingModule.COMPONENTS],
  exports: [HistoryRoutingModule.COMPONENTS]
})
export class HistoryModule {}
