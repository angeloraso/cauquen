import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ICountryRecord } from '@core/model';
import { ArgentinaService, USService } from '@core/services';

@Component({
  selector: 'cauquen-country-record-form',
  templateUrl: './country-record-form.html',
  styleUrls: ['./country-record-form.css']
})
export class CountryRecordFormComponent {
  @Output() cancel = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<
    Omit<ICountryRecord, 'id' | 'country' | 'created' | 'updated'>
  >();
  readonly #fb = inject(FormBuilder);
  readonly #argentina = inject(ArgentinaService);
  readonly #us = inject(USService);

  form: FormGroup<{
    date: FormControl<any>;
  }>;
  loading: boolean = false;

  usInflationRate: number = 0;
  inflationRate: number = 0;
  fixedRate: number = 0;
  retailDollar: number = 0;
  mepDollar: number = 0;
  cclDollar: number = 0;
  cryptoDollar: number = 0;

  @Input() set date(date: number) {
    if (!date) {
      return;
    }

    this._date.setValue(date);
    this.onSearch();
  }

  constructor() {
    const today = new Date();
    today.setMonth(today.getMonth() - 1);
    this.form = this.#fb.group({
      date: [today.getTime(), [Validators.required]]
    });
  }

  async onSearch() {
    try {
      this.loading = true;
      const date = new Date(this._date.value);
      const [
        inflationRate,
        retailDollar,
        fixedRate,
        mepDollar,
        cclDollar,
        cryptoDollar,
        usInflationRate
      ] = await Promise.all([
        this.#argentina.getInflationRate({ year: date.getFullYear(), month: date.getMonth() }),
        this.#argentina.getAverageRetailDollar({
          year: date.getFullYear(),
          month: date.getMonth()
        }),
        this.#argentina.getAverageFixedRate({ year: date.getFullYear(), month: date.getMonth() }),
        this.#argentina.getAverageMEPDollar({ year: date.getFullYear(), month: date.getMonth() }),
        this.#argentina.getAverageCCLDollar({ year: date.getFullYear(), month: date.getMonth() }),
        this.#argentina.getAverageCryptoDollar({
          year: date.getFullYear(),
          month: date.getMonth()
        }),
        this.#us.getInflationRate({ year: date.getFullYear(), month: date.getMonth() })
      ]);
      this.usInflationRate = usInflationRate;
      this.inflationRate = inflationRate;
      this.retailDollar = retailDollar;
      this.fixedRate = fixedRate;
      this.mepDollar = mepDollar;
      this.cclDollar = cclDollar;
      this.cryptoDollar = cryptoDollar;
    } catch (error) {
      console.log(error);
    } finally {
      this.loading = false;
    }
  }

  get _date(): AbstractControl<any | number> {
    return this.form.get('date')!;
  }

  _confirm() {
    if (this.form.invalid) {
      return;
    }

    const from = new Date(this._date.value);
    from.setDate(1);
    from.setHours(0, 0, 0, 0);
    const to = new Date(this._date.value);
    to.setMonth(to.getMonth() + 1);
    to.setDate(0);
    to.setHours(23, 59, 59, 999);

    this.confirm.emit({
      from: from.getTime(),
      to: to.getTime(),
      usInflationRate: this.usInflationRate,
      inflationRate: this.inflationRate,
      fixedRate: this.fixedRate,
      retailDollar: this.retailDollar,
      mepDollar: this.mepDollar,
      cclDollar: this.cclDollar,
      cryptoDollar: this.cryptoDollar
    });
  }

  _cancel() {
    this.cancel.emit();
  }
}
