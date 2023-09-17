import { NoopScrollStrategy } from '@angular/cdk/overlay';
import { Component, Inject, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { RecordFormComponent } from '@components/record-form';
import { Subscription } from 'rxjs';
import { IHistoryRecord } from './model';

@Component({
  selector: 'history',
  templateUrl: './history.html',
  styleUrls: ['./history.css']
})
export class HistoryComponent implements OnDestroy {
  readonly DISPLAYED_COLUMNS = ['date', 'amount'];
  dataSource = new MatTableDataSource<IHistoryRecord>();

  private _subscription = new Subscription();

  constructor(@Inject(MatDialog) private dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(RecordFormComponent, {
      scrollStrategy: new NoopScrollStrategy(),
      panelClass: 'cauquen-material-dialog'
    });

    this._subscription.add(
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.dataSource.data = [...this.dataSource.data, result];
        }
      })
    );
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }
}
