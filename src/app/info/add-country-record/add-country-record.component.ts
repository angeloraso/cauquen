import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { HomeService } from '@app/home/home.service';
import { SharedModules } from '@app/shared';
import { BizyLogService, BizyRouterService, BizyToastService, BizyTranslateService } from '@bizy/core';
import { ArgentinaService, CountryService, USService } from '@core/services';
import { es } from './i18n';

@Component({
  selector: 'cauquen-add-country-record',
  templateUrl: './add-country-record.html',
  styleUrls: ['./add-country-record.css'],
  imports: SharedModules
})
export class AddCountryRecordComponent implements OnInit {
  readonly #translate = inject(BizyTranslateService);
  readonly #country = inject(CountryService);
  readonly #router = inject(BizyRouterService);
  readonly #log = inject(BizyLogService);
  readonly #toast = inject(BizyToastService);
  readonly #home = inject(HomeService);
  readonly #fb = inject(FormBuilder);
  readonly #argentina = inject(ArgentinaService);
  readonly #us = inject(USService);

  readonly #form = this.#fb.group({
    date: [null, [Validators.required]]
  });

  loading = false;

  usInflationRate: number = 0;
  inflationRate: number = 0;
  fixedRate: number = 0;
  retailDollar: number = 0;
  mepDollar: number = 0;
  cclDollar: number = 0;
  cryptoDollar: number = 0;

  get date() {
    return this.#form.get('date') as FormControl;
  }

  ngOnInit() {
    this.#home.hideTabs();
    const today = new Date();
    today.setMonth(today.getMonth() - 1);
    this.date.setValue(today.getTime());
    this.onSearch();
  }

  async onSearch() {
    try {
      this.loading = true;
      this.#translate.loadTranslations(es);

      const date = new Date(this.date.value);
      const [inflationRate, retailDollar, fixedRate, mepDollar, cclDollar, cryptoDollar, usInflationRate] = await Promise.all([
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
      this.#log.error({
        fileName: 'add-country-record.component',
        functionName: 'onSearch',
        param: error
      });
      this.#toast.danger();
    } finally {
      this.loading = false;
    }
  }

  goBack() {
    this.#router.goBack();
  }

  async save() {
    try {
      if (this.#form.invalid || this.loading) {
        return;
      }

      this.loading = true;

      const from = new Date(this.date.value);
      from.setDate(1);
      from.setHours(0, 0, 0, 0);
      const to = new Date(this.date.value);
      to.setMonth(to.getMonth() + 1);
      to.setDate(0);
      to.setHours(23, 59, 59, 999);

      const record = {
        from: from.getTime(),
        to: to.getTime(),
        usInflationRate: this.usInflationRate,
        inflationRate: this.inflationRate,
        fixedRate: this.fixedRate,
        retailDollar: this.retailDollar,
        mepDollar: this.mepDollar,
        cclDollar: this.cclDollar,
        cryptoDollar: this.cryptoDollar
      };

      await this.#country.postRecord(record);
      this.goBack();
    } catch (error) {
      this.#log.error({
        fileName: 'add-country-record.component',
        functionName: 'save',
        param: error
      });
      this.#toast.danger();
    } finally {
      this.loading = false;
    }
  }
}
