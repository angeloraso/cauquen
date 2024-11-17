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
  usInflationRate: number;
  inflationRate: number;
  fixedRate: number;
  retailDollar: number;
  mepDollar: number;
  cclDollar: number;
  cryptoDollar: number;
  created: number;
  updated: number;
}

export class CountryRecord implements ICountryRecord {
  id: string;
  country: COUNTRY_CODE;
  from: number;
  to: number;
  usInflationRate: number;
  inflationRate: number;
  fixedRate: number;
  retailDollar: number;
  mepDollar: number;
  cclDollar: number;
  cryptoDollar: number;
  created: number;
  updated: number;

  constructor(record: Omit<ICountryRecord, 'id' | 'country' | 'created' | 'updated'>) {
    this.id = uuid4();
    this.country = COUNTRY_CODE.ARGENTINA;
    this.from = Number(record.from);
    this.to = Number(record.to);
    this.usInflationRate = Number(record.usInflationRate);
    this.inflationRate = Number(record.inflationRate);
    this.fixedRate = Number(record.fixedRate);
    this.retailDollar = Number(record.retailDollar);
    this.mepDollar = Number(record.mepDollar);
    this.cclDollar = Number(record.cclDollar);
    this.cryptoDollar = Number(record.cryptoDollar);
    this.created = Date.now();
    this.updated = Date.now();
  }
}

export enum ROLE {
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
  INVITED = 'INVITED'
}

export interface IUserSettings {
  roles: Array<ROLE>;
  country: COUNTRY_CODE;
}

export interface IUserPreferences {
  country: COUNTRY_CODE;
}

export interface IBCRAModel {
  idVariable: number;
  fecha: string; // dd/MM/yyyy
  valor: number;
}

export interface IBCRAResponse {
  results: Array<IBCRAModel>;
  status: 200 | 400;
  errorMessages: [];
}

export enum CURRENCY_NAME {
  CCL = 'contadoconliqui',
  MEP = 'bolsa',
  CRYPTO = 'cripto'
}
export interface ICurrencyRecord {
  casa: CURRENCY_NAME;
  compra: number;
  venta: number;
  fecha: string; // YYYY-MM-dd
}
