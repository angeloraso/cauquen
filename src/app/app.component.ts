import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '@auth/auth.service';
import { BizyLogService, BizyPopupService, BizyRouterService, BizyToastService, BizyTranslateService, LANGUAGE } from '@bizy/core';
import { es } from '@core/i18n';
import { DatabaseService, MobileService } from '@core/services';
import { ENV } from '@env/environment';
import { PATH as HOME_PATH } from '@home/home.routing';
import { PATH as APP_PATH } from './app.routing';
import { SharedModules } from './shared';
@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
  imports: [...SharedModules, RouterOutlet]
})
export class AppComponent implements OnInit {
  readonly #mobile = inject(MobileService);
  readonly #auth = inject(AuthService);
  readonly #log = inject(BizyLogService);
  readonly #toast = inject(BizyToastService);
  readonly #database = inject(DatabaseService);
  readonly #popup = inject(BizyPopupService);
  readonly #router = inject(BizyRouterService);
  readonly #translate = inject(BizyTranslateService);

  readonly ROOT_PATHS = [
    `/${APP_PATH.HOME}/${HOME_PATH.CASH_FLOW}`,
    `/${APP_PATH.HOME}/${HOME_PATH.DASHBOARD}`,
    `/${APP_PATH.HOME}/${HOME_PATH.INFO}`,
    `/${APP_PATH.HOME}/${HOME_PATH.CONFIG}`,
    `/${APP_PATH.AUTH}`
  ];

  async ngOnInit() {
    try {
      registerLocaleData(localeEs, 'es');

      this.#translate.addLangs([LANGUAGE.SPANISH]);
      this.#translate.setDefault(LANGUAGE.SPANISH);
      this.#translate.use(LANGUAGE.SPANISH);
      this.#translate.loadTranslations(es);

      if (ENV.mobile) {
        await this.#mobile.init();
        this.#mobile.backButton$.subscribe(() => {
          if (this.#popup.openedPopups() > 0) {
            this.#popup.closeAll();
          } else if (this.ROOT_PATHS.includes(this.#router.getURL())) {
            this.#mobile.exit();
          } else {
            this.#router.goBack();
          }
        });

        await this.#mobile.hideSplash();
      }

      this.#auth.signedIn$.subscribe(async signedIn => {
        if (!signedIn) {
          this.#database.destroy();
          this.#router.goTo({ path: `/${APP_PATH.AUTH}` });
        } else {
          if (this.#router.getURL() === `/${APP_PATH.AUTH}`) {
            this.#router.goTo({ path: `/${APP_PATH.HOME}` });
          }
        }
      });
    } catch (error: unknown) {
      this.#log.error({
        fileName: 'app.component',
        functionName: 'ngOnInit',
        param: error
      });
      this.#toast.danger();
    }
  }
}
