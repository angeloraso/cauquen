import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { HomeService } from '@app/home/home.service';
import { SharedModules } from '@app/shared';
import { BizyLogService, BizyRouterService, BizyToastService, BizyTranslateService } from '@bizy/core';
import { CashFlowService } from '@core/services';
import { es } from './i18n';

@Component({
  selector: 'cauquen-add-cash-flow-record',
  templateUrl: './add-cash-flow-record.html',
  styleUrls: ['./add-cash-flow-record.css'],
  imports: SharedModules
})
export class AddCashFlowRecordComponent implements OnInit {
  readonly #cashFlow = inject(CashFlowService);
  readonly #router = inject(BizyRouterService);
  readonly #log = inject(BizyLogService);
  readonly #toast = inject(BizyToastService);
  readonly #home = inject(HomeService);
  readonly #translate = inject(BizyTranslateService);
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

  ngOnInit() {
    this.#home.hideTabs();
    this.#translate.loadTranslations(es);
  }

  goBack() {
    this.#router.goBack();
  }

  async save() {
    try {
      if (this.loading || this.#form.invalid) {
        return;
      }

      this.loading = true;

      const record = {
        date: this.date.value,
        amount: this.income ? this.amount.value : this.amount.value * -1,
        balance: this.balance.value
      };

      await this.#cashFlow.postRecord(record);
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
