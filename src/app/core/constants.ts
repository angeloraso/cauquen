import { IMenuOption } from '@menu/model';
import { COUNTRY_CODE } from './model';

export enum MENU_OPTION_ID {
  DASHBOARD = 'DASHBOARD',
  HISTORY = 'HISTORY',
  INFLATION = 'INFLATION',
  FIXED_RATE = 'FIXED_RATE'
}

export enum LANGUAGE {
  SPANISH = 'es'
}

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
  }
];
