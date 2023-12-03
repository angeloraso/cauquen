import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ICountryRecord } from '@core/model';
import { ArgentinaService } from '@core/services';

@Component({
  selector: 'cauquen-fixed-rate',
  templateUrl: './fixed-rate.html',
  styleUrls: ['./fixed-rate.css']
})
export class FixedRateComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort | null = null;
  readonly DISPLAYED_COLUMNS = ['from', 'to', 'fixedRate'];
  dataSource = new MatTableDataSource<ICountryRecord>();

  fixedRateLabels: Array<string> = [];
  fixedRateSeries: Array<Array<number>> = [];

  constructor(@Inject(ArgentinaService) private argentina: ArgentinaService) {}

  async ngOnInit() {
    try {
      const fixedRateLabels: Array<string> = [];
      const fixedRateSeries: Array<number> = [];

      const inflation = await this.argentina.getData();

      inflation.forEach(_ipc => {
        const date = new Date(_ipc.from);
        const label = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;

        fixedRateLabels.push(label);
        fixedRateSeries.push(_ipc.fixedRate);
      });

      this.fixedRateLabels = fixedRateLabels;
      this.fixedRateSeries = [fixedRateSeries];

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
}
