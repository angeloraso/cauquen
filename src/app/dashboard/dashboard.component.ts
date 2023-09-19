import { NoopScrollStrategy } from '@angular/cdk/overlay';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RecordFormComponent } from '@components/record-form';
import { IHistoryRecord } from '@core/model';
import { HistoryService } from '@history/history.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'dashboard',
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
    @Inject(HistoryService) private history: HistoryService
  ) {}

  async ngOnInit() {
    try {
      const labels: Array<string> = [];
      const series: Array<number> = [];
      const history = await this.history.getHistory();
      history.forEach(_record => {
        const date = new Date(_record.date);
        const label = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
        labels.push(label);
        series.push(_record.balance);
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
