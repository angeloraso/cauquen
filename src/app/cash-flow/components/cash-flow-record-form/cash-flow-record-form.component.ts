import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ICashFlowRecord } from '@core/model';

@Component({
  selector: 'cauquen-cash-flow-record-form',
  templateUrl: './cash-flow-record-form.html',
  styleUrls: ['./cash-flow-record-form.css']
})
export class CashFlowRecordFormComponent {
  @Output() cancel = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<ICashFlowRecord>();

  @Input() set id(id: string) {
    if (!id) {
      return;
    }

    this._id.setValue(id);
  }

  @Input() set created(created: string) {
    if (!created) {
      return;
    }

    this._created.setValue(created);
  }

  @Input() set updated(updated: string) {
    if (!updated) {
      return;
    }

    this._updated.setValue(updated);
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
      income: [false, [Validators.required]],
      amount: [null, [Validators.min(this.MIN_VALUE), Validators.required]],
      balance: [null, [Validators.min(this.MIN_VALUE), Validators.required]],
      created: [null],
      updated: [null]
    });
  }

  get _id() {
    return this.form.get('id') as FormControl;
  }

  get _created() {
    return this.form.get('created') as FormControl;
  }

  get _updated() {
    return this.form.get('updated') as FormControl;
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

    const date = new Date(this._date.value);

    this.confirm.emit({
      id: this._id.value,
      date: date.getTime(),
      amount: this._income.value ? this._amount.value : this._amount.value * -1,
      balance: this._balance.value,
      created: this._created.value,
      updated: this._updated.value
    });
  }

  _cancel() {
    this.cancel.emit();
  }
}
