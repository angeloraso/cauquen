import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IBCRAResponse, ICurrencyRecord } from '@core/model';
import { lastValueFrom } from 'rxjs';
@Injectable({ providedIn: 'root' })
export class ArgentinaService {
  readonly #http = inject(HttpClient);
  readonly #datePipe = inject(DatePipe);

  #cclHistory: Array<ICurrencyRecord> = [];
  #mepHistory: Array<ICurrencyRecord> = [];
  #cryptoHistory: Array<ICurrencyRecord> = [];
  #BCRA_URL = 'https://api.bcra.gob.ar/estadisticas/v3.0/Monetarias';

  getInflationRate = async (data: { month: number; year: number }): Promise<number> => {
    const INFLATION_RATE_VARIABLE_ID = '27';
    const from = new Date(data.year, data.month, 1);
    const to = new Date(data.year, data.month + 1, 0);
    const res = (await lastValueFrom(
      this.#http.get(
        `${this.#BCRA_URL}/${INFLATION_RATE_VARIABLE_ID}/?desde=${this.#datePipe.transform(from, 'yyyy-MM-dd')}&hasta=${this.#datePipe.transform(to, 'yyyy-MM-dd')}`
      )
    )) as IBCRAResponse;
    return res.results[0].valor;
  };

  getAverageFixedRate = async (data: { year: number; month: number }): Promise<number> => {
    const INFLATION_RATE_VARIABLE_ID = '12';
    const from = new Date(data.year, data.month, 1);
    const to = new Date(data.year, data.month + 1, 0);
    const res = (await lastValueFrom(
      this.#http.get(
        `${this.#BCRA_URL}/${INFLATION_RATE_VARIABLE_ID}/?desde=${this.#datePipe.transform(from, 'yyyy-MM-dd')}&hasta=${this.#datePipe.transform(to, 'yyyy-MM-dd')}`
      )
    )) as IBCRAResponse;
    const values = res.results.map(_result => _result.valor);
    const sum = values.reduce((accumulator, currentValue) => {
      return accumulator + currentValue;
    }, 0);
    return sum / values.length;
  };

  getAverageRetailDollar = async (data: { year: number; month: number }): Promise<number> => {
    const INFLATION_RATE_VARIABLE_ID = '4';
    const from = new Date(data.year, data.month, 1);
    const to = new Date(data.year, data.month + 1, 0);
    const res = (await lastValueFrom(
      this.#http.get(
        `${this.#BCRA_URL}/${INFLATION_RATE_VARIABLE_ID}/?desde=${this.#datePipe.transform(from, 'yyyy-MM-dd')}&hasta=${this.#datePipe.transform(to, 'yyyy-MM-dd')}`
      )
    )) as IBCRAResponse;
    const values = res.results.map(_result => _result.valor);
    const sum = values.reduce((accumulator, currentValue) => {
      return accumulator + currentValue;
    }, 0);
    return sum / values.length;
  };

  getAverageMEPDollar = async (data: { year: number; month: number }): Promise<number> => {
    let records: Array<ICurrencyRecord> = [];
    if (!this.#mepHistory || this.#mepHistory.length === 0) {
      const res = (await lastValueFrom(this.#http.get('https://api.argentinadatos.com/v1/cotizaciones/dolares/bolsa'))) as Array<ICurrencyRecord>;
      this.#mepHistory = res ?? [];
    }

    records = this.#mepHistory;

    const filteredRecords = records.filter(_record => {
      const date = _record.fecha.split('-');
      return Number(date[0]) === data.year && Number(date[1]) === data.month + 1;
    });

    if (filteredRecords.length === 0) {
      return 0;
    }

    const averageMEP =
      filteredRecords.map(_record => _record.venta).reduce((accumulator, currentValue) => accumulator + currentValue, 0) / filteredRecords.length;
    return averageMEP ?? 0;
  };

  getAverageCCLDollar = async (data: { year: number; month: number }): Promise<number> => {
    let records: Array<ICurrencyRecord> = [];
    if (!this.#cclHistory || this.#cclHistory.length === 0) {
      const res = (await lastValueFrom(
        this.#http.get('https://api.argentinadatos.com/v1/cotizaciones/dolares/contadoconliqui')
      )) as Array<ICurrencyRecord>;
      this.#cclHistory = res ?? [];
    }

    records = this.#cclHistory;
    const filteredRecords = records.filter(_record => {
      const date = _record.fecha.split('-');
      return Number(date[0]) === data.year && Number(date[1]) === data.month + 1;
    });

    if (filteredRecords.length === 0) {
      return 0;
    }

    const averageCCL =
      filteredRecords.map(_record => _record.venta).reduce((accumulator, currentValue) => accumulator + currentValue, 0) / filteredRecords.length;
    return averageCCL ?? 0;
  };

  getAverageCryptoDollar = async (data: { year: number; month: number }): Promise<number> => {
    let records: Array<ICurrencyRecord> = [];
    if (!this.#cryptoHistory || this.#cryptoHistory.length === 0) {
      const res = (await lastValueFrom(this.#http.get('https://api.argentinadatos.com/v1/cotizaciones/dolares/cripto'))) as Array<ICurrencyRecord>;
      this.#cryptoHistory = res ?? [];
    }

    records = this.#cryptoHistory;
    const filteredRecords = records.filter(_record => {
      const date = _record.fecha.split('-');
      return Number(date[0]) === data.year && Number(date[1]) === data.month + 1;
    });

    if (filteredRecords.length === 0) {
      return 0;
    }

    const averageCrypto = Number(
      (
        filteredRecords.map(_record => _record.venta).reduce((accumulator, currentValue) => accumulator + currentValue, 0) / filteredRecords.length
      ).toFixed(2)
    );
    return averageCrypto ?? 0;
  };
}
