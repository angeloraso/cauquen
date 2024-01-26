import { Inject, NgModule } from '@angular/core';
import { TranslateService } from '@bizy/services';
import { BarChartModule } from '@components/bar-chart';
import { ConfirmAlertModule } from '@components/confirm-alert';
import { SharedModule } from '@shared/shared.module';
import { FixedRateRoutingModule } from './fixed-rate.routing';
import { es } from './i18n';

@NgModule({
  imports: [SharedModule, FixedRateRoutingModule, BarChartModule, ConfirmAlertModule],
  declarations: FixedRateRoutingModule.COMPONENTS,
  exports: FixedRateRoutingModule.COMPONENTS
})
export class FixedRateModule {
  constructor(@Inject(TranslateService) private translate: TranslateService) {
    this.translate.loadTranslations(es);
  }
}
