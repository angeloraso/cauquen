import { Inject, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateService } from '@bizy/services';
import { ShowHidePasswordModule } from '@components/show-hide-password';
import { SharedModule } from '@shared/shared.module';
import { AuthRoutingModule } from './auth.routing';
import { es } from './i18n';

@NgModule({
  imports: [SharedModule, AuthRoutingModule, ReactiveFormsModule, ShowHidePasswordModule],
  declarations: [AuthRoutingModule.COMPONENTS]
})
export class AuthModule {
  constructor(@Inject(TranslateService) private translate: TranslateService) {
    this.translate.loadTranslations(es);
  }
}
