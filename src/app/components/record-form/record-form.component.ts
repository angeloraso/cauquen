import { Component, Inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'record-form',
  templateUrl: './record-form.html',
  styleUrls: ['./record-form.css']
})
export class RecordFormComponent {
  form: FormGroup;

  readonly MIN_VALUE = 0;

  constructor(
    @Inject(FormBuilder) private fb: FormBuilder,
    @Inject(MatDialogRef) private dialog: MatDialogRef<RecordFormComponent>
  ) {
    this.form = this.fb.group({
      date: [new Date(), [Validators.required]],
      income: [true, [Validators.required]],
      amount: [null, [Validators.min(this.MIN_VALUE), Validators.required]],
      balance: [null, [Validators.min(this.MIN_VALUE), Validators.required]]
    });
  }

  get _date() {
    return this.form.get('date') as AbstractControl;
  }

  get _income() {
    return this.form.get('income') as AbstractControl;
  }

  get _amount() {
    return this.form.get('amount') as AbstractControl;
  }

  get _balance() {
    return this.form.get('balance') as AbstractControl;
  }

  confirm() {
    if (this.form.invalid) {
      return;
    }

    this.dialog.close({
      date: this._date.value.getTime(),
      amount: this._income.value ? this._amount.value : this._amount.value * -1,
      balance: this._balance.value
    });
  }

  cancel() {
    this.dialog.close();
  }
}
