import { IMenuOption } from '@menu/model';

export enum MENU_OPTION_ID {
  DASHBOARD = 'DASHBOARD',
  HISTORY = 'HISTORY'
}

export enum LANGUAGE {
  SPANISH = 'es'
}

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
  }
];
