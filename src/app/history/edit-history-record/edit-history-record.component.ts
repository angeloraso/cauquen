import { Component, Inject } from '@angular/core';
import { RouterService } from '@bizy/services';
import { IHistoryRecord } from '@core/model';
import { HistoryService } from '@history/history.service';

@Component({
  selector: 'cauquen-edit-history-record',
  templateUrl: './edit-history-record.html',
  styleUrls: ['./edit-history-record.css']
})
export class EditHistoryRecordComponent {
  constructor(
    @Inject(HistoryService) private history: HistoryService,
    @Inject(RouterService) private router: RouterService
  ) {}

  goBack() {
    this.router.goBack();
  }

  async confirm(record: IHistoryRecord) {
    try {
      await this.history.putRecord(record);
      this.goBack();
    } catch (error) {
      console.log(error);
    }
  }
}
