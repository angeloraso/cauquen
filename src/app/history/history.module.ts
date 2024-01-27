import { Inject, NgModule } from '@angular/core';
import { TranslateService } from '@bizy/services';
import { ConfirmPopupModule } from '@components/confirm-popup';
import { SharedModule } from '@shared/shared.module';
import { HistoryRecordFormComponent } from './components';
import { HistoryRoutingModule } from './history.routing';
import { es } from './i18n';

const COMPONENTS: Array<any> = [HistoryRecordFormComponent];
@NgModule({
  imports: [SharedModule, HistoryRoutingModule, ConfirmPopupModule],
  declarations: HistoryRoutingModule.COMPONENTS.concat(COMPONENTS),
  exports: HistoryRoutingModule.COMPONENTS
})
export class HistoryModule {
  constructor(@Inject(TranslateService) private translate: TranslateService) {
    this.translate.loadTranslations(es);
  }
}
