import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ICountryRecord } from '@core/model';
import { AboutPopupComponent } from './about-popup/about-popup.component';

@Component({
  selector: 'cauquen-config',
  templateUrl: './config.html',
  styleUrls: ['./config.css']
})
export class ConfigComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort | null = null;
  readonly DISPLAYED_COLUMNS = ['from', 'to', 'fixedRate', 'actions'];
  dataSource = new MatTableDataSource<ICountryRecord>();

  fixedRateLabels: Array<string> = [];
  fixedRateSeries: Array<Array<number>> = [];

  constructor(@Inject(MatDialog) private dialog: MatDialog) {}

  async ngOnInit() {
    try {
      console.log('config');
    } catch (error) {
      console.debug(error);
    }
  }

  openDialog(record?: ICountryRecord): void {
    this.dialog.open(AboutPopupComponent, {
      data: record,
      panelClass: 'cauquen-material-dialog'
    });
  }
}
