import { Component, Inject, OnInit } from '@angular/core';
import { RouterService } from '@bizy/services';
import { COUNTRY_CODE, ICountryRecord } from '@core/model';
import { CountryService, UserSettingsService } from '@core/services';

@Component({
  selector: 'cauquen-add-country-record',
  templateUrl: './add-country-record.html',
  styleUrls: ['./add-country-record.css']
})
export class AddCountryRecordComponent implements OnInit {
  loading = false;
  userCountry: COUNTRY_CODE = COUNTRY_CODE.ARGENTINA;

  constructor(
    @Inject(CountryService) private country: CountryService,
    @Inject(UserSettingsService) private userSettings: UserSettingsService,
    @Inject(RouterService) private router: RouterService
  ) {}

  async ngOnInit() {
    try {
      this.loading = true;
      const country = await this.userSettings.getCountry();
      if (country) {
        this.userCountry = country;
      }
    } catch (error) {
      console.log(error);
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
      await this.country.postRecord(record);
      this.goBack();
    } catch (error) {
      console.log(error);
    } finally {
      this.loading = false;
    }
  }
}
