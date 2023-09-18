import { NgModule } from '@angular/core';
import { ConfirmAlertModule } from '@components/confirm-alert';
import { RecordFormModule } from '@components/record-form';
import { SharedModule } from '@shared/shared.module';
import { HistoryRoutingModule } from './history.routing';
import { HistoryService } from './history.service';

@NgModule({
  imports: [SharedModule, HistoryRoutingModule, RecordFormModule, ConfirmAlertModule],
  declarations: [HistoryRoutingModule.COMPONENTS],
  exports: [HistoryRoutingModule.COMPONENTS],
  providers: [HistoryService]
})
export class HistoryModule {}
