import uuid4 from 'uuid4';

export interface IHistoryRecord {
  id: string;
  date: number;
  amount: number;
  balance: number;
  created: number;
  updated: number;
}

export class HistoryRecord implements HistoryRecord {
  id: string;
  date: number;
  amount: number;
  balance: number;
  created: number;
  updated: number;

  constructor(record: Omit<IHistoryRecord, 'id' | 'created' | 'updated'>) {
    this.id = uuid4();
    this.date = record.date;
    this.amount = record.amount;
    this.balance = record.balance;
    this.created = Date.now();
    this.updated = Date.now();
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
  officialDollarRate: number;
  cclDollarRate: number;
  created: number;
  updated: number;
}

export class CountryRecord implements ICountryRecord {
  id: string;
  country: COUNTRY_CODE;
  from: number;
  to: number;
  ipc: number;
  fixedRate: number;
  officialDollarRate: number;
  cclDollarRate: number;
  created: number;
  updated: number;

  constructor(record: Omit<ICountryRecord, 'id' | 'created' | 'updated'>) {
    this.id = uuid4();
    this.country = record.country ?? COUNTRY_CODE.ARGENTINA;
    this.from = record.from;
    this.to = record.to;
    this.ipc = record.ipc;
    this.fixedRate = record.fixedRate;
    this.officialDollarRate = record.officialDollarRate;
    this.cclDollarRate = record.cclDollarRate;
    this.created = Date.now();
    this.updated = Date.now();
  }
}
