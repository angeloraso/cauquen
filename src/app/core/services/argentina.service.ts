import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { IBCRAResponse, ICurrencyRecord } from '@core/model';
import { lastValueFrom } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ArgentinaService {
  #cclHistory: Array<ICurrencyRecord> = [];
  #mepHistory: Array<ICurrencyRecord> = [];
  #cryptoHistory: Array<ICurrencyRecord> = [];
  #BCRA_URL = 'https://api.bcra.gob.ar/estadisticas/v2.0/datosvariable';

  constructor(
    @Inject(HttpClient) private http: HttpClient,
    @Inject(DatePipe) private datePipe: DatePipe
  ) {}

  getIPC(data: { month: number; year: number }) {
    return new Promise<number>(async (resolve, reject) => {
      try {
        const IPC_VARIABLE_ID = '27';
        const from = new Date(data.year, data.month, 1);
        const to = new Date(data.year, data.month + 1, 0);
        const res = (await lastValueFrom(
          this.http.get(
            `${this.#BCRA_URL}/${IPC_VARIABLE_ID}/${this.datePipe.transform(from, 'yyyy-MM-dd')}/${this.datePipe.transform(to, 'yyyy-MM-dd')}`
          )
        )) as IBCRAResponse;
        resolve(res.results[0].valor);
      } catch (error) {
        reject(error);
      }
    });
  }

  getAverageFixedRate(data: { year: number; month: number }) {
    return new Promise<number>(async (resolve, reject) => {
      try {
        const IPC_VARIABLE_ID = '12';
        const from = new Date(data.year, data.month, 1);
        const to = new Date(data.year, data.month + 1, 0);
        const res = (await lastValueFrom(
          this.http.get(
            `${this.#BCRA_URL}/${IPC_VARIABLE_ID}/${this.datePipe.transform(from, 'yyyy-MM-dd')}/${this.datePipe.transform(to, 'yyyy-MM-dd')}`
          )
        )) as IBCRAResponse;
        const values = res.results.map(_result => _result.valor);
        const sum = values.reduce((accumulator, currentValue) => {
          return accumulator + currentValue;
        }, 0);
        resolve(sum / values.length);
      } catch (error) {
        reject(error);
      }
    });
  }

  getAverageRetailDollar(data: { year: number; month: number }) {
    return new Promise<number>(async (resolve, reject) => {
      try {
        const IPC_VARIABLE_ID = '4';
        const from = new Date(data.year, data.month, 1);
        const to = new Date(data.year, data.month + 1, 0);
        const res = (await lastValueFrom(
          this.http.get(
            `${this.#BCRA_URL}/${IPC_VARIABLE_ID}/${this.datePipe.transform(from, 'yyyy-MM-dd')}/${this.datePipe.transform(to, 'yyyy-MM-dd')}`
          )
        )) as IBCRAResponse;
        const values = res.results.map(_result => _result.valor);
        const sum = values.reduce((accumulator, currentValue) => {
          return accumulator + currentValue;
        }, 0);
        resolve(sum / values.length);
      } catch (error) {
        reject(error);
      }
    });
  }

  getAverageMEPDollar(data: { year: number; month: number }) {
    return new Promise<number>(async (resolve, reject) => {
      try {
        let records: Array<ICurrencyRecord> = [];
        if (!this.#mepHistory || this.#mepHistory.length === 0) {
          const res = (await lastValueFrom(
            this.http.get('https://api.argentinadatos.com/v1/cotizaciones/dolares/bolsa')
          )) as Array<ICurrencyRecord>;
          this.#mepHistory = res ?? [];
        }

        records = this.#mepHistory;

        const filteredRecords = records.filter(_record => {
          const date = _record.fecha.split('-');
          return Number(date[0]) === data.year && Number(date[1]) === data.month + 1;
        });

        if (filteredRecords.length === 0) {
          resolve(0);
          return;
        }

        const averageMEP =
          filteredRecords
            .map(_record => _record.venta)
            .reduce((accumulator, currentValue) => accumulator + currentValue, 0) /
          filteredRecords.length;
        resolve(averageMEP ?? 0);
      } catch (error) {
        reject(error);
      }
    });
  }

  getAverageCCLDollar(data: { year: number; month: number }) {
    return new Promise<number>(async (resolve, reject) => {
      try {
        let records: Array<ICurrencyRecord> = [];
        if (!this.#cclHistory || this.#cclHistory.length === 0) {
          const res = (await lastValueFrom(
            this.http.get('https://api.argentinadatos.com/v1/cotizaciones/dolares/contadoconliqui')
          )) as Array<ICurrencyRecord>;
          this.#cclHistory = res ?? [];
        }

        records = this.#cclHistory;
        const filteredRecords = records.filter(_record => {
          const date = _record.fecha.split('-');
          return Number(date[0]) === data.year && Number(date[1]) === data.month + 1;
        });

        if (filteredRecords.length === 0) {
          resolve(0);
          return;
        }

        const averageCCL =
          filteredRecords
            .map(_record => _record.venta)
            .reduce((accumulator, currentValue) => accumulator + currentValue, 0) /
          filteredRecords.length;
        resolve(averageCCL ?? 0);
      } catch (error) {
        reject(error);
      }
    });
  }

  getAverageCryptoDollar(data: { year: number; month: number }) {
    return new Promise<number>(async (resolve, reject) => {
      try {
        let records: Array<ICurrencyRecord> = [];
        if (!this.#cryptoHistory || this.#cryptoHistory.length === 0) {
          const res = (await lastValueFrom(
            this.http.get('https://api.argentinadatos.com/v1/cotizaciones/dolares/cripto')
          )) as Array<ICurrencyRecord>;
          this.#cryptoHistory = res ?? [];
        }

        records = this.#cryptoHistory;
        const filteredRecords = records.filter(_record => {
          const date = _record.fecha.split('-');
          return Number(date[0]) === data.year && Number(date[1]) === data.month + 1;
        });

        if (filteredRecords.length === 0) {
          resolve(0);
          return;
        }

        const averageCrypto = Number(
          (
            filteredRecords
              .map(_record => _record.venta)
              .reduce((accumulator, currentValue) => accumulator + currentValue, 0) /
            filteredRecords.length
          ).toFixed(2)
        );
        resolve(averageCrypto ?? 0);
      } catch (error) {
        reject(error);
      }
    });
  }
}
