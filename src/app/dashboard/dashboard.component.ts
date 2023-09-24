import { NoopScrollStrategy } from '@angular/cdk/overlay';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RecordFormComponent } from '@components/record-form';
import { IHistoryRecord } from '@core/model';
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

  labels: Array<string> = [];
  series: Array<Array<number>> = [];

  constructor(
    @Inject(MatDialog) private dialog: MatDialog,
    @Inject(HistoryService) private history: HistoryService,
    @Inject(ArgentinaService) private argentina: ArgentinaService,
    @Inject(UtilsService) private utils: UtilsService
  ) {}

  async ngOnInit() {
    try {
      const labels: Array<string> = [];
      const series: Array<number> = [];
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

        const netIncome = this.utils.roundNumber((difference * 100) / total);

        const date = new Date(_ipc.from);
        const label = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
        labels.push(label);
        series.push(netIncome);
      });

      this.labels = labels;
      this.series.push(series);
    } catch (error) {
      console.debug(error);
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(RecordFormComponent, {
      scrollStrategy: new NoopScrollStrategy(),
      panelClass: 'cauquen-material-dialog'
    });

    this._subscription.add(
      dialogRef.afterClosed().subscribe(_record => {
        if (_record) {
          this._addRecord(_record);
        }
      })
    );
  }

  private async _addRecord(record: IHistoryRecord) {
    try {
      await this.history.postRecord(record);
    } catch (error) {
      console.log(error);
    }
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }
}
