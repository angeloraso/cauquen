import { LANGUAGE } from '@bizy/services';

export const locale = {
  lang: LANGUAGE.SPANISH,
  translations: {
    CORE: {
      EMPTY: 'Sin elementos',
      MENU: {
        DASHBOARD: 'Panel',
        HISTORY: 'Historial',
        INFO: 'Info',
        CONFIG: 'Config'
      },
      BUTTON: {
        CANCEL: 'Cancelar',
        SAVE: 'Guardar',
        CONFIRM: 'Confirmar'
      },
      COUNTRY: {
        AR: 'Argentina'
      },
      FORM: {
        FIELD: {
          DATE: 'Fecha',
          AMOUNT: 'Monto',
          BALANCE: 'Balance',
          EMAIL: 'Email',
          PASSWORD: 'Contraseña',
          FROM: 'Desde',
          TO: 'Hasta',
          INFLATION: 'Inflación',
          FIXED_RATE: 'Tasa',
          COUNTRY: 'País',
          INCOME: 'Entrada de dinero'
        },
        ERROR: {
          REQUIRED: 'Este campo es requerido',
          MIN: 'El valor debe ser mayor a ',
          EMAIL: 'Email inválido'
        }
      }
    }
  }
};
