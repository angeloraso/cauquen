import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BizyPopupService, BizyRouterService } from '@bizy/services';
import { ICountryRecord } from '@core/model';
import { CountryService } from '@core/services';
import { PopupComponent } from '@shared/components';
import { Subscription } from 'rxjs';

@Component({
    selector: 'cauquen-edit-country-record',
    templateUrl: './edit-country-record.html',
    styleUrls: ['./edit-country-record.css'],
    standalone: false
})
export class EditCountryRecordComponent implements OnInit, OnDestroy {
  loading = false;
  record: ICountryRecord | null = null;

  #subscription = new Subscription();

  constructor(
    @Inject(CountryService) private country: CountryService,
    @Inject(ActivatedRoute) private activatedRoute: ActivatedRoute,
    @Inject(BizyRouterService) private router: BizyRouterService,
    @Inject(BizyPopupService) private popup: BizyPopupService
  ) {}

  async ngOnInit() {
    try {
      this.loading = true;
      const recordId = this.router.getId(this.activatedRoute, 'countryRecordId');

      if (!recordId) {
        this.goBack();
        return;
      }

      const record = await this.country.getRecord(recordId);

      this.record = record;
    } catch (error) {
      console.log(error);
      this.goBack();
    } finally {
      this.loading = false;
    }
  }

  goBack() {
    this.router.goBack();
  }

  openConfirmPopup() {
    this.popup.open<boolean>(
      {
        component: PopupComponent,
        data: this.record
      },
      async res => {
        if (res && this.record) {
          try {
            this.loading = true;
            await this.country.deleteRecord(this.record);
            this.goBack();
          } catch (error) {
            console.log(error);
          } finally {
            this.loading = false;
          }
        }
      }
    );
  }

  async confirm(record: Omit<ICountryRecord, 'id' | 'country' | 'created' | 'updated'>) {
    try {
      if (this.loading || !this.record) {
        return;
      }

      this.loading = true;
      await this.country.putRecord({
        ...record,
        id: this.record.id,
        created: this.record.created
      });
      this.goBack();
    } catch (error) {
      console.log(error);
    } finally {
      this.loading = false;
    }
  }

  ngOnDestroy() {
    this.#subscription.unsubscribe();
  }
}
