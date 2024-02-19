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

  @Input() set officialDollarRate(officialDollarRate: number) {
    if (!officialDollarRate) {
      return;
    }

    this._officialDollarRate.setValue(officialDollarRate);
  }

  @Input() set cclDollarRate(cclDollarRate: number) {
    if (!cclDollarRate) {
      return;
    }

    this._cclDollarRate.setValue(cclDollarRate);
  }

  constructor(@Inject(FormBuilder) private fb: FormBuilder) {
    const today = new Date();
    this.form = this.fb.group({
      id: [null],
      country: [COUNTRY_CODE.ARGENTINA, [Validators.required]],
      from: [today.toISOString(), [Validators.required]],
      to: [today.toISOString(), [Validators.required]],
      ipc: [null, [Validators.min(this.MIN_VALUE), Validators.required]],
      fixedRate: [null, [Validators.min(this.MIN_VALUE), Validators.required]],
      officialDollarRate: [null, [Validators.min(this.MIN_VALUE), Validators.required]],
      cclDollarRate: [null, [Validators.min(this.MIN_VALUE), Validators.required]],
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

  get _officialDollarRate() {
    return this.form.get('officialDollarRate') as FormControl;
  }

  get _cclDollarRate() {
    return this.form.get('cclDollarRate') as FormControl;
  }

  _confirm() {
    if (this.form.invalid) {
      return;
    }

    const from = new Date(this._from.value);
    from.setHours(0, 1, 0);
    const to = new Date(this._to.value);
    to.setHours(23, 59, 0);

    this.confirm.emit({
      id: this._id.value,
      country: this._country.value,
      from: from.getTime(),
      to: to.getTime(),
      ipc: this._ipc.value,
      fixedRate: this._fixedRate.value,
      officialDollarRate: this._officialDollarRate.value,
      cclDollarRate: this._cclDollarRate.value,
      created: this._created.value,
      updated: this._updated.value
    });
  }

  _cancel() {
    this.cancel.emit();
  }
}
