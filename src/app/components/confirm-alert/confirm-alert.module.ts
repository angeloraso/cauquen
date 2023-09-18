import { Inject, NgModule } from '@angular/core';
import { ConfirmFooterModule } from '@components/confirm-footer';
import { CauquenTranslateService } from '@core/services';
import { SharedModule } from '@shared/shared.module';
import { ConfirmAlertComponent } from './confirm-alert.component';
import { es } from './i18n';

@NgModule({
  imports: [SharedModule, ConfirmFooterModule],
  declarations: [ConfirmAlertComponent],
  exports: [ConfirmAlertComponent]
})
export class ConfirmAlertModule {
  constructor(@Inject(CauquenTranslateService) private translate: CauquenTranslateService) {
    this.translate.loadTranslations(es);
  }
}
