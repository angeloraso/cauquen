import { Component, inject } from '@angular/core';
import { BizyLogService, BizyRouterService, BizyToastService } from '@bizy/services';
import { CashFlowService } from '@core/services';

@Component({
  selector: 'cauquen-add-cash-flow-record',
  templateUrl: './add-cash-flow-record.html',
  styleUrls: ['./add-cash-flow-record.css']
})
export class AddCashFlowRecordComponent {
  readonly #cashFlow = inject(CashFlowService);
  readonly #router = inject(BizyRouterService);
  readonly #log = inject(BizyLogService);
  readonly #toast = inject(BizyToastService);
  loading = false;

  goBack() {
    this.#router.goBack();
  }

  async confirm(data: { date: number; amount: number; balance: number }) {
    try {
      if (this.loading || !data) {
        return;
      }

      this.loading = true;
      await this.#cashFlow.postRecord(data);
      this.goBack();
    } catch (error) {
      this.#log.error({
        fileName: 'add-cash-flow-record.component',
        functionName: 'confirm',
        param: error
      });
      this.#toast.danger();
    } finally {
      this.loading = false;
    }
  }
}
