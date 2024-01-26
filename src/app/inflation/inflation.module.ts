import { Inject, NgModule } from '@angular/core';
import { TranslateService } from '@bizy/services';
import { BarChartModule } from '@components/bar-chart';
import { ConfirmAlertModule } from '@components/confirm-alert';
import { SharedModule } from '@shared/shared.module';
import { es } from './i18n';
import { InflationRoutingModule } from './inflation.routing';

@NgModule({
  imports: [SharedModule, InflationRoutingModule, BarChartModule, ConfirmAlertModule],
  declarations: InflationRoutingModule.COMPONENTS,
  exports: InflationRoutingModule.COMPONENTS
})
export class InflationModule {
  constructor(@Inject(TranslateService) private translate: TranslateService) {
    this.translate.loadTranslations(es);
  }
}
