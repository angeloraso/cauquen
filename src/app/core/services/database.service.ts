import { Inject, Injectable } from '@angular/core';
import { AuthService } from '@core/auth/auth.service';
import { COUNTRY_CODE, ICountryRecord, IHistoryRecord } from '@core/model';
import { FirebaseApp } from 'firebase/app';
import {
  Firestore,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  orderBy,
  query,
  setDoc,
  where
} from 'firebase/firestore';

enum DB {
  HISTORY = 'HISTORY',
  COUNTRY_RECORDS = 'COUNTRY_RECORDS'
}

enum OPERATOR {
  EQUAL = '==',
  NOT_EQUAL = '!=',
  LESS = '<',
  LESS_OR_EQUAL = '<=',
  GREATER = '>',
  GREATER_OR_EQUAL = '>=',
  CONTAINS = 'array-contains'
}

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  #DB: Firestore | null = null;

  constructor(@Inject(AuthService) private auth: AuthService) {}

  start(app: FirebaseApp) {
    this.#DB = getFirestore(app);
  }

  getHistoryRecords() {
    return new Promise<Array<IHistoryRecord>>(async (resolve, reject) => {
      try {
        const userId = this.auth.getId();
        if (!userId) {
          throw new Error('No user id');
        }

        const q = query(collection(this.#DB!, `${DB.HISTORY}-${userId}`), orderBy('date', 'asc'));
        const querySnapshot = await getDocs(q);
        const docs: Array<IHistoryRecord> = [];
        querySnapshot.forEach(doc => {
          docs.push(doc.data() as IHistoryRecord);
        });

        resolve(docs);
      } catch (error) {
        reject(error);
      }
    });
  }

  getHistoryRecord(recordId: string) {
    return new Promise<IHistoryRecord | null>(async (resolve, reject) => {
      try {
        const userId = this.auth.getId();
        if (!userId) {
          throw new Error('No user id');
        }

        const record = await getDoc(doc(this.#DB!, `${DB.HISTORY}-${userId}`, recordId));
        resolve(record.exists() ? (record.data() as IHistoryRecord) : null);
      } catch (error) {
        reject(error);
      }
      const userId = this.auth.getId();
      if (!userId) {
        throw new Error('No user id');
      }
    });
  }

  postHistoryRecord(record: IHistoryRecord): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      try {
        const userId = this.auth.getId();
        if (!userId) {
          throw new Error('No user id');
        }

        await setDoc(doc(this.#DB!, `${DB.HISTORY}-${userId}`, record.id), {
          id: record.id,
          date: Number(record.date),
          amount: Number(record.amount),
          balance: Number(record.balance),
          created: Number(record.created),
          updated: Number(record.updated)
        });
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }

  putHistoryRecord(record: IHistoryRecord): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      try {
        const userId = this.auth.getId();
        if (!userId) {
          throw new Error('No user id');
        }

        await setDoc(doc(this.#DB!, `${DB.HISTORY}-${userId}`, record.id), {
          id: record.id,
          date: Number(record.date),
          amount: Number(record.amount),
          balance: Number(record.balance),
          created: Number(record.created),
          updated: Number(record.updated)
        });
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }

  deleteHistoryRecord(id: string): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      try {
        const userId = this.auth.getId();
        if (!userId) {
          throw new Error('No user id');
        }

        await deleteDoc(doc(this.#DB!, `${DB.HISTORY}-${userId}`, id));
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }

  getCountryRecords(country: COUNTRY_CODE) {
    return new Promise<Array<ICountryRecord>>(async (resolve, reject) => {
      try {
        const q = query(
          collection(this.#DB!, DB.COUNTRY_RECORDS),
          where('country', OPERATOR.EQUAL, country),
          orderBy('from', 'asc')
        );

        const querySnapshot = await getDocs(q);
        const docs: Array<ICountryRecord> = [];
        querySnapshot.forEach(doc => {
          docs.push(doc.data() as ICountryRecord);
        });
        resolve(docs.filter(_doc => _doc.country === country).sort((a, b) => a.from - b.from));
      } catch (error) {
        reject(error);
      }
    });
  }

  getCountryRecord(recordId: string) {
    return new Promise<ICountryRecord | null>(async (resolve, reject) => {
      try {
        const record = await getDoc(doc(this.#DB!, `${DB.COUNTRY_RECORDS}`, recordId));
        resolve(record.exists() ? (record.data() as ICountryRecord) : null);
      } catch (error) {
        reject(error);
      }
    });
  }

  postCountryRecord(record: ICountryRecord): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      try {
        await setDoc(doc(this.#DB!, DB.COUNTRY_RECORDS, record.id), {
          id: record.id,
          from: Number(record.from),
          to: Number(record.to),
          country: record.country,
          ipc: Number(record.ipc),
          fixedRate: Number(record.fixedRate),
          officialDollarRate: Number(record.officialDollarRate),
          cclDollarRate: Number(record.cclDollarRate),
          created: Number(record.created),
          updated: Number(record.updated)
        });
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }

  putCountryRecord(record: ICountryRecord): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      try {
        await setDoc(doc(this.#DB!, DB.COUNTRY_RECORDS, record.id), {
          id: record.id,
          from: Number(record.from),
          to: Number(record.to),
          country: record.country,
          ipc: Number(record.ipc),
          fixedRate: Number(record.fixedRate),
          officialDollarRate: Number(record.officialDollarRate),
          cclDollarRate: Number(record.cclDollarRate),
          created: Number(record.created),
          updated: Number(record.updated)
        });
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }

  deleteCountryRecord(id: string): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      try {
        await deleteDoc(doc(this.#DB!, DB.COUNTRY_RECORDS, id));
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }
}
