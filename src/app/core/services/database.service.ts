import { Inject, Injectable, OnDestroy } from '@angular/core';
import { AuthService } from '@core/auth/auth.service';
import { COUNTRY_CODE, ICashFlowRecord, ICountryRecord, IUserSettings, ROLE } from '@core/model';
import { FirebaseApp } from 'firebase/app';
import {
  Firestore,
  Unsubscribe,
  doc,
  initializeFirestore,
  onSnapshot,
  persistentLocalCache,
  setDoc
} from 'firebase/firestore';
import { BehaviorSubject, filter } from 'rxjs';

enum COLLECTION {
  COUNTRY = 'country'
}

enum USER_DOCUMENT {
  CASH_FLOW_RECORDS = 'cash-flow-records',
  SETTINGS = 'settings'
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

@Injectable({
  providedIn: 'root'
})
export class DatabaseService implements OnDestroy {
  #DB: Firestore | null = null;
  #subscriptions = new Set<Unsubscribe>();
  #cashFlowRecords = new BehaviorSubject<Array<ICashFlowRecord> | undefined>(undefined);
  #countryRecords = new BehaviorSubject<Array<ICountryRecord> | undefined>(undefined);
  #userSettings = new BehaviorSubject<IUserSettings | undefined>(undefined);

  constructor(@Inject(AuthService) private auth: AuthService) {
    this.auth.signedIn$.pipe(filter(value => value === false)).subscribe(() => {
      this.destroy();
    });
  }

  start(app: FirebaseApp) {
    this.#DB = initializeFirestore(app, {
      localCache: persistentLocalCache({ cacheSizeBytes: 0 })
    });
  }

  getCashFlowRecords() {
    return new Promise<Array<ICashFlowRecord>>(async (resolve, reject) => {
      try {
        if (typeof this.#cashFlowRecords.value !== 'undefined') {
          resolve(this.#cashFlowRecords.value);
          return;
        }

        const userId = this.auth.getId();
        if (!userId) {
          throw new Error('No user id');
        }

        const unsubscribe = onSnapshot(
          doc(this.#DB!, userId, USER_DOCUMENT.CASH_FLOW_RECORDS),
          doc => {
            const data = doc.data();
            const records = data ? (data.data as Array<ICashFlowRecord>) : [];
            this.#cashFlowRecords.next(records);
            resolve(records);
          }
        );

        this.#subscriptions.add(unsubscribe);
      } catch (error) {
        reject(error);
      }
    });
  }

  getCashFlowRecord(recordId: string) {
    return new Promise<ICashFlowRecord | null>(async (resolve, reject) => {
      try {
        if (typeof this.#cashFlowRecords.value !== 'undefined') {
          resolve(this.#cashFlowRecords.value.find(_record => _record.id === recordId) || null);
          return;
        }

        const userId = this.auth.getId();
        if (!userId) {
          throw new Error('No user id');
        }

        const records = await this.getCashFlowRecords();
        const record = records.find(_record => _record.id === recordId) || null;
        resolve(record as ICashFlowRecord);
      } catch (error) {
        reject(error);
      }
    });
  }

  postCashFlowRecord(record: ICashFlowRecord): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      try {
        const userId = this.auth.getId();
        if (!userId) {
          throw new Error('No user id');
        }

        const records = await this.getCashFlowRecords();
        const index = records.findIndex(_record => _record.id === record.id);
        if (index !== -1) {
          records[index] = record;
        } else {
          records.push(record);
        }

        const cashFlowRecords = JSON.parse(JSON.stringify({ data: records }));
        await setDoc(doc(this.#DB!, userId, USER_DOCUMENT.CASH_FLOW_RECORDS), cashFlowRecords);
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }

  putCashFlowRecord(record: ICashFlowRecord): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      try {
        const userId = this.auth.getId();
        if (!userId) {
          throw new Error('No user id');
        }

        const records = await this.getCashFlowRecords();
        const index = records.findIndex(_record => _record.id === record.id);
        if (index !== -1) {
          records[index] = record;
          const cashFlowRecords = JSON.parse(JSON.stringify({ data: records }));
          await setDoc(doc(this.#DB!, userId, USER_DOCUMENT.CASH_FLOW_RECORDS), cashFlowRecords);
        }

        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }

  deleteCashFlowRecord(id: string): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      try {
        const userId = this.auth.getId();
        if (!userId) {
          throw new Error('No user id');
        }

        let records = await this.getCashFlowRecords();
        records = records.filter(_record => _record.id !== id);

        const cashFlowRecords = JSON.parse(JSON.stringify({ data: records }));

        await setDoc(doc(this.#DB!, userId, USER_DOCUMENT.CASH_FLOW_RECORDS), cashFlowRecords);
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }

  getCountryRecords(country: COUNTRY_CODE) {
    return new Promise<Array<ICountryRecord>>(async (resolve, reject) => {
      try {
        if (typeof this.#countryRecords.value !== 'undefined') {
          resolve(this.#countryRecords.value);
          return;
        }

        const unsubscribe = onSnapshot(doc(this.#DB!, COLLECTION.COUNTRY, country), doc => {
          const data = doc.data();
          const records = data ? (data.data as Array<ICountryRecord>) : [];
          this.#countryRecords.next(records);
          resolve(records);
        });

        this.#subscriptions.add(unsubscribe);
      } catch (error) {
        reject(error);
      }
    });
  }

  getCountryRecord(data: { id: string; country: COUNTRY_CODE }) {
    return new Promise<ICountryRecord | null>(async (resolve, reject) => {
      try {
        if (typeof this.#countryRecords.value !== 'undefined') {
          resolve(this.#countryRecords.value.find(_record => _record.id === data.id) || null);
          return;
        }

        const records = await this.getCountryRecords(data.country);
        const record = records.find(_record => _record.id === data.id) || null;
        resolve(record as ICountryRecord);
      } catch (error) {
        reject(error);
      }
    });
  }

  postCountryRecord(data: { record: ICountryRecord; country: COUNTRY_CODE }): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      try {
        const records = await this.getCountryRecords(data.country);
        const index = records.findIndex(_record => _record.id === data.record.id);
        if (index !== -1) {
          records[index] = data.record;
        } else {
          records.push(data.record);
        }

        const countryRecord = JSON.parse(JSON.stringify({ data: records }));

        await setDoc(doc(this.#DB!, COLLECTION.COUNTRY, data.country), countryRecord);

        await setDoc(
          doc(this.#DB!, COLLECTION.COUNTRY, data.country),
          JSON.parse(JSON.stringify({ data: records }))
        );
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }

  putCountryRecord(data: { record: ICountryRecord; country: COUNTRY_CODE }): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      try {
        const records = await this.getCountryRecords(data.country);
        const index = records.findIndex(_record => _record.id === data.record.id);
        if (index !== -1) {
          records[index] = data.record;

          const countryRecord = JSON.parse(JSON.stringify({ data: records }));
          await setDoc(doc(this.#DB!, COLLECTION.COUNTRY, data.country), countryRecord);
        }

        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }

  deleteCountryRecord(data: { id: string; country: COUNTRY_CODE }): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      try {
        let records = await this.getCountryRecords(data.country);
        records = records.filter(_record => _record.id !== data.id);

        const countryRecord = JSON.parse(JSON.stringify({ data: records }));

        await setDoc(doc(this.#DB!, COLLECTION.COUNTRY, data.country), countryRecord);
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }

  getUserSettings() {
    return new Promise<IUserSettings | null>(async (resolve, reject) => {
      try {
        if (typeof this.#userSettings.value !== 'undefined') {
          resolve(this.#userSettings.value);
          return;
        }

        const userId = this.auth.getId();
        if (!userId) {
          throw new Error('No user id');
        }

        const unsubscribe = onSnapshot(doc(this.#DB!, userId, USER_DOCUMENT.SETTINGS), doc => {
          const settings = doc.data();
          this.#userSettings.next(settings as IUserSettings);
          resolve((settings as IUserSettings) ?? null);
        });

        this.#subscriptions.add(unsubscribe);
      } catch (error) {
        reject(error);
      }
    });
  }

  getUserRoles() {
    return new Promise<Array<ROLE>>(async (resolve, reject) => {
      try {
        if (typeof this.#userSettings.value !== 'undefined') {
          resolve(this.#userSettings.value.roles ?? []);
          return;
        }

        const settings = await this.getUserSettings();

        if (settings && settings.roles) {
          resolve(settings.roles);
        } else {
          resolve([]);
        }
      } catch (error) {
        reject(error);
      }
    });
  }

  getUserCountry() {
    return new Promise<COUNTRY_CODE>(async (resolve, reject) => {
      try {
        if (typeof this.#userSettings.value !== 'undefined') {
          resolve(this.#userSettings.value.country ?? []);
          return;
        }

        const settings = await this.getUserSettings();

        if (settings && settings.country) {
          resolve(settings.country);
        } else {
          resolve(COUNTRY_CODE.ARGENTINA);
        }
      } catch (error) {
        reject(error);
      }
    });
  }

  putUserCountry(country: COUNTRY_CODE) {
    return new Promise<void>(async (resolve, reject) => {
      try {
        const userId = this.auth.getId();
        if (!userId) {
          throw new Error('No user id');
        }

        const settings = await this.getUserSettings();
        const newSettings = JSON.parse(JSON.stringify({ ...settings, country }));
        await setDoc(doc(this.#DB!, userId, USER_DOCUMENT.SETTINGS), newSettings);
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }

  destroy = () => {
    const subscriptions = Array.from(this.#subscriptions);
    subscriptions.forEach(unsubscribe => {
      unsubscribe();
    });
    this.#subscriptions.clear();
  };

  ngOnDestroy() {
    this.destroy();
  }
}
