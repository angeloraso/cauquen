import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { COUNTRIES } from '@core/constants';
import { COUNTRY_CODE, ICountryRecord } from '@core/model';

@Component({
  selector: 'cauquen-country-record-form',
  templateUrl: './country-record-form.html',
  styleUrls: ['./country-record-form.css']
})
export class CountryRecordFormComponent {
  @Output() cancel = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<ICountryRecord>();
  form: FormGroup;

  readonly MIN_VALUE = 0;
  readonly COUNTRIES = COUNTRIES;

  @Input() set id(id: string) {
    if (!id) {
      return;
    }

    this._id.setValue(id);
  }

  @Input() set country(country: COUNTRY_CODE) {
    if (!country) {
      return;
    }

    this._country.setValue(country);
  }

  @Input() set from(from: number) {
    if (!from) {
      return;
    }

    const _date = new Date(from);
    this._from.setValue(_date.toISOString());
  }

  @Input() set to(to: number) {
    if (!to) {
      return;
    }

    const _date = new Date(to);
    this._to.setValue(_date.toISOString());
  }

  @Input() set ipc(ipc: number) {
    if (!ipc) {
      return;
    }

    this._ipc.setValue(ipc);
  }

  @Input() set fixedRate(fixedRate: number) {
    if (!fixedRate) {
      return;
    }

    this._fixedRate.setValue(fixedRate);
  }

  constructor(@Inject(FormBuilder) private fb: FormBuilder) {
    this.form = this.fb.group({
      id: [null],
      country: [COUNTRY_CODE.ARGENTINA, [Validators.required]],
      from: [new Date(), [Validators.required]],
      to: [new Date(), [Validators.required]],
      ipc: [0, [Validators.min(this.MIN_VALUE), Validators.required]],
      fixedRate: [0, [Validators.min(this.MIN_VALUE), Validators.required]]
    });
  }

  get _id() {
    return this.form.get('id') as FormControl;
  }

  get _country() {
    return this.form.get('country') as FormControl;
  }

  get _from() {
    return this.form.get('from') as FormControl;
  }

  get _to() {
    return this.form.get('to') as FormControl;
  }

  get _ipc() {
    return this.form.get('ipc') as FormControl;
  }

  get _fixedRate() {
    return this.form.get('fixedRate') as FormControl;
  }

  _confirm() {
    if (this.form.invalid) {
      return;
    }

    const from = new Date(this._from.value);
    const to = new Date(this._to.value);

    this.confirm.emit({
      id: this._id.value,
      country: this._country.value,
      from: from.getTime(),
      to: to.getTime(),
      ipc: this._ipc.value,
      fixedRate: this._fixedRate.value
    });
  }

  _cancel() {
    this.cancel.emit();
  }
}
