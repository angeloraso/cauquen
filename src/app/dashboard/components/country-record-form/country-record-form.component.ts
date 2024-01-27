import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { COUNTRIES } from '@core/constants';
import { COUNTRY_CODE, ICountryRecord } from '@core/model';

@Component({
  selector: 'country-record-form',
  templateUrl: './country-record-form.html',
  styleUrls: ['./country-record-form.css']
})
export class CountryRecordFormComponent {
  @Output() cancel = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<ICountryRecord>();
  form: FormGroup;

  readonly MIN_VALUE = 0;
  readonly COUNTRIES = COUNTRIES;

  constructor(@Inject(FormBuilder) private fb: FormBuilder) {
    this.form = this.fb.group({
      id: [null],
      country: [COUNTRY_CODE.ARGENTINA, [Validators.required]],
      from: [new Date(), [Validators.required]],
      to: [new Date(), [Validators.required]],
      ipc: [0, [Validators.min(this.MIN_VALUE), Validators.required]],
      fixedRate: [0, [Validators.min(this.MIN_VALUE), Validators.required]]
    });

    /* if (this.data) {
      this.id.setValue(this.data.id);
      this.country.setValue(this.data.country);
      this.from.setValue(new Date(this.data.from));
      this.to.setValue(new Date(this.data.to));
      this.ipc.setValue(this.data.ipc);
      this.fixedRate.setValue(this.data.fixedRate);
    } */
  }

  get id() {
    return this.form.get('id') as AbstractControl;
  }

  get country() {
    return this.form.get('country') as AbstractControl;
  }

  get from() {
    return this.form.get('from') as AbstractControl;
  }

  get to() {
    return this.form.get('to') as AbstractControl;
  }

  get ipc() {
    return this.form.get('ipc') as AbstractControl;
  }

  get fixedRate() {
    return this.form.get('fixedRate') as AbstractControl;
  }

  _confirm() {
    if (this.form.invalid) {
      return;
    }

    this.confirm.emit({
      id: this.id.value,
      country: this.country.value,
      from: this.from.value.getTime(),
      to: this.to.value.getTime(),
      ipc: this.ipc.value,
      fixedRate: this.fixedRate.value
    });
  }

  _cancel() {
    this.cancel.emit();
  }
}
