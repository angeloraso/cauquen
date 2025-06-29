import { Component, inject, OnInit } from '@angular/core';
import { HomeService } from '@app/home/home.service';
import { SharedModules } from '@app/shared';
import { BizyLogService, BizyPopupService, BizyRouterService, BizyToastService, BizyTranslateService } from '@bizy/core';
import { PopupComponent } from '@components/popup';
import { ICountryRecord } from '@core/model';
import { CountryService, UserSettingsService } from '@core/services';
import { es } from './i18n';
import { PATH } from './info.routing';

@Component({
  selector: 'cauquen-info',
  templateUrl: './info.html',
  styleUrls: ['./info.css'],
  imports: SharedModules
})
export class InfoComponent implements OnInit {
  readonly #translate = inject(BizyTranslateService);
  readonly #popup = inject(BizyPopupService);
  readonly #router = inject(BizyRouterService);
  readonly #country = inject(CountryService);
  readonly #log = inject(BizyLogService);
  readonly #toast = inject(BizyToastService);
  readonly #home = inject(HomeService);
  readonly #userSettings = inject(UserSettingsService);

  info: Array<ICountryRecord> = [];
  loading = false;
  orderBy: string = 'from';
  order: 'asc' | 'desc' = 'desc';
  isAdmin = false;

  async ngOnInit() {
    try {
      this.loading = true;
      this.#home.showTabs();
      this.#translate.loadTranslations(es);
      const [isAdmin, userCountry] = await Promise.all([this.#userSettings.isAdmin(), this.#userSettings.getCountry()]);

      this.isAdmin = isAdmin;
      const countryData = await this.#country.getRecords(userCountry);
      this.info = countryData ?? [];
    } catch (error) {
      this.#log.error({
        fileName: 'info.component',
        functionName: 'ngOnInit',
        param: error
      });
      this.#toast.danger();
    } finally {
      this.loading = false;
    }
  }

  openConfirmPopup(record: ICountryRecord) {
    if (!this.isAdmin) {
      return;
    }

    this.#popup.open<boolean>(
      {
        component: PopupComponent,
        data: record
      },
      res => {
        if (res) {
          this.#deleteRecord(record);
        }
      }
    );
  }

  addRecord() {
    if (!this.isAdmin) {
      return;
    }
    this.#router.goTo({ path: PATH.ADD });
  }

  onSort(property: string) {
    this.orderBy = property;
    this.order = this.order === 'asc' ? 'desc' : 'asc';
  }

  async #deleteRecord(record: ICountryRecord) {
    try {
      this.loading = true;
      await this.#country.deleteRecord(record);
      const index = this.info.findIndex(_record => _record.id === record.id);
      if (index !== -1) {
        this.info.splice(index, 1);
        this.info = [...this.info];
      }
    } catch (error) {
      console.log(error);
    } finally {
      this.loading = false;
    }
  }
}
