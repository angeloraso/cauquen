import { DatePipe, DecimalPipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { IBizyBarLineChartData } from '@bizy/components';
import { LOADING_TYPE } from '@bizy/directives';
import { BizyOrderByPipe } from '@bizy/pipes';
import { BizyTranslateService } from '@bizy/services';
import { COUNTRY_CODE } from '@core/model';
import { CashFlowService, CountryService, MobileService, UtilsService } from '@core/services';

@Component({
  selector: 'cauquen-dashboard',
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent implements OnInit {
  readonly LOADING_TYPE = LOADING_TYPE;
  profit = {
    retail: 0,
    ccl: 0,
    mep: 0,
    crypto: 0
  };

  accumulatedIPCAdjustAccountDollarProfitLabels: Array<string> = [];
  accumulatedIPCAdjustAccountDollarProfitSeries: Array<IBizyBarLineChartData> = [];

  ipcAdjustAccountDollarProfitLabels: Array<string> = [];
  ipcAdjustAccountDollarProfitSeries: Array<IBizyBarLineChartData> = [];

  periodProfitLabels: Array<string> = [];
  periodProfitSeries: Array<IBizyBarLineChartData> = [];

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
      let retailProfit = 0;
      let cclProfit = 0;
      let mepProfit = 0;
      let cryptoProfit = 0;

      const accumulatedIPCAdjustAccountDollarProfitLabels: Array<string> = [];
      const accumulatedIPCAdjustAccountDollarProfitSeries: Array<IBizyBarLineChartData> = [
        {
          type: 'line',
          values: [],
          xAxi: {
            name: this.translate.get(
              'DASHBOARD.ACCUMULATED_IPC_ADJUST_ACCOUNT_DOLLAR_PROFIT.RETAIL_DOLLAR'
            )
          },
          yAxi: {
            name: 'U$D',
            position: 'right',
            onValueFormatter: (value: number): string =>
              `U$D ${this.decimalPipe.transform(value, '1.2-2')}`
          }
        },
        {
          type: 'line',
          values: [],
          xAxi: {
            name: this.translate.get(
              'DASHBOARD.ACCUMULATED_IPC_ADJUST_ACCOUNT_DOLLAR_PROFIT.CCL_DOLLAR'
            )
          },
          yAxi: {
            hide: true,
            name: 'U$D',
            onValueFormatter: (value: number): string =>
              `U$D ${this.decimalPipe.transform(value, '1.2-2')}`
          }
        },
        {
          type: 'line',
          values: [],
          xAxi: {
            name: this.translate.get(
              'DASHBOARD.ACCUMULATED_IPC_ADJUST_ACCOUNT_DOLLAR_PROFIT.MEP_DOLLAR'
            )
          },
          yAxi: {
            hide: true,
            name: 'U$D',
            onValueFormatter: (value: number): string =>
              `U$D ${this.decimalPipe.transform(value, '1.2-2')}`
          }
        },
        {
          type: 'line',
          values: [],
          xAxi: {
            name: this.translate.get(
              'DASHBOARD.ACCUMULATED_IPC_ADJUST_ACCOUNT_DOLLAR_PROFIT.CRYPTO_DOLLAR'
            )
          },
          yAxi: {
            hide: true,
            name: 'U$D',
            onValueFormatter: (value: number): string =>
              `U$D ${this.decimalPipe.transform(value, '1.2-2')}`
          }
        }
      ];

      const ipcAdjustAccountDollarProfitLabels: Array<string> = [];
      const ipcAdjustAccountDollarProfitSeries: Array<IBizyBarLineChartData> = [
        {
          type: 'bar',
          values: [],
          xAxi: {
            name: this.translate.get('DASHBOARD.IPC_ADJUST_ACCOUNT_DOLLAR_PROFIT.RETAIL_DOLLAR')
          },
          yAxi: {
            name: 'U$D',
            onValueFormatter: (value: number): string =>
              `U$D ${this.decimalPipe.transform(value, '1.2-2')}`
          }
        },
        {
          type: 'bar',
          values: [],
          xAxi: {
            name: this.translate.get('DASHBOARD.IPC_ADJUST_ACCOUNT_DOLLAR_PROFIT.CCL_DOLLAR')
          },
          yAxi: {
            hide: true,
            name: 'U$D',
            onValueFormatter: (value: number): string =>
              `U$D ${this.decimalPipe.transform(value, '1.2-2')}`
          }
        },
        {
          type: 'bar',
          values: [],
          xAxi: {
            name: this.translate.get('DASHBOARD.IPC_ADJUST_ACCOUNT_DOLLAR_PROFIT.MEP_DOLLAR')
          },
          yAxi: {
            hide: true,
            name: 'U$D',
            onValueFormatter: (value: number): string =>
              `U$D ${this.decimalPipe.transform(value, '1.2-2')}`
          }
        },
        {
          type: 'bar',
          values: [],
          xAxi: {
            name: this.translate.get('DASHBOARD.IPC_ADJUST_ACCOUNT_DOLLAR_PROFIT.CRYPTO_DOLLAR')
          },
          yAxi: {
            hide: true,
            name: 'U$D',
            onValueFormatter: (value: number): string =>
              `U$D ${this.decimalPipe.transform(value, '1.2-2')}`
          }
        }
      ];

      const periodProfitLabels: Array<string> = [];
      const periodProfitSeries: Array<IBizyBarLineChartData> = [
        {
          type: 'bar',
          values: [],
          xAxi: {
            name: this.translate.get('DASHBOARD.PERIOD_PROFIT.ACCOUNT')
          },
          yAxi: {
            position: 'right',
            name: '%',
            onValueFormatter: (value: number): string =>
              `${this.decimalPipe.transform(value, '1.2-2')}%`
          }
        },
        {
          type: 'line',
          values: [],
          xAxi: {
            name: this.translate.get('DASHBOARD.PERIOD_PROFIT.INFLATION')
          },
          yAxi: {
            name: '%',
            hide: true,
            onValueFormatter: (value: number): string =>
              `${this.decimalPipe.transform(value, '1.2-2')}%`
          }
        },
        {
          type: 'line',
          values: [],
          xAxi: {
            name: this.translate.get('DASHBOARD.PERIOD_PROFIT.FIXED_RATE')
          },
          yAxi: {
            hide: true,
            name: '%',
            onValueFormatter: (value: number): string =>
              `${this.decimalPipe.transform(value, '1.2-2')}%`
          }
        }
      ];

      const accountEvolutionLabels: Array<string> = [];
      const accountEvolutionSeries: Array<IBizyBarLineChartData> = [
        {
          xAxi: {
            name: this.translate.get('DASHBOARD.ACCOUNT_EVOLUTION.RETAIL_ACCOUNT')
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
            name: this.translate.get('DASHBOARD.ACCOUNT_EVOLUTION.CCL_ACCOUNT')
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
            name: this.translate.get('DASHBOARD.ACCOUNT_EVOLUTION.MEP_ACCOUNT')
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
            name: this.translate.get('DASHBOARD.ACCOUNT_EVOLUTION.CRYPTO_ACCOUNT')
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
            name: this.translate.get('DASHBOARD.DOLLAR_RATE.RETAIL')
          },
          yAxi: {
            position: 'right',
            name: '$',
            onValueFormatter: (value: number): string =>
              `$ ${this.decimalPipe.transform(value, '1.2-2')}`
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
            name: '$',
            onValueFormatter: (value: number): string =>
              `$ ${this.decimalPipe.transform(value, '1.2-2')}`
          },
          type: 'line',
          values: []
        },
        {
          xAxi: {
            name: this.translate.get('DASHBOARD.DOLLAR_RATE.MEP')
          },
          yAxi: {
            hide: true,
            name: '$',
            onValueFormatter: (value: number): string =>
              `$ ${this.decimalPipe.transform(value, '1.2-2')}`
          },
          type: 'line',
          values: []
        },
        {
          xAxi: {
            name: this.translate.get('DASHBOARD.DOLLAR_RATE.CRYPTO')
          },
          yAxi: {
            hide: true,
            name: '$',
            onValueFormatter: (value: number): string =>
              `$ ${this.decimalPipe.transform(value, '1.2-2')}`
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

        const label = this.datePipe.transform(_countryRecord.from, 'dd/MM/yyyy') as string;

        const periodCashFlow =
          previousBalance +
          recordsByPeriod.reduce((accumulator, record) => accumulator + record.amount, 0);

        const lastRecord = recordsByPeriod.reduce((prev, current) =>
          prev && prev.date > current.date ? prev : current
        );

        previousBalance = lastRecord.balance;

        const ipcAdjustPeriodCashFlow =
          periodCashFlow + periodCashFlow * (_countryRecord.ipc / 100);
        const difference = lastRecord.balance - ipcAdjustPeriodCashFlow;

        retailProfit += difference / _countryRecord.retailDollar;
        cclProfit += difference / _countryRecord.cclDollar;
        mepProfit += difference / _countryRecord.mepDollar;
        cryptoProfit += difference / _countryRecord.cryptoDollar;

        accumulatedIPCAdjustAccountDollarProfitLabels.push(label);
        accumulatedIPCAdjustAccountDollarProfitSeries[0].values!.push(retailProfit);
        accumulatedIPCAdjustAccountDollarProfitSeries[1].values!.push(cclProfit);
        accumulatedIPCAdjustAccountDollarProfitSeries[2].values!.push(mepProfit);
        accumulatedIPCAdjustAccountDollarProfitSeries[3].values!.push(cryptoProfit);

        ipcAdjustAccountDollarProfitLabels.push(label);
        ipcAdjustAccountDollarProfitSeries[0].values!.push(
          this.utils.roundNumber(difference / _countryRecord.retailDollar)
        );
        ipcAdjustAccountDollarProfitSeries[1].values!.push(
          this.utils.roundNumber(difference / _countryRecord.cclDollar)
        );
        ipcAdjustAccountDollarProfitSeries[2].values!.push(
          this.utils.roundNumber(difference / _countryRecord.mepDollar)
        );
        ipcAdjustAccountDollarProfitSeries[3].values!.push(
          this.utils.roundNumber(difference / _countryRecord.cryptoDollar)
        );

        const periodProfit = this.utils.roundNumber(
          ((lastRecord.balance - periodCashFlow) / periodCashFlow) * 100
        );

        periodProfitLabels.push(label);
        periodProfitSeries[0].values!.push(periodProfit);
        periodProfitSeries[1].values!.push(_countryRecord.ipc);
        periodProfitSeries[2].values!.push(this.utils.roundNumber(_countryRecord.fixedRate / 12));

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

        accountEvolutionLabels.push(label);
        accountEvolutionSeries[0].values!.push(retailDollarInPeriod);
        accountEvolutionSeries[1].values!.push(cclDollarInPeriod);
        accountEvolutionSeries[2].values!.push(mepDollarInPeriod);
        accountEvolutionSeries[3].values!.push(cryptoDollarInPeriod);

        inflationLabels.push(label);
        inflationSeries[0].values!.push(_countryRecord.ipc);

        fixedRateLabels.push(label);
        fixedRateSeries[0].values!.push(_countryRecord.fixedRate);

        dollarRateLabels.push(label);
        dollarRateSeries[0].values!.push(_countryRecord.retailDollar);
        dollarRateSeries[1].values!.push(_countryRecord.cclDollar);
        dollarRateSeries[2].values!.push(_countryRecord.mepDollar);
        dollarRateSeries[3].values!.push(_countryRecord.cryptoDollar);
      });

      this.profit.retail += this.utils.roundNumber(retailProfit);
      this.profit.ccl += this.utils.roundNumber(cclProfit);
      this.profit.mep += this.utils.roundNumber(mepProfit);
      this.profit.crypto += this.utils.roundNumber(cryptoProfit);

      this.accumulatedIPCAdjustAccountDollarProfitLabels =
        accumulatedIPCAdjustAccountDollarProfitLabels;
      this.accumulatedIPCAdjustAccountDollarProfitSeries =
        accumulatedIPCAdjustAccountDollarProfitSeries;

      this.ipcAdjustAccountDollarProfitLabels = ipcAdjustAccountDollarProfitLabels;
      this.ipcAdjustAccountDollarProfitSeries = ipcAdjustAccountDollarProfitSeries;

      this.periodProfitLabels = periodProfitLabels;
      this.periodProfitSeries = periodProfitSeries;

      this.dollarProfitLabels = accountEvolutionLabels;
      this.dollarProfitSeries = accountEvolutionSeries;

      this.dollarRateLabels = dollarRateLabels;
      this.dollarRateSeries = dollarRateSeries;

      this.inflationLabels = inflationLabels;
      this.inflationSeries = inflationSeries;

      this.fixedRateLabels = fixedRateLabels;
      this.fixedRateSeries = fixedRateSeries;
    } catch (error) {
      console.debug(error);
    } finally {
      this.loading = false;
    }
  }

  ipcAdjustAccountDollarProfitTooltipFormatter = (params: Array<any>): string => {
    let tooltip = params[0].name;
    const barParams = params.filter(_param => _param.componentSubType === 'bar');
    barParams.forEach(_param => {
      const bullet = `<span style="color: ${_param.color}; font-size: 2rem; position: relative; top: 0.3rem;">&#8226;</span>`;
      tooltip += `<br/>${bullet} ${_param.seriesName}: U$D ${_param.value}`;
    });

    return tooltip;
  };

  onPercentageTooltipFormatter = (params: Array<any>): string => {
    let tooltip = params[0].name;
    const lineParams = params.filter(_param => _param.componentSubType === 'line');
    lineParams.forEach(_param => {
      const line = `<span style="color: ${_param.color}; font-size: 2rem; position: relative; top: 0.3rem;">-</span>`;
      tooltip += `<br/>${line} ${_param.seriesName}: ${_param.value}%`;
    });

    const barParams = params.filter(_param => _param.componentSubType === 'bar');
    barParams.forEach(_param => {
      const bullet = `<span style="color: ${_param.color}; font-size: 2rem; position: relative; top: 0.3rem;">&#8226;</span>`;
      tooltip += `<br/>${bullet} ${_param.seriesName}: ${_param.value}%`;
    });

    return tooltip;
  };

  onDollarTooltipFormatter = (params: Array<any>): string => {
    let tooltip = params[0].name;
    const lineParams = params.filter(_param => _param.componentSubType === 'line');
    lineParams.forEach(_param => {
      const line = `<span style="color: ${_param.color}; font-size: 2rem; position: relative; top: 0.3rem;">-</span>`;
      tooltip += `<br/>${line} ${_param.seriesName}: U$D ${this.decimalPipe.transform(_param.value, '1.2-2')}`;
    });

    const barParams = params.filter(_param => _param.componentSubType === 'bar');
    barParams.forEach(_param => {
      const bullet = `<span style="color: ${_param.color}; font-size: 2rem; position: relative; top: 0.3rem;">&#8226;</span>`;
      tooltip += `<br/>${bullet} ${_param.seriesName}: U$D ${this.decimalPipe.transform(_param.value, '1.2-2')}%`;
    });

    return tooltip;
  };
}
