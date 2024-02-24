import { Inject, NgModule } from '@angular/core';
import { TranslateService } from '@bizy/services';
import { BarChartModule } from '@components/bar-chart';
import { LineChartModule } from '@components/line-chart';
import { SharedModule } from '@shared/shared.module';
import { DashboardRoutingModule } from './dashboard.routing';
import { es } from './i18n';

@NgModule({
  imports: [SharedModule, DashboardRoutingModule, LineChartModule, BarChartModule],
  declarations: DashboardRoutingModule.COMPONENTS,
  exports: DashboardRoutingModule.COMPONENTS
})
export class DashboardModule {
  constructor(@Inject(TranslateService) private translate: TranslateService) {
    this.translate.loadTranslations(es);
  }
}
