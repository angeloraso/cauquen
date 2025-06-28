import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Input,
  Output
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MobileService } from '@core/services';

@Component({
    selector: 'cauquen-cash-flow-record-form',
    templateUrl: './cash-flow-record-form.html',
    styleUrls: ['./cash-flow-record-form.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class CashFlowRecordFormComponent {
  @Input() disabled: boolean = false;
  @Output() cancel = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<{ date: number; amount: number; balance: number }>();

  readonly isMobile = inject(MobileService).isMobile();
  readonly #fb = inject(FormBuilder);

  @Input() set date(date: number) {
    if (!date) {
      return;
    }

    this._date.setValue(date);
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

  constructor() {
    const today = new Date();
    this.form = this.#fb.group({
      date: [today.getTime(), [Validators.required]],
      income: [false, [Validators.required]],
      amount: [null, [Validators.min(this.MIN_VALUE), Validators.required]],
      balance: [null, [Validators.min(this.MIN_VALUE), Validators.required]]
    });
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

    this.confirm.emit({
      date: this._date.value,
      amount: this._income.value ? this._amount.value : this._amount.value * -1,
      balance: this._balance.value
    });
  }

  _cancel() {
    this.cancel.emit();
  }
}
