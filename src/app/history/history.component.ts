import { NoopScrollStrategy } from '@angular/cdk/overlay';
import { AfterViewInit, Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { RecordFormComponent } from '@components/record-form';
import { IHistoryRecord } from '@core/model';
import { Subscription } from 'rxjs';
import { HistoryService } from './history.service';

@Component({
  selector: 'history',
  templateUrl: './history.html',
  styleUrls: ['./history.css']
})
export class HistoryComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(MatSort) sort: MatSort | null = null;
  readonly DISPLAYED_COLUMNS = ['date', 'amount', 'balance'];
  dataSource = new MatTableDataSource<IHistoryRecord>();

  private _subscription = new Subscription();

  constructor(
    @Inject(MatDialog) private dialog: MatDialog,
    @Inject(HistoryService) private history: HistoryService
  ) {}

  async ngOnInit() {
    try {
      const data = await this.history.getHistory();
      this.dataSource.data = data;
    } catch (error) {
      console.log(error);
    }
  }

  ngAfterViewInit() {
    setTimeout(() => {
      if (this.sort) {
        this.dataSource.sort = this.sort;
        this.dataSource.sort.active = 'date';
        this.dataSource.sort.direction = 'desc';
      }
    }, 1);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(RecordFormComponent, {
      scrollStrategy: new NoopScrollStrategy(),
      panelClass: 'cauquen-material-dialog'
    });

    this._subscription.add(
      dialogRef.afterClosed().subscribe(record => {
        if (record) {
          this.addRecord(record);
        }
      })
    );
  }

  async addRecord(record: IHistoryRecord) {
    try {
      await this.history.addRecord(record);
      this.dataSource.data = [...this.dataSource.data, record];
    } catch (error) {
      console.log(error);
    }
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }
}
