import uuid4 from 'uuid4';

export interface ICashFlowRecord {
  id: string;
  date: number;
  amount: number;
  balance: number;
  created: number;
  updated: number;
}

export class CashFlowRecord implements CashFlowRecord {
  id: string;
  date: number;
  amount: number;
  balance: number;
  created: number;
  updated: number;

  constructor(record: Omit<ICashFlowRecord, 'id' | 'created' | 'updated'>) {
    this.id = uuid4();
    this.date = Number(record.date);
    this.amount = Number(record.amount);
    this.balance = Number(record.balance);
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
    this.from = Number(record.from);
    this.to = Number(record.to);
    this.ipc = Number(record.ipc);
    this.fixedRate = Number(record.fixedRate);
    this.officialDollarRate = Number(record.officialDollarRate);
    this.cclDollarRate = Number(record.cclDollarRate);
    this.created = Date.now();
    this.updated = Date.now();
  }
}
