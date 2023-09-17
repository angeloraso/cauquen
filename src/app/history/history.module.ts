import { NgModule } from '@angular/core';
import { RecordFormModule } from '@components/record-form';
import { SharedModule } from '@shared/shared.module';
import { HistoryRoutingModule } from './history.routing';

@NgModule({
  imports: [SharedModule, HistoryRoutingModule, RecordFormModule],
  declarations: [HistoryRoutingModule.COMPONENTS],
  exports: [HistoryRoutingModule.COMPONENTS]
})
export class HistoryModule {}
