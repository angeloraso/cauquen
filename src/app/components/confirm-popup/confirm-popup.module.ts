import { Inject, NgModule } from '@angular/core';
import { TranslateService } from '@bizy/services';
import { ConfirmFooterModule } from '@components/confirm-footer';
import { SharedModule } from '@shared/shared.module';
import { ConfirmPopupComponent } from './confirm-popup.component';
import { es } from './i18n';

@NgModule({
  imports: [SharedModule, ConfirmFooterModule],
  declarations: [ConfirmPopupComponent],
  exports: [ConfirmPopupComponent]
})
export class ConfirmPopupModule {
  constructor(@Inject(TranslateService) private translate: TranslateService) {
    this.translate.loadTranslations(es);
  }
}
