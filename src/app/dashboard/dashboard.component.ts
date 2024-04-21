import { DatePipe } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { IBarChartData, ILineChartData } from '@bizy/components';
import { BizyOrderByPipe } from '@bizy/pipes';
import { TranslateService } from '@bizy/services';
import { COUNTRY_CODE } from '@core/model';
import { CashFlowService, CountryService, UtilsService } from '@core/services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cauquen-dashboard',
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  private _subscription = new Subscription();
  total: number = 0.0;

  generalProfitLabels: Array<string> = [];
  generalProfitSeries: Array<ILineChartData> = [];

  monthProfitLabels: Array<string> = [];
  monthProfitSeries: Array<IBarChartData> = [];

  dollarProfitLabels: Array<string> = [];
  dollarProfitSeries: Array<ILineChartData> = [];

  inflationLabels: Array<string> = [];
  inflationSeries: Array<IBarChartData> = [];

  fixedRateLabels: Array<string> = [];
  fixedRateSeries: Array<IBarChartData> = [];

  dollarRateLabels: Array<string> = [];
  dollarRateSeries: Array<ILineChartData> = [];

  loading: boolean = false;

  constructor(
    @Inject(CashFlowService) private cashFlow: CashFlowService,
    @Inject(CountryService) private country: CountryService,
    @Inject(UtilsService) private utils: UtilsService,
    @Inject(TranslateService) private translate: TranslateService,
    @Inject(DatePipe) private datePipe: DatePipe,
    @Inject(BizyOrderByPipe) private orderByPipe: BizyOrderByPipe
  ) {}

  async ngOnInit() {
    try {
      this.loading = true;
      const generalProfitLabels: Array<string> = [];
      const generalProfitSeries: Array<ILineChartData> = [
        {
          name: this.translate.get('DASHBOARD.GENERAL_PROFIT.ACCOUNT'),
          values: []
        },
        {
          name: this.translate.get('DASHBOARD.GENERAL_PROFIT.INFLATION'),
          values: []
        },
        {
          name: this.translate.get('DASHBOARD.GENERAL_PROFIT.FIXED_RATE'),
          values: []
        }
      ];

      const monthProfitLabels: Array<string> = [];
      const monthProfitSeries: Array<IBarChartData> = [
        {
          name: this.translate.get('DASHBOARD.MONTH_PROFIT.ACCOUNT'),
          values: []
        }
      ];

      const dollarProfitLabels: Array<string> = [];
      const dollarProfitSeries: Array<ILineChartData> = [
        {
          name: this.translate.get('DASHBOARD.DOLLAR_PROFIT.ACCOUNT'),
          values: []
        }
      ];

      const dollarRateLabels: Array<string> = [];
      const dollarRateSeries: Array<ILineChartData> = [
        {
          name: this.translate.get('DASHBOARD.DOLLAR_RATE.OFFICIAL'),
          values: []
        },
        {
          name: this.translate.get('DASHBOARD.DOLLAR_RATE.CCL'),
          values: []
        }
      ];

      const inflationLabels: Array<string> = [];
      const inflationSeries: Array<IBarChartData> = [
        {
          name: this.translate.get('DASHBOARD.INFLATION.TITLE'),
          values: []
        }
      ];

      const fixedRateLabels: Array<string> = [];
      const fixedRateSeries: Array<IBarChartData> = [
        {
          name: this.translate.get('DASHBOARD.FIXED_RATE.TITLE'),
          values: []
        }
      ];

      let [cashFlowRecords, countryRecords] = await Promise.all([
        this.cashFlow.getRecords(),
        this.country.getRecords(COUNTRY_CODE.ARGENTINA)
      ]);

      cashFlowRecords = this.orderByPipe.transform(cashFlowRecords, 'asc', 'date');
      countryRecords = this.orderByPipe.transform(countryRecords, 'asc', 'from');

      let previousBalance = 0;
      countryRecords.forEach(_countryRecord => {
        const recordsByPeriod = cashFlowRecords.filter(
          _record => _record.date >= _countryRecord.from && _record.date <= _countryRecord.to
        );

        if (recordsByPeriod.length === 0) {
          return;
        }

        const periodTotal =
          previousBalance +
          recordsByPeriod.reduce((accumulator, record) => accumulator + record.amount, 0);

        const lastRecord = recordsByPeriod.reduce((prev, current) =>
          prev && prev.date > current.date ? prev : current
        );

        previousBalance = lastRecord.balance;

        const label = this.datePipe.transform(_countryRecord.from, 'dd/MM/yyyy') as string;

        generalProfitLabels.push(label);
        generalProfitSeries[0].values.push(lastRecord.balance);
        generalProfitSeries[1].values.push(periodTotal + (periodTotal * _countryRecord.ipc) / 100);
        generalProfitSeries[2].values.push(
          periodTotal + (periodTotal * (_countryRecord.fixedRate / 12)) / 100
        );

        const difference = (lastRecord.balance - periodTotal) / periodTotal;
        const profit = this.utils.roundNumber(difference * 100 - _countryRecord.ipc);

        monthProfitLabels.push(label);
        monthProfitSeries[0].values.push(profit);

        const dollarsInPeriod = this.utils.roundNumber(
          lastRecord.balance / _countryRecord.cclDollarRate
        );
        dollarProfitLabels.push(label);
        dollarProfitSeries[0].values.push(dollarsInPeriod);

        inflationLabels.push(label);
        inflationSeries[0].values.push(_countryRecord.ipc);

        fixedRateLabels.push(label);
        fixedRateSeries[0].values.push(_countryRecord.fixedRate);

        dollarRateLabels.push(label);
        dollarRateSeries[0].values.push(_countryRecord.officialDollarRate);
        dollarRateSeries[1].values.push(_countryRecord.cclDollarRate);
      });

      this.generalProfitLabels = generalProfitLabels;
      this.generalProfitSeries = generalProfitSeries;

      this.monthProfitLabels = monthProfitLabels;
      this.monthProfitSeries = monthProfitSeries;

      this.dollarProfitLabels = dollarProfitLabels;
      this.dollarProfitSeries = dollarProfitSeries;

      this.dollarRateLabels = dollarRateLabels;
      this.dollarRateSeries = dollarRateSeries;

      this.inflationLabels = inflationLabels;
      this.inflationSeries = inflationSeries;

      this.fixedRateLabels = fixedRateLabels;
      this.fixedRateSeries = fixedRateSeries;

      if (
        !generalProfitSeries[0] ||
        generalProfitSeries[0].values.length === 0 ||
        !generalProfitSeries[1] ||
        generalProfitSeries[1].values.length === 0
      ) {
        return;
      }

      const lastBalance = generalProfitSeries[0].values[generalProfitSeries[0].values.length - 1];
      const lastIPCBalance =
        generalProfitSeries[1].values[generalProfitSeries[1].values.length - 1];
      this.total = this.utils.roundNumber(((lastBalance - lastIPCBalance) / lastBalance) * 100);
    } catch (error) {
      console.debug(error);
    } finally {
      this.loading = false;
    }
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }
}
