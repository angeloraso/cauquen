import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { PopupService, RouterService } from '@bizy/services';
import { ConfirmPopupComponent } from '@components/confirm-popup';
import { COUNTRY_CODE, ICountryRecord } from '@core/model';
import { CountryService } from '@core/services';
import { Subscription } from 'rxjs';
import { PATH } from './info.routing';

@Component({
  selector: 'cauquen-info',
  templateUrl: './info.html',
  styleUrls: ['./info.css']
})
export class InfoComponent implements OnInit, OnDestroy {
  info: Array<ICountryRecord> = [];
  loading = false;
  orderBy: string = 'from';
  order: 'asc' | 'desc' | null = 'desc';

  private _subscription = new Subscription();

  constructor(
    @Inject(CountryService) private country: CountryService,
    @Inject(RouterService) private router: RouterService,
    @Inject(PopupService) private popup: PopupService
  ) {}

  async ngOnInit() {
    try {
      this.loading = true;
      const countryData = await this.country.getRecords(COUNTRY_CODE.ARGENTINA);
      this.info = countryData ?? [];
    } catch (error) {
      console.debug(error);
    } finally {
      this.loading = false;
    }
  }

  goToRecord(record: ICountryRecord): void {
    this.router.goTo({ path: record.id });
  }

  openConfirmPopup(record: ICountryRecord) {
    this.popup.open<boolean>(
      {
        component: ConfirmPopupComponent,
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
    this.router.goTo({ path: PATH.ADD });
  }

  onSort(property: string) {
    this.orderBy = property;
    this.order = this.order === 'asc' ? 'desc' : this.order === 'desc' ? null : 'asc';
  }

  async #deleteRecord(record: ICountryRecord) {
    try {
      this.loading = true;
      await this.country.deleteRecord(record);
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

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }
}
