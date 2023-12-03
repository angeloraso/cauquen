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

export enum COUNTRY_CODE {
  ARGENTINA = 'AR'
}

export interface ICountryRecord {
  id: string;
  country: COUNTRY_CODE;
  from: number;
  to: number;
  ipc: number;
  fixedRate: number;
}

export class CountryRecord implements ICountryRecord {
  id: string;
  country: COUNTRY_CODE;
  from: number;
  to: number;
  ipc: number;
  fixedRate: number;

  constructor(record: Omit<ICountryRecord, 'id'>) {
    this.id = uuid4();
    this.country = record.country ?? COUNTRY_CODE.ARGENTINA;
    this.from = record.from;
    this.to = record.to;
    this.ipc = record.ipc;
    this.fixedRate = record.fixedRate;
  }
}
