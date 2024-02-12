import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { ArgentinaService, HistoryService, UtilsService } from '@core/services';
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
  generalProfitSeries: Array<Array<number>> = [];

  monthProfitLabels: Array<string> = [];
  monthProfitSeries: Array<Array<number>> = [];

  inflationLabels: Array<string> = [];
  inflationSeries: Array<Array<number>> = [];

  fixedRateLabels: Array<string> = [];
  fixedRateSeries: Array<Array<number>> = [];

  loading: boolean = false;

  constructor(
    @Inject(HistoryService) private history: HistoryService,
    @Inject(ArgentinaService) private argentina: ArgentinaService,
    @Inject(UtilsService) private utils: UtilsService
  ) {}

  async ngOnInit() {
    try {
      this.loading = true;
      const generalProfitLabels: Array<string> = [];
      const generalProfitSeries: Array<Array<number>> = [[], [], []];

      const monthProfitLabels: Array<string> = [];
      const monthProfitSeries: Array<number> = [];

      const inflationLabels: Array<string> = [];
      const inflationSeries: Array<number> = [];

      const fixedRateLabels: Array<string> = [];
      const fixedRateSeries: Array<number> = [];

      const [history, countryRecords] = await Promise.all([
        this.history.getRecords(),
        this.argentina.getRecords()
      ]);

      let previousBalance = 0;
      countryRecords.forEach(_countryRecord => {
        const recordsByPeriod = history.filter(
          _historyRecord =>
            _historyRecord.date >= _countryRecord.from && _historyRecord.date <= _countryRecord.to
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

        const netBalance = lastRecord.balance - (lastRecord.balance * _countryRecord.ipc) / 100;

        const difference = netBalance - periodTotal;

        const profit = this.utils.roundNumber((difference * 100) / periodTotal);

        const date = new Date(_countryRecord.from);
        const label = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;

        generalProfitLabels.push(label);
        generalProfitSeries[0].push(lastRecord.balance);
        generalProfitSeries[1].push(periodTotal + (periodTotal * _countryRecord.ipc) / 100);
        generalProfitSeries[2].push(
          periodTotal + (periodTotal * (_countryRecord.fixedRate / 12)) / 100
        );

        monthProfitLabels.push(label);
        monthProfitSeries.push(profit);

        inflationLabels.push(label);
        inflationSeries.push(_countryRecord.ipc);

        fixedRateLabels.push(label);
        fixedRateSeries.push(_countryRecord.fixedRate);
      });

      this.generalProfitLabels = generalProfitLabels;
      this.generalProfitSeries = generalProfitSeries;

      this.inflationLabels = inflationLabels;
      this.inflationSeries = [inflationSeries];

      this.fixedRateLabels = fixedRateLabels;
      this.fixedRateSeries = [fixedRateSeries];

      const total = history.reduce(
        (accumulator, currentValue) => accumulator + currentValue.amount,
        0
      );

      if (
        !generalProfitSeries[0] ||
        generalProfitSeries[0].length === 0 ||
        !generalProfitSeries[1] ||
        generalProfitSeries[1].length === 0
      ) {
        return;
      }

      this.total = this.utils.roundNumber(
        ((generalProfitSeries[0][generalProfitSeries[0].length - 1] -
          generalProfitSeries[1][generalProfitSeries[1].length - 1]) *
          100) /
          total
      );

      this.monthProfitLabels = monthProfitLabels;
      this.monthProfitSeries = [monthProfitSeries];
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
