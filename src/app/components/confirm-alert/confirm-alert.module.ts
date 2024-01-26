import { Inject, NgModule } from '@angular/core';
import { TranslateService } from '@bizy/services';
import { ConfirmFooterModule } from '@components/confirm-footer';
import { SharedModule } from '@shared/shared.module';
import { ConfirmAlertComponent } from './confirm-alert.component';
import { es } from './i18n';

@NgModule({
  imports: [SharedModule, ConfirmFooterModule],
  declarations: [ConfirmAlertComponent],
  exports: [ConfirmAlertComponent]
})
export class ConfirmAlertModule {
  constructor(@Inject(TranslateService) private translate: TranslateService) {
    this.translate.loadTranslations(es);
  }
}
