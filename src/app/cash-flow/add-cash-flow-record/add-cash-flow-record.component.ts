import { Component, Inject } from '@angular/core';
import { BizyRouterService } from '@bizy/services';
import { ICashFlowRecord } from '@core/model';
import { CashFlowService } from '@core/services';

@Component({
  selector: 'cauquen-add-cash-flow-record',
  templateUrl: './add-cash-flow-record.html',
  styleUrls: ['./add-cash-flow-record.css']
})
export class AddCashFlowRecordComponent {
  loading = false;

  constructor(
    @Inject(CashFlowService) private cashFlow: CashFlowService,
    @Inject(BizyRouterService) private router: BizyRouterService
  ) {}

  goBack() {
    this.router.goBack();
  }

  async confirm(record: ICashFlowRecord) {
    try {
      if (this.loading) {
        return;
      }

      this.loading = true;
      await this.cashFlow.postRecord(record);
      this.goBack();
    } catch (error) {
      console.log(error);
    } finally {
      this.loading = false;
    }
  }
}
