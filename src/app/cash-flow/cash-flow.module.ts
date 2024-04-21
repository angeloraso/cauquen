import { Inject, NgModule } from '@angular/core';
import { BizyTranslateService } from '@bizy/services';
import { ConfirmPopupModule } from '@components/confirm-popup';
import { SharedModule } from '@shared/shared.module';
import { CashFlowRoutingModule } from './cash-flow.routing';
import { CashFlowRecordFormComponent } from './components';
import { es } from './i18n';

const COMPONENTS: Array<any> = [CashFlowRecordFormComponent];
@NgModule({
  imports: [SharedModule, CashFlowRoutingModule, ConfirmPopupModule],
  declarations: CashFlowRoutingModule.COMPONENTS.concat(COMPONENTS),
  exports: CashFlowRoutingModule.COMPONENTS
})
export class CashFlowModule {
  constructor(@Inject(BizyTranslateService) private translate: BizyTranslateService) {
    this.translate.loadTranslations(es);
  }
}
