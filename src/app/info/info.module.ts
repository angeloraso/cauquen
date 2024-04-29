import { Inject, NgModule } from '@angular/core';
import { BizyTranslateService } from '@bizy/services';
import { SharedModule } from '@shared/shared.module';
import { CountryRecordFormComponent } from './components';
import { es } from './i18n';
import { InfoRoutingModule } from './info.routing';

const COMPONENTS: Array<any> = [CountryRecordFormComponent];

@NgModule({
  imports: [SharedModule, InfoRoutingModule],
  declarations: InfoRoutingModule.COMPONENTS.concat(COMPONENTS),
  exports: InfoRoutingModule.COMPONENTS
})
export class InfoModule {
  constructor(@Inject(BizyTranslateService) private translate: BizyTranslateService) {
    this.translate.loadTranslations(es);
  }
}
