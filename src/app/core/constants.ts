import { COUNTRY_CODE } from './model';

export enum MENU_OPTION_ID {
  DASHBOARD = 'DASHBOARD',
  CASH_FLOW = 'CASH_FLOW',
  INFLATION = 'INFLATION',
  FIXED_RATE = 'FIXED_RATE',
  CONFIG = 'CONFIG'
}

export const COUNTRIES = [{ id: COUNTRY_CODE.ARGENTINA, value: 'CORE.COUNTRY.AR' }];

export const LOGO_PATH = '/assets/favicons/favicon.ico';
