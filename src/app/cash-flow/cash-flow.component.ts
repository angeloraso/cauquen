import { DatePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { HomeService } from '@app/home/home.service';
import { SharedModules } from '@app/shared';
import { BizyLogService, BizyPopupService, BizyRouterService, BizyToastService, BizyTranslateService } from '@bizy/core';
import { PopupComponent } from '@components/popup';
import { ICashFlowRecord } from '@core/model';
import { CashFlowService } from '@core/services';
import { PATH } from './cash-flow.routing';
import { es } from './i18n';

@Component({
  selector: 'cauquen-cash-flow',
  templateUrl: './cash-flow.html',
  styleUrls: ['./cash-flow.css'],
  imports: SharedModules
})
export class CashFlowComponent implements OnInit {
  readonly #translate = inject(BizyTranslateService);
  readonly #popup = inject(BizyPopupService);
  readonly #router = inject(BizyRouterService);
  readonly #datePipe = inject(DatePipe);
  readonly #cashFlow = inject(CashFlowService);
  readonly #log = inject(BizyLogService);
  readonly #toast = inject(BizyToastService);
  readonly #home = inject(HomeService);

  records: Array<ICashFlowRecord> = [];
  loading = false;
  orderBy: string = 'date';
  order: 'asc' | 'desc' = 'desc';

  async ngOnInit() {
    try {
      this.loading = true;
      this.#home.showTabs();
      this.#translate.loadTranslations(es);
      const data = await this.#cashFlow.getRecords();
      this.records = data ?? [];
    } catch (error) {
      this.#log.error({
        fileName: 'cash-flows.component',
        functionName: 'ngOnInit',
        param: error
      });
      this.#toast.danger();
    } finally {
      this.loading = false;
    }
  }

  addRecord() {
    this.#router.goTo({ path: PATH.ADD });
  }

  editRecord(record: ICashFlowRecord) {
    this.#router.goTo({ path: String(record.id) });
  }

  onSort(property: string) {
    this.orderBy = property;
    this.order = this.order === 'asc' ? 'desc' : 'asc';
  }

  openConfirmPopup(record: ICashFlowRecord) {
    this.#popup.open<boolean>(
      {
        component: PopupComponent,
        data: {
          title: this.#translate.get('CASH_FLOW.DELETE_POPUP.TITLE'),
          msg: `${this.#translate.get('CASH_FLOW.DELETE_POPUP.TITLE')} ${this.#datePipe.transform(record.date, 'yyyy/MM/dd')}`
        }
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
      if (this.loading || !record) {
        return;
      }

      this.loading = true;
      await this.#cashFlow.deleteRecord(record);
      const index = this.records.findIndex(_record => _record.id === record.id);
      if (index !== -1) {
        this.records.splice(index, 1);
        this.records = [...this.records];
      }
    } catch (error) {
      this.#log.error({
        fileName: 'cash-flows.component',
        functionName: '#deleteRecord',
        param: error
      });
      this.#toast.danger();
    } finally {
      this.loading = false;
    }
  }
}
