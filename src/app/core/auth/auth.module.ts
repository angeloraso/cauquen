import { Inject, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ShowHidePasswordModule } from '@components/show-hide-password';
import { CauquenTranslateService } from '@core/services';
import { SharedModule } from '@shared/shared.module';
import { AuthRoutingModule } from './auth.routing';
import { es } from './i18n';

@NgModule({
  imports: [SharedModule, AuthRoutingModule, ReactiveFormsModule, ShowHidePasswordModule],
  declarations: [AuthRoutingModule.COMPONENTS]
})
export class AuthModule {
  constructor(@Inject(CauquenTranslateService) private translate: CauquenTranslateService) {
    this.translate.loadTranslations(es);
  }
}
