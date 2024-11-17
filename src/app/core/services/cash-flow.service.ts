import { Inject, Injectable } from '@angular/core';
import { CashFlowRecord, ICashFlowRecord } from '@core/model';
import { DatabaseService } from '@core/services';

@Injectable({
  providedIn: 'root'
})
export class CashFlowService {
  constructor(@Inject(DatabaseService) private database: DatabaseService) {}

  getRecords() {
    return new Promise<Array<ICashFlowRecord>>(async (resolve, reject) => {
      try {
        const records = await this.database.getCashFlowRecords();
        resolve(records ?? []);
      } catch (error) {
        reject(error);
      }
    });
  }

  getRecord(recordId: string) {
    return new Promise<ICashFlowRecord>(async (resolve, reject) => {
      try {
        const record = await this.database.getCashFlowRecord(recordId);
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

  postRecord(record: Omit<ICashFlowRecord, 'id' | 'created' | 'updated'>): Promise<void> {
    return this.database.postCashFlowRecord(new CashFlowRecord(record));
  }

  putRecord(record: ICashFlowRecord): Promise<void> {
    return this.database.putCashFlowRecord({
      id: record.id,
      date: Number(record.date),
      amount: Number(record.amount),
      balance: Number(record.balance),
      created: Number(record.created) || Date.now(),
      updated: Date.now()
    });
  }

  deleteRecord(record: ICashFlowRecord): Promise<void> {
    return this.database.deleteCashFlowRecord(record.id);
  }
}
