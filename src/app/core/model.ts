import uuid4 from 'uuid4';

export interface IHistoryRecord {
  id: string;
  date: number;
  amount: number;
  balance: number;
}

export class HistoryRecord implements HistoryRecord {
  id: string;
  date: number;
  amount: number;
  balance: number;

  constructor(record: Omit<IHistoryRecord, 'id'>) {
    this.id = uuid4();
    this.date = record.date;
    this.amount = record.amount;
    this.balance = record.balance;
  }
}
