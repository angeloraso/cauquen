import { Injectable } from '@angular/core';
import { IHistoryRecord } from '@core/model';
import { FirebaseApp } from 'firebase/app';
import {
  Firestore,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  orderBy,
  query,
  setDoc
} from 'firebase/firestore';

enum DB {
  HISTORY = 'HISTORY'
}

@Injectable()
export class DatabaseService {
  DB: Firestore | null = null;

  start(app: FirebaseApp) {
    this.DB = getFirestore(app);
  }

  getHistory(): Promise<Array<unknown>> {
    return new Promise<Array<unknown>>(async (resolve, reject) => {
      try {
        const snap = await getDocs(query(collection(this.DB!, DB.HISTORY), orderBy('date', 'asc')));
        if (snap.empty) {
          resolve([]);
        } else {
          const docs: Array<unknown> = [];
          snap.forEach(doc => {
            docs.push(doc.data());
          });
          resolve(docs);
        }
      } catch (error) {
        reject(error);
      }
    });
  }

  postHistoryRecord(record: IHistoryRecord): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      try {
        await setDoc(doc(this.DB!, DB.HISTORY, record.id), Object.assign({}, record));
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }

  putHistoryRecord(record: IHistoryRecord): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      try {
        await setDoc(doc(this.DB!, DB.HISTORY, record.id), Object.assign({}, record));
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }

  deleteHistoryRecord(id: string): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      try {
        await deleteDoc(doc(this.DB!, DB.HISTORY, id));
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }
}
