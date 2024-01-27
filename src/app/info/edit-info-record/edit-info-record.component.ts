import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterService } from '@bizy/services';
import { ICountryRecord } from '@core/model';
import { ArgentinaService } from '@core/services';

@Component({
  selector: 'cauquen-edit-info-record',
  templateUrl: './edit-info-record.html',
  styleUrls: ['./edit-info-record.css']
})
export class EditInfoRecordComponent implements OnInit {
  loading = false;
  record: ICountryRecord | null = null;

  constructor(
    @Inject(ArgentinaService) private argentina: ArgentinaService,
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

      const record = await this.argentina.getRecord(recordId);

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
      this.loading = true;
      await this.argentina.putRecord(record);
      this.goBack();
    } catch (error) {
      console.log(error);
    } finally {
      this.loading = false;
    }
  }
}
