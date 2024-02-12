import { Inject, Injectable } from '@angular/core';
import { COUNTRY_CODE, CountryRecord, ICountryRecord } from '@core/model';
import { DatabaseService } from './database.service';
@Injectable({
  providedIn: 'root'
})
export class ArgentinaService {
  constructor(@Inject(DatabaseService) private database: DatabaseService) {}

  getRecords(): Promise<Array<ICountryRecord>> {
    return this.database.getCountryRecords(COUNTRY_CODE.ARGENTINA) as Promise<
      Array<ICountryRecord>
    >;
  }

  getRecord(recordId: string) {
    return new Promise<ICountryRecord>(async (resolve, reject) => {
      try {
        const record = await this.database.getCountryRecord(recordId);
        if (record) {
          resolve(record);
        } else {
          throw new Error('Not exists');
        }
      } catch (error) {
        reject(error);
      }
    });
  }

  postRecord(record: ICountryRecord) {
    return this.database.postCountryRecord(new CountryRecord(record));
  }

  putRecord(record: ICountryRecord): Promise<void> {
    return this.database.putCountryRecord({
      ...record,
      created: record.created ?? Date.now(),
      updated: Date.now()
    });
  }

  deleteRecord(record: ICountryRecord): Promise<void> {
    return this.database.deleteCountryRecord(record.id);
  }
}
