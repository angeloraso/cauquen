import { HttpClientModule } from '@angular/common/http';
import { Inject, NgModule, Optional, SkipSelf } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LogService, RouterService, UserAgentService } from '@bizy/services';
import { LANGUAGE } from '@core/constants';
import { IonicModule } from '@ionic/angular';
import { es } from './i18n';
import {
  ArgentinaService,
  CauquenTranslateService,
  DatabaseService,
  MobileService,
  ServiceWorkerService,
  UtilsService,
  ViewportService
} from './services';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    IonicModule.forRoot({ mode: 'ios' })
  ],
  providers: [
    RouterService,
    CauquenTranslateService,
    ViewportService,
    DatabaseService,
    ArgentinaService,
    UtilsService,
    ServiceWorkerService,
    MobileService,
    UserAgentService,
    LogService
  ]
})
export class CoreModule {
  /* Make sure CoreModule is imported only by one NgModule the AppModule */
  constructor(
    @Optional() @SkipSelf() parentModule: CoreModule,
    @Inject(CauquenTranslateService) private translate: CauquenTranslateService
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
