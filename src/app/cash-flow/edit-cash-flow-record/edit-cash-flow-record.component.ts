import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterService } from '@bizy/services';
import { ICashFlowRecord } from '@core/model';
import { CashFlowService } from '@core/services';

@Component({
  selector: 'cauquen-edit-cash-flow-record',
  templateUrl: './edit-cash-flow-record.html',
  styleUrls: ['./edit-cash-flow-record.css']
})
export class EditCashFlowRecordComponent implements OnInit {
  loading = false;
  record: ICashFlowRecord | null = null;

  constructor(
    @Inject(CashFlowService) private cashFlow: CashFlowService,
    @Inject(ActivatedRoute) private activatedRoute: ActivatedRoute,
    @Inject(RouterService) private router: RouterService
  ) {}

  async ngOnInit() {
    try {
      this.loading = true;
      const recordId = this.router.getId(this.activatedRoute, 'cashFlowRecordId');

      if (!recordId) {
        this.goBack();
        return;
      }

      const record = await this.cashFlow.getRecord(recordId);

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

  async confirm(record: ICashFlowRecord) {
    try {
      if (this.loading) {
        return;
      }

      this.loading = true;
      await this.cashFlow.putRecord(record);
      this.goBack();
    } catch (error) {
      console.log(error);
    } finally {
      this.loading = false;
    }
  }
}
