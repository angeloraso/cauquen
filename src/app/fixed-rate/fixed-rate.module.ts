import { Inject, NgModule } from '@angular/core';
import { BarChartModule } from '@components/bar-chart';
import { CauquenTranslateService } from '@core/services';
import { SharedModule } from '@shared/shared.module';
import { FixedRateRoutingModule } from './fixed-rate.routing';
import { es } from './i18n';

@NgModule({
  imports: [SharedModule, FixedRateRoutingModule, BarChartModule],
  declarations: FixedRateRoutingModule.COMPONENTS,
  exports: FixedRateRoutingModule.COMPONENTS
})
export class FixedRateModule {
  constructor(@Inject(CauquenTranslateService) private translate: CauquenTranslateService) {
    this.translate.loadTranslations(es);
  }
}
