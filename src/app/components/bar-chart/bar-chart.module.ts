import { Inject, NgModule } from '@angular/core';
import { TranslateService } from '@bizy/services';
import { SharedModule } from '@shared/shared.module';
import { BarChartComponent } from './bar-chart.component';
import { es } from './i18n';

@NgModule({
  imports: [SharedModule],
  declarations: [BarChartComponent],
  exports: [BarChartComponent]
})
export class BarChartModule {
  constructor(@Inject(TranslateService) private translate: TranslateService) {
    this.translate.loadTranslations(es);
  }
}
