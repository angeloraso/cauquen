import { PATH as APP_PATH } from '@app/app.routing';
import { PATH as HOME_PATH } from '@home/home.routing';
import { IMenuOption } from '@menu/model';
import { PATH as SIDE_MENU_PATH } from '@menu/side-menu.routing';
import { COUNTRY_CODE } from './model';

export enum MENU_OPTION_ID {
  DASHBOARD = 'DASHBOARD',
  HISTORY = 'HISTORY',
  INFLATION = 'INFLATION',
  FIXED_RATE = 'FIXED_RATE',
  CONFIG = 'CONFIG'
}

export enum LANGUAGE {
  SPANISH = 'es'
}

export const ROOT_PATHS = [
  `/${APP_PATH.MENU}/${SIDE_MENU_PATH.HOME}/${HOME_PATH.HISTORY}`,
  `/${APP_PATH.MENU}/${SIDE_MENU_PATH.HOME}/${HOME_PATH.DASHBOARD}`,
  `/${APP_PATH.MENU}/${SIDE_MENU_PATH.HOME}/${HOME_PATH.INFLATION}`,
  `/${APP_PATH.MENU}/${SIDE_MENU_PATH.HOME}/${HOME_PATH.FIXED_RATE}`,
  `/${APP_PATH.MENU}/${SIDE_MENU_PATH.HOME}/${HOME_PATH.CONFIG}`,
  `/${APP_PATH.AUTH}`
];

export const COUNTRIES = [{ id: COUNTRY_CODE.ARGENTINA, name: 'CORE.COUNTRY.AR' }];

export const MENU_OPTIONS: Array<IMenuOption> = [
  {
    id: MENU_OPTION_ID.HISTORY,
    title: 'CORE.MENU.HISTORY',
    icon: 'history',
    active: false
  },
  {
    id: MENU_OPTION_ID.DASHBOARD,
    title: 'CORE.MENU.DASHBOARD',
    icon: 'dashboard',
    active: false
  },
  {
    id: MENU_OPTION_ID.INFLATION,
    title: 'CORE.MENU.INFLATION',
    icon: 'trending_up',
    active: false
  },
  {
    id: MENU_OPTION_ID.FIXED_RATE,
    title: 'CORE.MENU.FIXED_RATE',
    icon: 'account_balance',
    active: false
  },
  {
    id: MENU_OPTION_ID.CONFIG,
    title: 'CORE.MENU.CONFIG',
    icon: 'settings',
    active: false
  }
];
