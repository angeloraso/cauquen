import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IInflation } from '@core/model';
import { ArgentinaService } from '@core/services';

@Component({
  selector: 'cauquen-inflation',
  templateUrl: './inflation.html',
  styleUrls: ['./inflation.css']
})
export class InflationComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort | null = null;
  readonly DISPLAYED_COLUMNS = ['from', 'to', 'value'];
  dataSource = new MatTableDataSource<IInflation>();

  inflationLabels: Array<string> = [];
  inflationSeries: Array<Array<number>> = [];

  constructor(@Inject(ArgentinaService) private argentina: ArgentinaService) {}

  async ngOnInit() {
    try {
      const inflationLabels: Array<string> = [];
      const inflationSeries: Array<number> = [];

      const inflation = await this.argentina.getInflation();

      inflation.forEach(_ipc => {
        const date = new Date(_ipc.from);
        const label = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;

        inflationLabels.push(label);
        inflationSeries.push(_ipc.value);
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
}
