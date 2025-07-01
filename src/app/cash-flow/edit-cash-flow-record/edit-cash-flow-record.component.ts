import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HomeService } from '@app/home/home.service';
import { SharedModules } from '@app/shared';
import { BizyLogService, BizyRouterService, BizyToastService, BizyTranslateService } from '@bizy/core';
import { ICashFlowRecord } from '@core/model';
import { CashFlowService } from '@core/services';
import { es } from './i18n';

@Component({
  selector: 'cauquen-edit-cash-flow-record',
  templateUrl: './edit-cash-flow-record.html',
  styleUrls: ['./edit-cash-flow-record.css'],
  imports: SharedModules
})
export class EditCashFlowRecordComponent implements OnInit {
  readonly #translate = inject(BizyTranslateService);
  readonly #cashFlow = inject(CashFlowService);
  readonly #activatedRoute = inject(ActivatedRoute);
  readonly #router = inject(BizyRouterService);
  readonly #log = inject(BizyLogService);
  readonly #toast = inject(BizyToastService);
  readonly #home = inject(HomeService);
  readonly #fb = inject(FormBuilder);

  loading: boolean = false;
  income: boolean = false;

  readonly MIN_VALUE = 0;

  readonly #form = this.#fb.group({
    date: [Date.now(), [Validators.required]],
    amount: [null, [Validators.min(this.MIN_VALUE), Validators.required]],
    balance: [null, [Validators.min(this.MIN_VALUE), Validators.required]]
  });

  get date() {
    return this.#form.get('date') as FormControl;
  }

  get amount() {
    return this.#form.get('amount') as FormControl;
  }

  get balance() {
    return this.#form.get('balance') as FormControl;
  }

  record: ICashFlowRecord | null = null;

  async ngOnInit() {
    try {
      this.loading = true;
      this.#home.hideTabs();
      this.#translate.loadTranslations(es);

      const recordId = this.#router.getId(this.#activatedRoute, 'cashFlowRecordId');

      if (!recordId) {
        this.goBack();
        return;
      }

      const record = await this.#cashFlow.getRecord(recordId);

      if (!record) {
        this.goBack();
        return;
      }

      this.record = record;

      this.date.setValue(record.date);
      this.amount.setValue(Math.abs(record.amount));
      this.income = record.amount >= 0;
      this.balance.setValue(record.balance);
    } catch (error) {
      this.#log.error({
        fileName: 'edit-cash-flow-record.component',
        functionName: 'ngOnInit',
        param: error
      });
      this.#toast.danger();

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

  async save() {
    try {
      if (this.loading || this.#form.invalid || !this.record) {
        return;
      }

      this.loading = true;

      const record = {
        ...this.record,
        date: this.date.value,
        amount: this.income ? this.amount.value : this.amount.value * -1,
        balance: this.balance.value
      };

      await this.#cashFlow.putRecord(record);
      this.goBack();
    } catch (error) {
      this.#log.error({
        fileName: 'add-cash-flow-record.component',
        functionName: 'save',
        param: error
      });
      this.#toast.danger();
    } finally {
      this.loading = false;
    }
  }
}
