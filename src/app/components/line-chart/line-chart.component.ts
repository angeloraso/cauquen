import { AfterViewInit, Component, Input } from '@angular/core';
import { LineChart } from 'chartist';

@Component({
  selector: 'cauquen-line-chart',
  templateUrl: 'line-chart.html',
  styleUrls: ['line-chart.css']
})
export class LineChartComponent implements AfterViewInit {
  @Input() id: string = '';

  readonly CHART_ID = 'cauquen-line-chart';

  private _afterViewInit = false;

  private _labels: Array<number | string> | null = null;
  private _series: Array<Array<number>> | null = null;

  @Input() set labels(labels: Array<number | string>) {
    if (!labels) {
      return;
    }

    this._labels = labels;

    if (this._afterViewInit && this._series) {
      this._buildChart({ id: this.id, labels: this._labels, series: this._series });
    }
  }

  @Input() set series(series: Array<Array<number>>) {
    if (!series) {
      return;
    }

    this._series = series;

    if (this._afterViewInit && this._labels) {
      this._buildChart({ id: this.id, labels: this._labels, series: this._series });
    }
  }

  ngAfterViewInit() {
    this._afterViewInit = true;
    if (this._labels && this._series) {
      this._buildChart({ id: this.id, labels: this._labels, series: this._series });
    }
  }

  private _buildChart(data: {
    id: string;
    labels: Array<number | string>;
    series: Array<Array<number>>;
  }) {
    new LineChart(
      `#${this.CHART_ID}-${data.id}`,
      {
        labels: data.labels,
        series: data.series
      },
      {
        low: 0,
        showArea: true
      }
    );
  }
}
