import { Inject, NgModule } from '@angular/core';
import { BarChartModule } from '@components/bar-chart';
import { CauquenTranslateService } from '@core/services';
import { SharedModule } from '@shared/shared.module';
import { es } from './i18n';
import { InflationRoutingModule } from './inflation.routing';

@NgModule({
  imports: [SharedModule, InflationRoutingModule, BarChartModule],
  declarations: InflationRoutingModule.COMPONENTS,
  exports: InflationRoutingModule.COMPONENTS
})
export class InflationModule {
  constructor(@Inject(CauquenTranslateService) private translate: CauquenTranslateService) {
    this.translate.loadTranslations(es);
  }
}
