import { LANGUAGE } from '@bizy/services';

export const locale = {
  lang: LANGUAGE.SPANISH,
  translations: {
    DASHBOARD: {
      TITLE: 'Panel general',
      GENERAL_PROFIT: {
        TITLE: 'Rendimiento general ($)',
        ACCOUNT: 'Cuenta',
        INFLATION: 'Inflación',
        FIXED_RATE: 'Plazo fijo'
      },
      MONTH_PROFIT: {
        TITLE: 'Rendimiento mensual (%)',
        ACCOUNT: 'Cuenta'
      },
      DOLLAR_PROFIT: {
        TITLE: 'Rendimiento en dolares (CCL)',
        ACCOUNT: 'Cuenta'
      },
      INFLATION: {
        TITLE: 'Inflación (%)'
      },
      FIXED_RATE: {
        TITLE: 'Tasa de interés (%)'
      },
      DOLLAR_RATE: {
        TITLE: 'Dolar oficial x Dolar CCL',
        OFFICIAL: 'Oficial',
        CCL: 'CCL'
      }
    }
  }
};
