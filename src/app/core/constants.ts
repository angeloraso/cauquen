import { PATH as APP_PATH } from '@app/app.routing';
import { PATH as HOME_PATH } from '@home/home.routing';
import { COUNTRY_CODE } from './model';

export enum MENU_OPTION_ID {
  DASHBOARD = 'DASHBOARD',
  CASH_FLOW = 'CASH_FLOW',
  INFLATION = 'INFLATION',
  FIXED_RATE = 'FIXED_RATE',
  CONFIG = 'CONFIG'
}

export const ROOT_PATHS = [
  `/${APP_PATH.HOME}/${HOME_PATH.CASH_FLOW}`,
  `/${APP_PATH.HOME}/${HOME_PATH.DASHBOARD}`,
  `/${APP_PATH.HOME}/${HOME_PATH.INFO}`,
  `/${APP_PATH.HOME}/${HOME_PATH.CONFIG}`,
  `/${APP_PATH.AUTH}`
];

export const COUNTRIES = [{ id: COUNTRY_CODE.ARGENTINA, value: 'CORE.COUNTRY.AR' }];

export const LOGO_PATH = '/assets/favicons/favicon.ico';
