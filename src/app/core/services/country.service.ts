import { inject, Injectable } from '@angular/core';
import { COUNTRY_CODE, CountryRecord, ICountryRecord } from '@core/model';
import { DatabaseService } from './database.service';
@Injectable({ providedIn: 'root' })
export class CountryService {
  readonly #database = inject(DatabaseService);

  getRecords = (countryCode: COUNTRY_CODE): Promise<Array<ICountryRecord>> =>
    this.#database.getCountryRecords(countryCode) as Promise<Array<ICountryRecord>>;

  getRecord = async (recordId: string): Promise<ICountryRecord | null> => {
    const record = await this.#database.getCountryRecord({
      id: recordId,
      country: COUNTRY_CODE.ARGENTINA
    });
    return record || null;
  };

  postRecord = (record: Omit<ICountryRecord, 'id' | 'country' | 'created' | 'updated'>) =>
    this.#database.postCountryRecord({
      record: new CountryRecord(record),
      country: COUNTRY_CODE.ARGENTINA
    });

  putRecord = (record: Omit<ICountryRecord, 'country' | 'updated'>): Promise<void> =>
    this.#database.putCountryRecord({
      record: {
        id: record.id,
        country: COUNTRY_CODE.ARGENTINA,
        from: Number(record.from),
        to: Number(record.to),
        usInflationRate: Number(record.usInflationRate),
        inflationRate: Number(record.inflationRate),
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

  deleteRecord = (record: ICountryRecord): Promise<void> => this.#database.deleteCountryRecord({ id: record.id, country: COUNTRY_CODE.ARGENTINA });
}
