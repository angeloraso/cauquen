import { Inject, NgModule } from '@angular/core';
import { BizyTranslateService } from '@bizy/services';
import { SharedModule } from '@shared/shared.module';
import { ConfirmPopupComponent } from './confirm-popup.component';
import { es } from './i18n';

@NgModule({
  imports: [SharedModule],
  declarations: [ConfirmPopupComponent],
  exports: [ConfirmPopupComponent]
})
export class ConfirmPopupModule {
  constructor(@Inject(BizyTranslateService) private translate: BizyTranslateService) {
    this.translate.loadTranslations(es);
  }
}
