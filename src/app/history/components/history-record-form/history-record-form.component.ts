import { Component, Inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
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
    @Inject(MatDialogRef) private dialog: MatDialogRef<HistoryRecordFormComponent>,
    @Inject(MAT_DIALOG_DATA) private data: IHistoryRecord
  ) {
    this.form = this.fb.group({
      id: [null],
      date: [new Date(), [Validators.required]],
      income: [true, [Validators.required]],
      amount: [null, [Validators.min(this.MIN_VALUE), Validators.required]],
      balance: [null, [Validators.min(this.MIN_VALUE), Validators.required]]
    });

    if (this.data) {
      this.id.setValue(this.data.id);
      this.date.setValue(new Date(this.data.date));
      this.income.setValue(this.data.amount >= 0);
      this.amount.setValue(Math.abs(this.data.amount));
      this.balance.setValue(this.data.balance);
    }
  }

  get id() {
    return this.form.get('id') as AbstractControl;
  }

  get date() {
    return this.form.get('date') as AbstractControl;
  }

  get income() {
    return this.form.get('income') as AbstractControl;
  }

  get amount() {
    return this.form.get('amount') as AbstractControl;
  }

  get balance() {
    return this.form.get('balance') as AbstractControl;
  }

  confirm() {
    if (this.form.invalid) {
      return;
    }

    this.dialog.close({
      id: this.id.value,
      date: this.date.value.getTime(),
      amount: this.income.value ? this.amount.value : this.amount.value * -1,
      balance: this.balance.value
    });
  }

  cancel() {
    this.dialog.close();
  }
}
