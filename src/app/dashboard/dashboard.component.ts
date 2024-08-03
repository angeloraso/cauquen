import { DatePipe, DecimalPipe } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { IBizyBarLineChartData } from '@bizy/components';
import { BizyOrderByPipe } from '@bizy/pipes';
import { BizyTranslateService } from '@bizy/services';
import { COUNTRY_CODE } from '@core/model';
import { CashFlowService, CountryService, MobileService, UtilsService } from '@core/services';
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
  generalProfitSeries: Array<IBizyBarLineChartData> = [];

  monthProfitLabels: Array<string> = [];
  monthProfitSeries: Array<IBizyBarLineChartData> = [];

  dollarProfitLabels: Array<string> = [];
  dollarProfitSeries: Array<IBizyBarLineChartData> = [];

  inflationLabels: Array<string> = [];
  inflationSeries: Array<IBizyBarLineChartData> = [];

  fixedRateLabels: Array<string> = [];
  fixedRateSeries: Array<IBizyBarLineChartData> = [];

  dollarRateLabels: Array<string> = [];
  dollarRateSeries: Array<IBizyBarLineChartData> = [];

  loading: boolean = false;
  isMobile: boolean = false;

  constructor(
    @Inject(CashFlowService) private cashFlow: CashFlowService,
    @Inject(MobileService) private mobile: MobileService,
    @Inject(CountryService) private country: CountryService,
    @Inject(UtilsService) private utils: UtilsService,
    @Inject(BizyTranslateService) private translate: BizyTranslateService,
    @Inject(DatePipe) private datePipe: DatePipe,
    @Inject(DecimalPipe) private decimalPipe: DecimalPipe,
    @Inject(BizyOrderByPipe) private orderByPipe: BizyOrderByPipe
  ) {
    this.isMobile = this.mobile.isMobile();
  }

  async ngOnInit() {
    try {
      this.loading = true;
      const generalProfitLabels: Array<string> = [];
      const generalProfitSeries: Array<IBizyBarLineChartData> = [
        {
          xAxi: {
            name: this.translate.get('DASHBOARD.GENERAL_PROFIT.ACCOUNT')
          },
          yAxi: {
            position: 'right',
            name: '$',
            onValueFormatter: (value: number): string =>
              `$${this.decimalPipe.transform(value, '1.2-2')}`
          },
          values: [],
          type: 'bar'
        },
        {
          values: [],
          type: 'line',
          xAxi: {
            name: this.translate.get('DASHBOARD.GENERAL_PROFIT.INFLATION')
          },
          yAxi: {
            name: '$',
            hide: true,
            onValueFormatter: (value: number): string =>
              `$${this.decimalPipe.transform(value, '1.2-2')}`
          }
        },
        {
          values: [],
          type: 'line',
          xAxi: {
            name: this.translate.get('DASHBOARD.GENERAL_PROFIT.FIXED_RATE')
          },
          yAxi: {
            hide: true,
            name: '$',
            onValueFormatter: (value: number): string =>
              `$${this.decimalPipe.transform(value, '1.2-2')}`
          }
        }
      ];

      const monthProfitLabels: Array<string> = [];
      const monthProfitSeries: Array<IBizyBarLineChartData> = [
        {
          label: this.translate.get('DASHBOARD.MONTH_PROFIT.ACCOUNT'),
          type: 'line',
          xAxi: {
            name: this.translate.get('DASHBOARD.MONTH_PROFIT.ACCOUNT')
          },
          yAxi: {
            name: '%',
            position: 'right',
            onValueFormatter: (value: number): string =>
              `${this.decimalPipe.transform(value, '1.0-0')}%`
          },
          values: []
        }
      ];

      const dollarProfitLabels: Array<string> = [];
      const dollarProfitSeries: Array<IBizyBarLineChartData> = [
        {
          xAxi: {
            name: this.translate.get('DASHBOARD.DOLLAR_PROFIT.RETAIL_ACCOUNT')
          },
          yAxi: {
            position: 'right',
            name: 'U$D',
            onValueFormatter: (value: number): string =>
              `U$D ${this.decimalPipe.transform(value, '1.2-2')}`
          },
          type: 'line',
          values: []
        },
        {
          xAxi: {
            name: this.translate.get('DASHBOARD.DOLLAR_PROFIT.CCL_ACCOUNT')
          },
          yAxi: {
            hide: true,
            name: 'U$D',
            onValueFormatter: (value: number): string =>
              `U$D ${this.decimalPipe.transform(value, '1.2-2')}`
          },
          type: 'line',
          values: []
        },
        {
          xAxi: {
            name: this.translate.get('DASHBOARD.DOLLAR_PROFIT.MEP_ACCOUNT')
          },
          yAxi: {
            hide: true,
            name: 'U$D',
            onValueFormatter: (value: number): string =>
              `U$D ${this.decimalPipe.transform(value, '1.2-2')}`
          },
          type: 'line',
          values: []
        },
        {
          xAxi: {
            name: this.translate.get('DASHBOARD.DOLLAR_PROFIT.CRYPTO_ACCOUNT')
          },
          yAxi: {
            hide: true,
            name: 'U$D',
            onValueFormatter: (value: number): string =>
              `U$D ${this.decimalPipe.transform(value, '1.2-2')}`
          },
          type: 'line',
          values: []
        }
      ];

      const dollarRateLabels: Array<string> = [];
      const dollarRateSeries: Array<IBizyBarLineChartData> = [
        {
          xAxi: {
            name: this.translate.get('DASHBOARD.DOLLAR_RATE.OFFICIAL')
          },
          yAxi: {
            position: 'right',
            name: 'U$D',
            onValueFormatter: (value: number): string =>
              `U$D ${this.decimalPipe.transform(value, '1.2-2')}`
          },
          type: 'line',
          values: []
        },
        {
          xAxi: {
            name: this.translate.get('DASHBOARD.DOLLAR_RATE.CCL')
          },
          yAxi: {
            hide: true,
            name: 'U$D',
            onValueFormatter: (value: number): string =>
              `U$D ${this.decimalPipe.transform(value, '1.2-2')}`
          },
          type: 'line',
          values: []
        }
      ];

      const inflationLabels: Array<string> = [];
      const inflationSeries: Array<IBizyBarLineChartData> = [
        {
          xAxi: {
            name: this.translate.get('DASHBOARD.INFLATION.TITLE')
          },
          yAxi: {
            position: 'right',
            name: '%',
            onValueFormatter: (value: number): string =>
              `${this.decimalPipe.transform(value, '1.2-2')}%`
          },
          values: [],
          type: 'bar'
        }
      ];

      const fixedRateLabels: Array<string> = [];
      const fixedRateSeries: Array<IBizyBarLineChartData> = [
        {
          xAxi: {
            name: this.translate.get('DASHBOARD.FIXED_RATE.TITLE')
          },
          yAxi: {
            position: 'right',
            name: '%',
            onValueFormatter: (value: number): string =>
              `${this.decimalPipe.transform(value, '1.2-2')}%`
          },
          values: [],
          type: 'bar'
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
        generalProfitSeries[0].values!.push(lastRecord.balance);
        generalProfitSeries[1].values!.push(periodTotal + (periodTotal * _countryRecord.ipc) / 100);
        generalProfitSeries[2].values!.push(
          periodTotal + (periodTotal * (_countryRecord.fixedRate / 12)) / 100
        );

        const difference = (lastRecord.balance - periodTotal) / periodTotal;
        const profit = this.utils.roundNumber(difference * 100 - _countryRecord.ipc);

        monthProfitLabels.push(label);
        monthProfitSeries[0].values!.push(profit);

        const cclDollarInPeriod = this.utils.roundNumber(
          lastRecord.balance / _countryRecord.cclDollar
        );
        const mepDollarInPeriod = this.utils.roundNumber(
          lastRecord.balance / _countryRecord.mepDollar
        );
        const retailDollarInPeriod = this.utils.roundNumber(
          lastRecord.balance / _countryRecord.retailDollar
        );
        const cryptoDollarInPeriod = this.utils.roundNumber(
          lastRecord.balance / _countryRecord.cryptoDollar
        );

        dollarProfitLabels.push(label);
        dollarProfitSeries[0].values!.push(retailDollarInPeriod);
        dollarProfitSeries[1].values!.push(cclDollarInPeriod);
        dollarProfitSeries[2].values!.push(mepDollarInPeriod);
        dollarProfitSeries[3].values!.push(cryptoDollarInPeriod);

        inflationLabels.push(label);
        inflationSeries[0].values!.push(_countryRecord.ipc);

        fixedRateLabels.push(label);
        fixedRateSeries[0].values!.push(_countryRecord.fixedRate);

        dollarRateLabels.push(label);
        dollarRateSeries[0].values!.push(_countryRecord.retailDollar);
        dollarRateSeries[1].values!.push(_countryRecord.cclDollar);
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
        generalProfitSeries[0].values!.length === 0 ||
        !generalProfitSeries[1] ||
        generalProfitSeries[1].values!.length === 0
      ) {
        return;
      }

      const lastBalance = generalProfitSeries[0].values![generalProfitSeries[0].values!.length - 1];
      const lastIPCBalance =
        generalProfitSeries[1].values![generalProfitSeries[1].values!.length - 1];
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
