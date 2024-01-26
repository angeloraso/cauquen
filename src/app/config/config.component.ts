import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PopupService } from '@bizy/services';
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

  constructor(@Inject(PopupService) private popup: PopupService<AboutPopupComponent, void>) {}

  async ngOnInit() {
    try {
      console.log('config');
    } catch (error) {
      console.debug(error);
    }
  }

  openDialog(): void {
    this.popup.open({ component: AboutPopupComponent });
  }
}
