import { Component, Inject } from '@angular/core';
import { RouterService } from '@bizy/services';
import { IHistoryRecord } from '@core/model';
import { HistoryService } from '@history/history.service';

@Component({
  selector: 'cauquen-add-history-record',
  templateUrl: './add-history-record.html',
  styleUrls: ['./add-history-record.css']
})
export class AddHistoryRecordComponent {
  constructor(
    @Inject(HistoryService) private history: HistoryService,
    @Inject(RouterService) private router: RouterService
  ) {}

  goBack() {
    this.router.goBack();
  }

  async confirm(record: IHistoryRecord) {
    try {
      await this.history.postRecord(record);
      this.goBack();
    } catch (error) {
      console.log(error);
    }
  }
}
