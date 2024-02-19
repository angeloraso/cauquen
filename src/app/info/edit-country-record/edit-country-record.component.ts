import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterService } from '@bizy/services';
import { ICountryRecord } from '@core/model';
import { CountryService } from '@core/services';

@Component({
  selector: 'cauquen-edit-country-record',
  templateUrl: './edit-country-record.html',
  styleUrls: ['./edit-country-record.css']
})
export class EditCountryRecordComponent implements OnInit {
  loading = false;
  record: ICountryRecord | null = null;

  constructor(
    @Inject(CountryService) private country: CountryService,
    @Inject(ActivatedRoute) private activatedRoute: ActivatedRoute,
    @Inject(RouterService) private router: RouterService
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

  async confirm(record: ICountryRecord) {
    try {
      if (this.loading) {
        return;
      }

      this.loading = true;
      await this.country.putRecord(record);
      this.goBack();
    } catch (error) {
      console.log(error);
    } finally {
      this.loading = false;
    }
  }
}
