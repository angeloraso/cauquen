import { NoopScrollStrategy } from '@angular/cdk/overlay';
import { Component, Inject, OnDestroy } from '@angular/core';
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
export class DashboardComponent implements OnDestroy {
  private _subscription = new Subscription();

  constructor(
    @Inject(MatDialog) private dialog: MatDialog,
    @Inject(HistoryService) private history: HistoryService
  ) {}

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
