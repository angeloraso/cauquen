import { Inject, NgModule } from '@angular/core';
import { TranslateService } from '@bizy/services';
import { SharedModule } from '@shared/shared.module';
import { AboutPopupComponent } from './about-popup/about-popup.component';
import { ConfigRoutingModule } from './config.routing';
import { es } from './i18n';

@NgModule({
  imports: [SharedModule, ConfigRoutingModule],
  declarations: ConfigRoutingModule.COMPONENTS.concat(AboutPopupComponent),
  exports: ConfigRoutingModule.COMPONENTS
})
export class ConfigModule {
  constructor(@Inject(TranslateService) private translate: TranslateService) {
    this.translate.loadTranslations(es);
  }
}
