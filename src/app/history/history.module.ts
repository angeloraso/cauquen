import { NgModule } from '@angular/core';
import { ConfirmAlertModule } from '@components/confirm-alert';
import { ConfirmFooterModule } from '@components/confirm-footer';
import { SharedModule } from '@shared/shared.module';
import { HistoryRecordFormComponent } from './components';
import { HistoryRoutingModule } from './history.routing';
import { HistoryService } from './history.service';

const COMPONENTS: Array<any> = [HistoryRecordFormComponent];
@NgModule({
  imports: [SharedModule, HistoryRoutingModule, ConfirmAlertModule, ConfirmFooterModule],
  declarations: HistoryRoutingModule.COMPONENTS.concat(COMPONENTS),
  exports: HistoryRoutingModule.COMPONENTS,
  providers: [HistoryService]
})
export class HistoryModule {}
