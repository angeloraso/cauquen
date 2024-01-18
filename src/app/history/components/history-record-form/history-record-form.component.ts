import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PopupService } from '@bizy/services';
import { IHistoryRecord } from '@core/model';

@Component({
  selector: 'history-record-form',
  templateUrl: './history-record-form.html',
  styleUrls: ['./history-record-form.css']
})
export class HistoryRecordFormComponent {
  form: FormGroup;

  readonly MIN_VALUE = 0;

  constructor(
    @Inject(FormBuilder) private fb: FormBuilder,
    @Inject(PopupService) private popup: PopupService<HistoryRecordFormComponent, IHistoryRecord>
  ) {
    const today = new Date();
    this.form = this.fb.group({
      id: [null],
      date: [today.toISOString(), [Validators.required]],
      income: [true, [Validators.required]],
      amount: [null, [Validators.min(this.MIN_VALUE), Validators.required]],
      balance: [null, [Validators.min(this.MIN_VALUE), Validators.required]]
    });

    const data = this.popup.getData<IHistoryRecord>();
    if (data) {
      const date = new Date(data.date);
      this.id.setValue(data.id);
      this.date.setValue(date.toISOString());
      this.income.setValue(data.amount >= 0);
      this.amount.setValue(Math.abs(data.amount));
      this.balance.setValue(data.balance);
    }
  }

  get id() {
    return this.form.get('id') as FormControl;
  }

  get date() {
    return this.form.get('date') as FormControl;
  }

  get income() {
    return this.form.get('income') as FormControl;
  }

  get amount() {
    return this.form.get('amount') as FormControl;
  }

  get balance() {
    return this.form.get('balance') as FormControl;
  }

  confirm() {
    if (this.form.invalid) {
      return;
    }

    this.popup.close({
      data: {
        id: this.id.value,
        date: this.date.value.getTime(),
        amount: this.income.value ? this.amount.value : this.amount.value * -1,
        balance: this.balance.value
      }
    });
  }

  cancel() {
    this.popup.close();
  }
}
