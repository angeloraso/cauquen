import { DatePipe } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class USService {
  readonly http = inject(HttpClient);
  readonly datePipe = inject(DatePipe);
  #PROXY_URL = 'https://cors-anywhere.herokuapp.com/';
  #BLS_URL = 'https://api.bls.gov/publicAPI/v2/timeseries/data';

  getInflationRate(data: { month: number; year: number }) {
    return new Promise<number>(async resolve => {
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

        const res = (await lastValueFrom(
          this.http.post(`${this.#PROXY_URL}${this.#BLS_URL}`, params, { headers })
        )) as any;

        if (res && res.status === 'REQUEST_SUCCEEDED') {
          const seriesData = res.Results.series[0]?.data;
          const index = seriesData.findIndex(
            (item: any) => item.period === `M${String(data.month + 1).padStart(2, '0')}`
          );

          if (index === -1) {
            resolve(0);
            return;
          }

          const monthCPI = parseFloat(seriesData[index].value); // Latest CPI
          const previousMonthCPI = parseFloat(seriesData[index + 1].value); // Previous CPI
          const inflationRate = ((monthCPI - previousMonthCPI) / previousMonthCPI) * 100;

          resolve(inflationRate);
        } else {
          resolve(0);
        }
      } catch (error) {
        resolve(0);
      }
    });
  }
}
