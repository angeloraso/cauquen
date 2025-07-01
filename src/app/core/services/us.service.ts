import { DatePipe } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
@Injectable({ providedIn: 'root' })
export class USService {
  readonly http = inject(HttpClient);
  readonly datePipe = inject(DatePipe);
  #PROXY_URL = 'https://cors-anywhere.herokuapp.com/';
  #BLS_URL = 'https://api.bls.gov/publicAPI/v2/timeseries/data';

  getInflationRate = async (data: { month: number; year: number }): Promise<number> => {
    try {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });

      const params = {
        seriesid: ['CUUR0000SA0'],
        startyear: data.year - 1,
        endyear: data.year,
        registrationkey: 'e47ac49433614f979205ff70c2d3c312'
      };

      const res: { status: string; Results: { series: Array<{ data: Array<{ period: string; value: string }> }> } } = (await lastValueFrom(
        this.http.post(`${this.#PROXY_URL}${this.#BLS_URL}`, params, { headers })
      )) as { status: string; Results: { series: Array<{ data: Array<{ period: string; value: string }> }> } };

      if (res && res.status === 'REQUEST_SUCCEEDED') {
        const seriesData = res.Results.series[0]?.data;
        const index = seriesData.findIndex(item => item.period === `M${String(data.month + 1).padStart(2, '0')}`);

        if (index === -1) {
          return 0;
        }

        const monthCPI = parseFloat(seriesData[index].value); // Latest CPI
        const previousMonthCPI = parseFloat(seriesData[index + 1].value); // Previous CPI
        const inflationRate = ((monthCPI - previousMonthCPI) / previousMonthCPI) * 100;

        return inflationRate;
      } else {
        return 0;
      }
    } catch {
      return 0;
    }
  };
}
