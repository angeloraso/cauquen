import { NoopScrollStrategy } from '@angular/cdk/overlay';
import { AfterViewInit, Component, Inject, OnDestroy, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { RouterService } from '@bizy/services';
import { ConfirmAlertComponent } from '@components/confirm-alert';
import { IHistoryRecord } from '@core/model';
import { HistoryService } from '@core/services';
import { Subscription } from 'rxjs';
import { PATH } from './history.routing';

@Component({
  selector: 'cauquen-history',
  templateUrl: './history.html',
  styleUrls: ['./history.css']
})
export class HistoryComponent implements AfterViewInit, OnDestroy {
  @ViewChild(MatSort) sort: MatSort | null = null;
  readonly DISPLAYED_COLUMNS = ['date', 'amount', 'balance', 'actions'];
  dataSource = new MatTableDataSource<IHistoryRecord>();

  private _subscription = new Subscription();

  constructor(
    @Inject(MatDialog) private dialog: MatDialog,
    @Inject(RouterService) private router: RouterService,
    @Inject(HistoryService) private history: HistoryService
  ) {}

  async ngAfterViewInit() {
    try {
      const data = await this.history.getHistory();
      if (this.sort) {
        this.dataSource.sort = this.sort;
        this.dataSource.sort.active = 'date';
        this.dataSource.sort.direction = 'desc';
      }
      this.dataSource.data = data;
    } catch (error) {
      console.log(error);
    }
  }

  addRecord() {
    this.router.goTo({ path: PATH.ADD });
  }

  editRecord(record: IHistoryRecord) {
    console.log(record);
    this.router.goTo({ path: String(record.id) });
  }

  openAlertDialog(record: IHistoryRecord) {
    const dialogRef = this.dialog.open(ConfirmAlertComponent, {
      data: record,
      scrollStrategy: new NoopScrollStrategy(),
      panelClass: 'cauquen-material-dialog'
    });

    this._subscription.add(
      dialogRef.afterClosed().subscribe((res: boolean) => {
        if (res) {
          this._deleteRecord(record);
        }
      })
    );
  }

  private async _deleteRecord(record: IHistoryRecord) {
    try {
      await this.history.deleteRecord(record);
      const index = this.dataSource.data.findIndex(_record => _record.id === record.id);
      if (index !== -1) {
        this.dataSource.data.splice(index, 1);
        this.dataSource.data = [...this.dataSource.data];
      }
    } catch (error) {
      console.log(error);
    }
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }
}
