import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BizyLogService, BizyRouterService, BizyToastService } from '@bizy/services';
import { ICashFlowRecord } from '@core/model';
import { CashFlowService } from '@core/services';

@Component({
  selector: 'cauquen-edit-cash-flow-record',
  templateUrl: './edit-cash-flow-record.html',
  styleUrls: ['./edit-cash-flow-record.css']
})
export class EditCashFlowRecordComponent implements OnInit {
  readonly #cashFlow = inject(CashFlowService);
  readonly #activatedRoute = inject(ActivatedRoute);
  readonly #router = inject(BizyRouterService);
  readonly #log = inject(BizyLogService);
  readonly #toast = inject(BizyToastService);

  loading = false;
  record: ICashFlowRecord | null = null;

  async ngOnInit() {
    try {
      this.loading = true;
      const recordId = this.#router.getId(this.#activatedRoute, 'cashFlowRecordId');

      if (!recordId) {
        this.goBack();
        return;
      }

      const record = await this.#cashFlow.getRecord(recordId);

      this.record = record;
    } catch (error) {
      console.log(error);
      this.goBack();
    } finally {
      this.loading = false;
    }
  }

  goBack() {
    this.#router.goBack();
  }

  async confirm(data: { date: number; amount: number; balance: number }) {
    try {
      if (this.loading || !data || !this.record) {
        return;
      }

      this.loading = true;
      await this.#cashFlow.putRecord({ ...this.record, ...data });
      this.goBack();
    } catch (error) {
      this.#log.error({
        fileName: 'edit-cash-flow-record.component',
        functionName: 'confirm',
        param: error
      });
      this.#toast.danger();
    } finally {
      this.loading = false;
    }
  }
}
