import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { ArgentinaService, UtilsService } from '@core/services';
import { HistoryService } from '@history/history.service';
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

  constructor(
    @Inject(HistoryService) private history: HistoryService,
    @Inject(ArgentinaService) private argentina: ArgentinaService,
    @Inject(UtilsService) private utils: UtilsService
  ) {}

  async ngOnInit() {
    try {
      const generalProfitLabels: Array<string> = [];
      const generalProfitSeries: Array<Array<number>> = [[], [], []];

      const monthProfitLabels: Array<string> = [];
      const monthProfitSeries: Array<number> = [];

      const [history, inflation] = await Promise.all([
        this.history.getHistory(),
        this.argentina.getInflation()
      ]);

      let previousBalance = 0;
      inflation.forEach(_ipc => {
        const records = history.filter(
          _record => _record.date >= _ipc.from && _record.date <= _ipc.to
        );

        if (records.length === 0) {
          return;
        }

        const total =
          previousBalance +
          records.reduce((accumulator, currentValue) => accumulator + currentValue.amount, 0);

        const lastRecord = records.reduce((prev, current) =>
          prev && prev.date > current.date ? prev : current
        );

        previousBalance = lastRecord.balance;

        const netBalance = lastRecord.balance - (lastRecord.balance * _ipc.value) / 100;

        const difference = netBalance - total;

        const profit = this.utils.roundNumber((difference * 100) / total);

        const date = new Date(_ipc.from);
        const label = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;

        generalProfitLabels.push(label);
        generalProfitSeries[0].push(lastRecord.balance);
        generalProfitSeries[1].push(total + (total * _ipc.value) / 100);
        generalProfitSeries[2].push(total + (total * (_ipc.fixedRate / 12)) / 100);

        monthProfitLabels.push(label);
        monthProfitSeries.push(profit);
      });

      this.generalProfitLabels = generalProfitLabels;
      this.generalProfitSeries = generalProfitSeries;

      const total = history.reduce(
        (accumulator, currentValue) => accumulator + currentValue.amount,
        0
      );
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
    }
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }
}
