import { PATH as APP_PATH } from '@app/app.routing';
import { PATH as HOME_PATH } from '@home/home.routing';
import { COUNTRY_CODE } from './model';

export enum MENU_OPTION_ID {
  DASHBOARD = 'DASHBOARD',
  HISTORY = 'HISTORY',
  INFLATION = 'INFLATION',
  FIXED_RATE = 'FIXED_RATE',
  CONFIG = 'CONFIG'
}

export const ROOT_PATHS = [
  `/${APP_PATH.HOME}/${HOME_PATH.HISTORY}`,
  `/${APP_PATH.HOME}/${HOME_PATH.DASHBOARD}`,
  `/${APP_PATH.HOME}/${HOME_PATH.INFO}`,
  `/${APP_PATH.HOME}/${HOME_PATH.CONFIG}`,
  `/${APP_PATH.AUTH}`
];

export const COUNTRIES = [{ id: COUNTRY_CODE.ARGENTINA, name: 'CORE.COUNTRY.AR' }];
