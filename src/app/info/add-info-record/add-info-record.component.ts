import { Component, Inject } from '@angular/core';
import { RouterService } from '@bizy/services';
import { ICountryRecord } from '@core/model';
import { ArgentinaService } from '@core/services';

@Component({
  selector: 'cauquen-add-info-record',
  templateUrl: './add-info-record.html',
  styleUrls: ['./add-info-record.css']
})
export class AddInfoRecordComponent {
  constructor(
    @Inject(ArgentinaService) private argentina: ArgentinaService,
    @Inject(RouterService) private router: RouterService
  ) {}

  goBack() {
    this.router.goBack();
  }

  async confirm(record: ICountryRecord) {
    try {
      await this.argentina.postRecord(record);
      this.goBack();
    } catch (error) {
      console.log(error);
    }
  }
}
