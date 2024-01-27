import { Inject, NgModule } from '@angular/core';
import { TranslateService } from '@bizy/services';
import { BarChartModule } from '@components/bar-chart';
import { ConfirmPopupModule } from '@components/confirm-popup';
import { SharedModule } from '@shared/shared.module';
import { es } from './i18n';
import { InfoRoutingModule } from './info.routing';

@NgModule({
  imports: [SharedModule, InfoRoutingModule, BarChartModule, ConfirmPopupModule],
  declarations: InfoRoutingModule.COMPONENTS,
  exports: InfoRoutingModule.COMPONENTS
})
export class InfoModule {
  constructor(@Inject(TranslateService) private translate: TranslateService) {
    this.translate.loadTranslations(es);
  }
}
