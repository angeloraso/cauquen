import { Inject, NgModule } from '@angular/core';
import { CauquenTranslateService } from '@core/services';
import { SharedModule } from '@shared/shared.module';
import { BarChartComponent } from './bar-chart.component';
import { es } from './i18n';

@NgModule({
  imports: [SharedModule],
  declarations: [BarChartComponent],
  exports: [BarChartComponent]
})
export class BarChartModule {
  constructor(@Inject(CauquenTranslateService) private translate: CauquenTranslateService) {
    this.translate.loadTranslations(es);
  }
}
