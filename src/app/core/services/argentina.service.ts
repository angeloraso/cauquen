import { Inject, Injectable } from '@angular/core';
import { COUNTRY_CODE, CountryRecord, ICountryRecord } from '@core/model';
import { DatabaseService } from './database.service';
@Injectable({
  providedIn: 'root'
})
export class ArgentinaService {
  constructor(@Inject(DatabaseService) private database: DatabaseService) {}

  getData(data?: { from: number; to: number }): Promise<Array<ICountryRecord>> {
    let from: number = Date.now();
    let to: number = Date.now();

    if (data) {
      from = data.from;
      to = data.to;
    }

    if (!data || !data.from) {
      const date = new Date();
      date.setFullYear(date.getFullYear() - 1);
      from = date.getTime();
    }

    if (!data || !data.to) {
      to = Date.now();
    }

    return this.database.getCountryData({ country: COUNTRY_CODE.ARGENTINA, from, to }) as Promise<
      Array<ICountryRecord>
    >;
  }

  postRecord(record: ICountryRecord) {
    return this.database.postCountryRecord(new CountryRecord(record));
  }

  putRecord(record: ICountryRecord): Promise<void> {
    return this.database.putCountryRecord(record);
  }

  deleteRecord(record: ICountryRecord): Promise<void> {
    return this.database.deleteCountryRecord(record.id);
  }
}
