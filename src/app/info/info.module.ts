import { Inject, NgModule } from '@angular/core';
import { TranslateService } from '@bizy/services';
import { ConfirmPopupModule } from '@components/confirm-popup';
import { SharedModule } from '@shared/shared.module';
import { CountryRecordFormComponent } from './components';
import { es } from './i18n';
import { InfoRoutingModule } from './info.routing';

const COMPONENTS: Array<any> = [CountryRecordFormComponent];

@NgModule({
  imports: [SharedModule, InfoRoutingModule, ConfirmPopupModule],
  declarations: InfoRoutingModule.COMPONENTS.concat(COMPONENTS),
  exports: InfoRoutingModule.COMPONENTS
})
export class InfoModule {
  constructor(@Inject(TranslateService) private translate: TranslateService) {
    this.translate.loadTranslations(es);
  }
}
