import { Inject, Injectable } from '@angular/core';
import { COUNTRY_CODE, CountryRecord, ICountryRecord } from '@core/model';
import { DatabaseService } from './database.service';
@Injectable({
  providedIn: 'root'
})
export class CountryService {
  constructor(@Inject(DatabaseService) private database: DatabaseService) {}

  getRecords(countryCode: COUNTRY_CODE): Promise<Array<ICountryRecord>> {
    return this.database.getCountryRecords(countryCode) as Promise<Array<ICountryRecord>>;
  }

  getRecord(recordId: string) {
    return new Promise<ICountryRecord>(async (resolve, reject) => {
      try {
        const record = await this.database.getCountryRecord({
          id: recordId,
          country: COUNTRY_CODE.ARGENTINA
        });
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

  postRecord(record: Omit<ICountryRecord, 'id' | 'country' | 'created' | 'updated'>) {
    return this.database.postCountryRecord({
      record: new CountryRecord(record),
      country: COUNTRY_CODE.ARGENTINA
    });
  }

  putRecord(record: Omit<ICountryRecord, 'country' | 'updated'>): Promise<void> {
    return this.database.putCountryRecord({
      record: {
        id: record.id,
        country: COUNTRY_CODE.ARGENTINA,
        from: Number(record.from),
        to: Number(record.to),
        ipc: Number(record.ipc),
        fixedRate: Number(record.fixedRate),
        retailDollar: Number(record.retailDollar),
        mepDollar: Number(record.mepDollar),
        cclDollar: Number(record.cclDollar),
        cryptoDollar: Number(record.cryptoDollar),
        created: Number(record.created) || Date.now(),
        updated: Date.now()
      },
      country: COUNTRY_CODE.ARGENTINA
    });
  }

  deleteRecord(record: ICountryRecord): Promise<void> {
    return this.database.deleteCountryRecord({ id: record.id, country: COUNTRY_CODE.ARGENTINA });
  }
}
