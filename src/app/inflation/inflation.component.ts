import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmAlertComponent } from '@components/confirm-alert';
import { ICountryRecord } from '@core/model';
import { ArgentinaService } from '@core/services';
import { CountryRecordFormComponent } from '@dashboard/components';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cauquen-inflation',
  templateUrl: './inflation.html',
  styleUrls: ['./inflation.css']
})
export class InflationComponent implements OnInit, OnDestroy {
  @ViewChild(MatSort) sort: MatSort | null = null;
  readonly DISPLAYED_COLUMNS = ['from', 'to', 'value', 'actions'];
  dataSource = new MatTableDataSource<ICountryRecord>();

  inflationLabels: Array<string> = [];
  inflationSeries: Array<Array<number>> = [];

  private _subscription = new Subscription();

  constructor(
    @Inject(ArgentinaService) private argentina: ArgentinaService,
    @Inject(MatDialog) private dialog: MatDialog
  ) {}

  async ngOnInit() {
    try {
      const inflationLabels: Array<string> = [];
      const inflationSeries: Array<number> = [];

      const inflation = await this.argentina.getData();

      inflation.forEach(_ipc => {
        const date = new Date(_ipc.from);
        const label = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;

        inflationLabels.push(label);
        inflationSeries.push(_ipc.ipc);
      });

      this.inflationLabels = inflationLabels;
      this.inflationSeries = [inflationSeries];

      if (this.sort) {
        this.dataSource.sort = this.sort;
        this.dataSource.sort.active = 'from';
        this.dataSource.sort.direction = 'desc';
      }
      this.dataSource.data = inflation;
    } catch (error) {
      console.debug(error);
    }
  }

  openDialog(record?: ICountryRecord): void {
    const dialogRef = this.dialog.open(CountryRecordFormComponent, {
      data: record,
      panelClass: 'cauquen-material-dialog'
    });

    this._subscription.add(
      dialogRef.afterClosed().subscribe(_record => {
        if (_record) {
          this._editRecord(_record);
        }
      })
    );
  }

  openAlertDialog(record: ICountryRecord) {
    const dialogRef = this.dialog.open(ConfirmAlertComponent, {
      data: record,
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

  private async _editRecord(record: ICountryRecord) {
    try {
      await this.argentina.putRecord(record);
      const index = this.dataSource.data.findIndex(_record => _record.id === record.id);
      if (index !== -1) {
        this.dataSource.data[index] = record;
        this.dataSource.data = [...this.dataSource.data];
      }
    } catch (error) {
      console.log(error);
    }
  }

  private async _deleteRecord(record: ICountryRecord) {
    try {
      await this.argentina.deleteRecord(record);
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
