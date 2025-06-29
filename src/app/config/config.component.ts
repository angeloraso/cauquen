import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { HomeService } from '@app/home/home.service';
import { SharedModules } from '@app/shared';
import { AuthService } from '@auth/auth.service';
import { BizyLogService, BizyPopupService, BizyToastService, BizyTranslateService } from '@bizy/core';
import { PopupComponent } from '@components/popup';
import { COUNTRIES, LOGO_PATH } from '@core/constants';
import { COUNTRY_CODE } from '@core/model';
import { UserSettingsService } from '@core/services';
import { AboutPopupComponent } from './about-popup/about-popup.component';
import { es } from './i18n';

@Component({
  selector: 'cauquen-config',
  templateUrl: './config.html',
  styleUrls: ['./config.css'],
  imports: SharedModules
})
export class ConfigComponent implements OnInit {
  readonly #translate = inject(BizyTranslateService);
  readonly #popup = inject(BizyPopupService);
  readonly #log = inject(BizyLogService);
  readonly #toast = inject(BizyToastService);
  readonly #home = inject(HomeService);
  readonly #userSettings = inject(UserSettingsService);
  readonly #fb = inject(FormBuilder);
  readonly #auth = inject(AuthService);

  loading = false;
  form = this.#fb.group({
    userCountry: ['', [Validators.required]]
  });

  profilePic = LOGO_PATH;

  readonly COUNTRIES = COUNTRIES;

  async ngOnInit() {
    try {
      this.loading = true;

      this.#home.showTabs();
      this.#translate.loadTranslations(es);
      const profilePic = await this.#auth.getProfilePicture();
      if (profilePic) {
        this.profilePic = profilePic;
      }
      const userCountry = await this.#userSettings.getCountry();
      this.userCountry.setValue(userCountry);
    } catch (error) {
      this.#log.error({
        fileName: 'config.component',
        functionName: 'ngOnInit',
        param: error
      });
      this.#toast.danger();
    } finally {
      this.loading = false;
    }
  }

  get userCountry() {
    return this.form.get('userCountry') as FormControl<string>;
  }

  async setCountry(country: string | number) {
    try {
      if (!country) {
        return;
      }

      this.loading = true;

      await this.#userSettings.putCountry(country as COUNTRY_CODE);
    } catch (error) {
      console.log(error);
    } finally {
      this.loading = false;
    }
  }

  openPopup(): void {
    this.#popup.open({ component: AboutPopupComponent });
  }

  onSignOut(): void {
    if (this.loading) {
      return;
    }

    this.#popup.open<boolean>(
      {
        component: PopupComponent,
        data: {
          title: this.#translate.get('CONFIG.SIGN_OUT_POPUP.TITLE'),
          msg: `${this.#translate.get('CONFIG.SIGN_OUT_POPUP.MSG')}: ${this.#auth.getEmail()}`
        }
      },
      res => {
        if (res) {
          this.loading = true;
          this.#auth.signOut().finally(() => (this.loading = false));
        }
      }
    );
  }
}
