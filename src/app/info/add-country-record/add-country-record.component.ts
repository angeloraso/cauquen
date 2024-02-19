import { Component, Inject } from '@angular/core';
import { RouterService } from '@bizy/services';
import { ICountryRecord } from '@core/model';
import { CountryService } from '@core/services';

@Component({
  selector: 'cauquen-add-country-record',
  templateUrl: './add-country-record.html',
  styleUrls: ['./add-country-record.css']
})
export class AddCountryRecordComponent {
  loading = false;

  constructor(
    @Inject(CountryService) private country: CountryService,
    @Inject(RouterService) private router: RouterService
  ) {}

  goBack() {
    this.router.goBack();
  }

  async confirm(record: ICountryRecord) {
    try {
      if (this.loading) {
        return;
      }

      this.loading = true;
      await this.country.postRecord(record);
      this.goBack();
    } catch (error) {
      console.log(error);
    } finally {
      this.loading = false;
    }
  }
}
