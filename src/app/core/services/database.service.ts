import { Injectable, OnDestroy } from '@angular/core';
import { FirebaseFirestore } from '@capacitor-firebase/firestore';
import { COUNTRY_CODE, ICashFlowRecord, ICountryRecord, IUserPreferences, IUserSettings, ROLE } from '@core/model';
import { BehaviorSubject } from 'rxjs';

enum COLLECTION {
  COUNTRY = 'country'
}

enum USER_DOCUMENT {
  CASH_FLOW_RECORDS = 'cash-flow-records',
  SETTINGS = 'settings',
  PREFERENCES = 'preferences'
}

/* enum OPERATOR {
  EQUAL = '==',
  NOT_EQUAL = '!=',
  LESS = '<',
  LESS_OR_EQUAL = '<=',
  GREATER = '>',
  GREATER_OR_EQUAL = '>=',
  CONTAINS = 'array-contains'
} */

@Injectable({ providedIn: 'root' })
export class DatabaseService implements OnDestroy {
  #cashFlowRecords = new BehaviorSubject<Array<ICashFlowRecord> | undefined>(undefined);
  #countryRecords = new BehaviorSubject<Array<ICountryRecord> | undefined>(undefined);
  #userSettings = new BehaviorSubject<IUserSettings | undefined>(undefined);
  #userPreferences = new BehaviorSubject<IUserPreferences | undefined>(undefined);

  start() {
    return FirebaseFirestore.clearPersistence();
  }

  getCashFlowRecords = (email: string) =>
    new Promise<Array<ICashFlowRecord>>((resolve, reject) => {
      if (typeof this.#cashFlowRecords.value !== 'undefined') {
        resolve(this.#cashFlowRecords.value);
        return;
      }

      FirebaseFirestore.addDocumentSnapshotListener<{ data: Array<ICashFlowRecord> }>(
        { reference: `${email}/${USER_DOCUMENT.CASH_FLOW_RECORDS}` },
        (event, error) => {
          if (error) {
            console.log(error);
            reject(error);
          } else {
            const records = event && event.snapshot.data ? event.snapshot.data.data : [];
            this.#cashFlowRecords.next(records);
            resolve(records);
          }
        }
      );
    });

  getCashFlowRecord = async (data: { email: string; recordId: string }): Promise<ICashFlowRecord | null> => {
    if (typeof this.#cashFlowRecords.value !== 'undefined') {
      return this.#cashFlowRecords.value.find(_record => _record.id === data.recordId) || null;
    }

    const records = await this.getCashFlowRecords(data.email);
    const record = records.find(_record => _record.id === data.recordId) || null;
    return record;
  };

  postCashFlowRecord = async (data: { email: string; record: ICashFlowRecord }): Promise<void> => {
    const records = await this.getCashFlowRecords(data.email);
    const index = records.findIndex(_record => _record.id === data.record.id);
    if (index !== -1) {
      records[index] = data.record;
    } else {
      records.push(data.record);
    }

    const cashFlowRecords = JSON.parse(JSON.stringify({ data: records }));
    await FirebaseFirestore.setDocument({
      reference: `${data.email}/${USER_DOCUMENT.CASH_FLOW_RECORDS}`,
      data: cashFlowRecords
    });
  };

  putCashFlowRecord = async (data: { email: string; record: ICashFlowRecord }): Promise<void> => {
    const records = await this.getCashFlowRecords(data.email);
    const index = records.findIndex(_record => _record.id === data.record.id);
    if (index !== -1) {
      records[index] = data.record;
      const cashFlowRecords = JSON.parse(JSON.stringify({ data: records }));
      await FirebaseFirestore.setDocument({
        reference: `${data.email}/${USER_DOCUMENT.CASH_FLOW_RECORDS}`,
        data: cashFlowRecords
      });
    }
  };

  deleteCashFlowRecord = async (data: { email: string; id: string }): Promise<void> => {
    let records = await this.getCashFlowRecords(data.email);
    records = records.filter(_record => _record.id !== data.id);

    const cashFlowRecords = JSON.parse(JSON.stringify({ data: records }));

    await FirebaseFirestore.setDocument({
      reference: `${data.email}/${USER_DOCUMENT.CASH_FLOW_RECORDS}`,
      data: cashFlowRecords
    });
  };

  getCountryRecords = (country: COUNTRY_CODE): Promise<Array<ICountryRecord>> =>
    new Promise<Array<ICountryRecord>>((resolve, reject) => {
      if (typeof this.#countryRecords.value !== 'undefined') {
        resolve(this.#countryRecords.value);
        return;
      }

      FirebaseFirestore.addDocumentSnapshotListener<{ data: Array<ICountryRecord> }>(
        { reference: `${COLLECTION.COUNTRY}/${country}` },
        (event, error) => {
          if (error) {
            console.log(error);
            reject(error);
          } else {
            const records = event && event.snapshot.data ? event.snapshot.data.data : [];
            this.#countryRecords.next(records);
            resolve(records);
          }
        }
      );
    });

  getCountryRecord = async (data: { id: string; country: COUNTRY_CODE }): Promise<ICountryRecord | null> => {
    if (typeof this.#countryRecords.value !== 'undefined') {
      return this.#countryRecords.value.find(_record => _record.id === data.id) || null;
    }

    const records = await this.getCountryRecords(data.country);
    const record = records.find(_record => _record.id === data.id) || null;
    return record;
  };

  postCountryRecord = async (data: { record: ICountryRecord; country: COUNTRY_CODE }): Promise<void> => {
    const records = await this.getCountryRecords(data.country);
    const index = records.findIndex(_record => _record.id === data.record.id);
    if (index !== -1) {
      records[index] = data.record;
    } else {
      records.push(data.record);
    }

    const countryRecord = JSON.parse(JSON.stringify({ data: records }));

    await FirebaseFirestore.setDocument({
      reference: `${COLLECTION.COUNTRY}/${data.country}`,
      data: countryRecord
    });
  };

  putCountryRecord = async (data: { record: ICountryRecord; country: COUNTRY_CODE }): Promise<void> => {
    const records = await this.getCountryRecords(data.country);
    const index = records.findIndex(_record => _record.id === data.record.id);
    if (index !== -1) {
      records[index] = data.record;

      const countryRecord = JSON.parse(JSON.stringify({ data: records }));
      await FirebaseFirestore.setDocument({
        reference: `${COLLECTION.COUNTRY}/${data.country}`,
        data: countryRecord
      });
    }
  };

  deleteCountryRecord = async (data: { id: string; country: COUNTRY_CODE }): Promise<void> => {
    let records = await this.getCountryRecords(data.country);
    records = records.filter(_record => _record.id !== data.id);

    const countryRecord = JSON.parse(JSON.stringify({ data: records }));

    await FirebaseFirestore.setDocument({
      reference: `${COLLECTION.COUNTRY}/${data.country}`,
      data: countryRecord
    });
  };

  getUserSettings = (email: string) =>
    new Promise<IUserSettings | null>((resolve, reject) => {
      if (typeof this.#userSettings.value !== 'undefined') {
        resolve(this.#userSettings.value);
        return;
      }

      FirebaseFirestore.addDocumentSnapshotListener<IUserSettings>({ reference: `${email}/${USER_DOCUMENT.SETTINGS}` }, (event, error) => {
        if (error) {
          console.log(error);
          reject(error);
        } else {
          const settings = event && event.snapshot.data ? event.snapshot.data : undefined;
          this.#userSettings.next(settings);
          resolve(settings ?? null);
        }
      });
    });

  getUserPreferences = (email: string) =>
    new Promise<IUserPreferences | null>((resolve, reject) => {
      if (typeof this.#userPreferences.value !== 'undefined') {
        resolve(this.#userPreferences.value);
        return;
      }

      FirebaseFirestore.addDocumentSnapshotListener<IUserPreferences>({ reference: `${email}/${USER_DOCUMENT.PREFERENCES}` }, (event, error) => {
        if (error) {
          console.log(error);
          reject(error);
        } else {
          const preferences = event && event.snapshot.data ? event.snapshot.data : undefined;
          this.#userPreferences.next(preferences);
          resolve(preferences ?? null);
        }
      });
    });

  getUserRoles = async (email: string): Promise<Array<ROLE>> => {
    if (typeof this.#userSettings.value !== 'undefined') {
      return this.#userSettings.value.roles ?? [];
    }

    const settings = await this.getUserSettings(email);

    return settings && settings.roles ? settings.roles : [];
  };

  getUserCountry = async (email: string): Promise<COUNTRY_CODE> => {
    if (typeof this.#userPreferences.value !== 'undefined') {
      return this.#userPreferences.value.country ?? [];
    }

    const preferences = await this.getUserPreferences(email);

    if (preferences && preferences.country) {
      return preferences.country;
    } else {
      return COUNTRY_CODE.ARGENTINA;
    }
  };

  putUserCountry = async (data: { email: string; country: COUNTRY_CODE }): Promise<void> => {
    const preferences = await this.getUserPreferences(data.email);
    const newPreferences = JSON.parse(JSON.stringify({ ...preferences, country: data.country }));

    await FirebaseFirestore.setDocument({
      reference: `${data.email}/${USER_DOCUMENT.PREFERENCES}`,
      data: newPreferences
    });
  };

  destroy = () => {
    this.#cashFlowRecords.next(undefined);
    this.#countryRecords.next(undefined);
    this.#userPreferences.next(undefined);
    this.#userSettings.next(undefined);
    return FirebaseFirestore.removeAllListeners();
  };

  ngOnDestroy() {
    this.destroy();
  }
}
