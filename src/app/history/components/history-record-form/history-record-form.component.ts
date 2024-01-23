import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IHistoryRecord } from '@core/model';

@Component({
  selector: 'cauquen-history-record-form',
  templateUrl: './history-record-form.html',
  styleUrls: ['./history-record-form.css']
})
export class HistoryRecordFormComponent {
  @Output() cancel = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<IHistoryRecord>();
  @Input() set id(id: string) {
    if (!id) {
      return;
    }

    this._id.setValue(id);
  }

  @Input() set date(date: number) {
    if (!date) {
      return;
    }

    const _date = new Date(date);
    this._date.setValue(_date.toISOString());
  }

  @Input() set amount(amount: number) {
    if (!amount) {
      return;
    }

    this._amount.setValue(Math.abs(amount));
    this._income.setValue(amount >= 0);
  }

  @Input() set balance(balance: number) {
    if (!balance) {
      return;
    }

    this._balance.setValue(balance);
  }
  form: FormGroup;

  readonly MIN_VALUE = 0;

  constructor(@Inject(FormBuilder) private fb: FormBuilder) {
    const today = new Date();
    this.form = this.fb.group({
      id: [null],
      date: [today.toISOString(), [Validators.required]],
      income: [true, [Validators.required]],
      amount: [null, [Validators.min(this.MIN_VALUE), Validators.required]],
      balance: [null, [Validators.min(this.MIN_VALUE), Validators.required]]
    });
  }

  get _id() {
    return this.form.get('id') as FormControl;
  }

  get _date() {
    return this.form.get('date') as FormControl;
  }

  get _income() {
    return this.form.get('income') as FormControl;
  }

  get _amount() {
    return this.form.get('amount') as FormControl;
  }

  get _balance() {
    return this.form.get('balance') as FormControl;
  }

  _confirm() {
    if (this.form.invalid) {
      return;
    }

    this;

    this.confirm.emit({
      id: this._id.value,
      date: this._date.value.getTime(),
      amount: this._income.value ? this._amount.value : this._amount.value * -1,
      balance: this._balance.value
    });
  }

  _cancel() {
    this.cancel.emit();
  }
}
