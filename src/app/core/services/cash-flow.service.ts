import { inject, Injectable } from '@angular/core';
import { AuthService } from '@auth/auth.service';
import { CashFlowRecord, ICashFlowRecord } from '@core/model';
import { DatabaseService } from '@core/services';

@Injectable({ providedIn: 'root' })
export class CashFlowService {
  readonly #database = inject(DatabaseService);
  readonly #auth = inject(AuthService);

  getRecords = async (): Promise<Array<ICashFlowRecord>> => {
    const email = this.#auth.getEmail();
    if (!email) {
      throw new Error();
    }

    const records = await this.#database.getCashFlowRecords(email);
    return records ?? [];
  };

  getRecord = async (recordId: string): Promise<ICashFlowRecord | null> => {
    const email = this.#auth.getEmail();
    if (!email) {
      throw new Error();
    }

    const record = await this.#database.getCashFlowRecord({ email, recordId });
    return record || null;
  };

  postRecord = (record: Omit<ICashFlowRecord, 'id' | 'created' | 'updated'>): Promise<void> => {
    const email = this.#auth.getEmail();
    if (!email) {
      throw new Error();
    }

    return this.#database.postCashFlowRecord({ email, record: new CashFlowRecord(record) });
  };

  putRecord = async (record: ICashFlowRecord): Promise<void> => {
    const email = this.#auth.getEmail();
    if (!email) {
      throw new Error();
    }
    return this.#database.putCashFlowRecord({
      email,
      record: {
        id: record.id,
        date: Number(record.date),
        amount: Number(record.amount),
        balance: Number(record.balance),
        created: Number(record.created) || Date.now(),
        updated: Date.now()
      }
    });
  };

  deleteRecord = (record: ICashFlowRecord): Promise<void> => {
    const email = this.#auth.getEmail();
    if (!email) {
      throw new Error();
    }

    return this.#database.deleteCashFlowRecord({ email, id: record.id });
  };
}
