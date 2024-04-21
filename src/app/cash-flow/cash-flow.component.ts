import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { BizyPopupService, BizyRouterService } from '@bizy/services';
import { ConfirmPopupComponent } from '@components/confirm-popup';
import { ICashFlowRecord } from '@core/model';
import { CashFlowService } from '@core/services';
import { Subscription } from 'rxjs';
import { PATH } from './cash-flow.routing';

@Component({
  selector: 'cauquen-cash-flow',
  templateUrl: './cash-flow.html',
  styleUrls: ['./cash-flow.css']
})
export class CashFlowComponent implements OnInit, OnDestroy {
  records: Array<ICashFlowRecord> = [];
  loading = false;
  orderBy: string = 'date';
  order: 'asc' | 'desc' | null = 'desc';

  private _subscription = new Subscription();

  constructor(
    @Inject(BizyPopupService) private popup: BizyPopupService,
    @Inject(BizyRouterService) private router: BizyRouterService,
    @Inject(CashFlowService) private cashFlow: CashFlowService
  ) {}

  async ngOnInit() {
    try {
      this.loading = true;
      const data = await this.cashFlow.getRecords();
      this.records = data ?? [];
    } catch (error) {
      console.log(error);
    } finally {
      this.loading = false;
    }
  }

  addRecord() {
    this.router.goTo({ path: PATH.ADD });
  }

  editRecord(record: ICashFlowRecord) {
    this.router.goTo({ path: String(record.id) });
  }

  onSort(property: string) {
    this.orderBy = property;
    this.order = this.order === 'asc' ? 'desc' : this.order === 'desc' ? null : 'asc';
  }

  openConfirmPopup(record: ICashFlowRecord) {
    this.popup.open<boolean>(
      {
        component: ConfirmPopupComponent,
        data: record
      },
      res => {
        if (res) {
          this.#deleteRecord(record);
        }
      }
    );
  }

  async #deleteRecord(record: ICashFlowRecord) {
    try {
      await this.cashFlow.deleteRecord(record);
      const index = this.records.findIndex(_record => _record.id === record.id);
      if (index !== -1) {
        this.records.splice(index, 1);
        this.records = [...this.records];
      }
    } catch (error) {
      console.log(error);
    }
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }
}
