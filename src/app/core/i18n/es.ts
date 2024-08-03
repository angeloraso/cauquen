import { LANGUAGE } from '@bizy/services';

export const locale = {
  lang: LANGUAGE.SPANISH,
  translations: {
    CORE: {
      EMPTY: 'Sin elementos',
      MENU: {
        DASHBOARD: 'Panel',
        CASH_FLOW: 'Caja',
        INFO: 'Info',
        CONFIG: 'Config'
      },
      BUTTON: {
        CANCEL: 'Cancelar',
        SAVE: 'Guardar',
        CONFIRM: 'Confirmar',
        DOWNLOAD: 'Descargar'
      },
      COUNTRY: {
        AR: 'Argentina'
      },
      FORM: {
        FIELD: {
          SEARCH: 'Buscar',
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
          INCOME: 'Entrada de dinero',
          DOLLAR: 'Dólar',
          RETAIL_DOLLAR: 'Dólar (minorista)',
          MEP_DOLLAR: 'Dólar (MEP)',
          CCL_DOLLAR: 'Dólar (CCL)',
          CRYPTO_DOLLAR: 'Dólar (Cripto)'
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
