import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterService } from '@bizy/services';
import { IHistoryRecord } from '@core/model';
import { HistoryService } from '@core/services';

@Component({
  selector: 'cauquen-edit-history-record',
  templateUrl: './edit-history-record.html',
  styleUrls: ['./edit-history-record.css']
})
export class EditHistoryRecordComponent implements OnInit {
  loading = false;
  record: IHistoryRecord | null = null;

  constructor(
    @Inject(HistoryService) private history: HistoryService,
    @Inject(ActivatedRoute) private activatedRoute: ActivatedRoute,
    @Inject(RouterService) private router: RouterService
  ) {}

  async ngOnInit() {
    try {
      this.loading = true;
      const recordId = this.router.getId(this.activatedRoute, 'historyRecordId');

      if (!recordId) {
        this.goBack();
        return;
      }

      const record = await this.history.getRecord(recordId);

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

  async confirm(record: IHistoryRecord) {
    try {
      if (this.loading) {
        return;
      }

      this.loading = true;
      await this.history.putRecord(record);
      this.goBack();
    } catch (error) {
      console.log(error);
    } finally {
      this.loading = false;
    }
  }
}
