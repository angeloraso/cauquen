import { Injectable } from '@angular/core';
import { IHistoryRecord } from '@history/model';
import { FirebaseApp } from 'firebase/app';
import { Firestore, addDoc, collection, getDocs, getFirestore } from 'firebase/firestore';

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
        const snap = await getDocs(collection(this.DB!, DB.HISTORY));
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
        await addDoc(collection(this.DB!, DB.HISTORY), record);
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }
}
