import { Component, EventEmitter, Inject, Input, OnDestroy, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ICountryRecord } from '@core/model';
import { ArgentinaService } from '@core/services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cauquen-country-record-form',
  templateUrl: './country-record-form.html',
  styleUrls: ['./country-record-form.css']
})
export class CountryRecordFormComponent implements OnDestroy {
  @Output() cancel = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<
    Omit<ICountryRecord, 'id' | 'country' | 'created' | 'updated'>
  >();
  form: FormGroup;
  loading: boolean = false;

  ipc: number = 0;
  fixedRate: number = 0;
  retailDollar: number = 0;
  mepDollar: number = 0;
  cclDollar: number = 0;
  cryptoDollar: number = 0;

  #subscription = new Subscription();

  @Input() set date(date: number) {
    if (!date) {
      return;
    }

    const _date = new Date(date);
    this._date.setValue(_date.toISOString());
    this.onSearch();
  }

  constructor(
    @Inject(FormBuilder) private fb: FormBuilder,
    @Inject(ArgentinaService) private argentina: ArgentinaService
  ) {
    const today = new Date();
    today.setMonth(today.getMonth() - 1);
    this.form = this.fb.group({
      date: [today.toISOString(), [Validators.required]]
    });
    this.#subscription.add(
      this._date.valueChanges.subscribe(() => {
        this.onSearch();
      })
    );
  }

  async onSearch() {
    try {
      this.loading = true;
      const date = new Date(this._date.value);
      const [ipc, retailDollar, fixedRate, mepDollar, cclDollar, cryptoDollar] = await Promise.all([
        this.argentina.getIPC({ year: date.getFullYear(), month: date.getMonth() }),
        this.argentina.getAverageRetailDollar({
          year: date.getFullYear(),
          month: date.getMonth()
        }),
        this.argentina.getAverageFixedRate({ year: date.getFullYear(), month: date.getMonth() }),
        this.argentina.getAverageMEPDollar({ year: date.getFullYear(), month: date.getMonth() }),
        this.argentina.getAverageCCLDollar({ year: date.getFullYear(), month: date.getMonth() }),
        this.argentina.getAverageCryptoDollar({
          year: date.getFullYear(),
          month: date.getMonth()
        })
      ]);
      this.ipc = ipc;
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

  get _date() {
    return this.form.get('date') as FormControl;
  }

  _confirm() {
    if (this.form.invalid) {
      return;
    }

    const from = new Date(this._date.value);
    from.setDate(1);
    from.setHours(0, 0, 0);
    const to = new Date(this._date.value);
    to.setMonth(to.getMonth() + 1);
    to.setDate(0);
    to.setHours(23, 59, 59);

    this.confirm.emit({
      from: from.getTime(),
      to: to.getTime(),
      ipc: this.ipc,
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

  ngOnDestroy() {
    this.#subscription.unsubscribe();
  }
}
