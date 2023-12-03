import { Inject, NgModule } from '@angular/core';
import { BarChartModule } from '@components/bar-chart';
import { ConfirmFooterModule } from '@components/confirm-footer';
import { LineChartModule } from '@components/line-chart';
import { CauquenTranslateService } from '@core/services';
import { SharedModule } from '@shared/shared.module';
import { CountryRecordFormComponent } from './components';
import { DashboardRoutingModule } from './dashboard.routing';
import { es } from './i18n';

const COMPONENTS: Array<any> = [CountryRecordFormComponent];

@NgModule({
  imports: [
    SharedModule,
    DashboardRoutingModule,
    LineChartModule,
    BarChartModule,
    ConfirmFooterModule
  ],
  declarations: DashboardRoutingModule.COMPONENTS.concat(COMPONENTS),
  exports: DashboardRoutingModule.COMPONENTS
})
export class DashboardModule {
  constructor(@Inject(CauquenTranslateService) private translate: CauquenTranslateService) {
    this.translate.loadTranslations(es);
  }
}
