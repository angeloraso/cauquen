import { DatePipe } from '@angular/common';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { Inject, NgModule, Optional, SkipSelf } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { BizyTranslateModule, BizyTranslateService, LANGUAGE } from '@bizy/services';
import { ENV } from '@env/environment';
import { es } from './i18n';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    BizyTranslateModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: ENV.production && !ENV.mobile })
  ],
  providers: [DatePipe, provideHttpClient(withInterceptorsFromDi())]
})
export class CoreModule {
  /* Make sure CoreModule is imported only by one NgModule the AppModule */
  constructor(
    @Optional() @SkipSelf() parentModule: CoreModule,
    @Inject(BizyTranslateService) private translate: BizyTranslateService
  ) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import only in AppModule');
    }

    this.translate.addLangs([LANGUAGE.SPANISH]);
    this.translate.setDefault(LANGUAGE.SPANISH);
    this.translate.use(LANGUAGE.SPANISH);
    this.translate.loadTranslations(es);
  }
}
