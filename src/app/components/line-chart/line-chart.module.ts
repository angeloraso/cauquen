import { Inject, NgModule } from '@angular/core';
import { TranslateService } from '@bizy/services';
import { SharedModule } from '@shared/shared.module';
import { es } from './i18n';
import { LineChartComponent } from './line-chart.component';

@NgModule({
  imports: [SharedModule],
  declarations: [LineChartComponent],
  exports: [LineChartComponent]
})
export class LineChartModule {
  constructor(@Inject(TranslateService) private translate: TranslateService) {
    this.translate.loadTranslations(es);
  }
}
