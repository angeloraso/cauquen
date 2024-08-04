import { LANGUAGE } from '@bizy/services';

export const locale = {
  lang: LANGUAGE.SPANISH,
  translations: {
    DASHBOARD: {
      TITLE: 'Panel general',
      PROFIT: 'Ganancia acumulada',
      IPC_ADJUST_ACCOUNT_DOLLAR_PROFIT: {
        TITLE: 'Ganancia ajustada por inflación (U$D)',
        RETAIL_DOLLAR: 'Minorista',
        CCL_DOLLAR: 'CCL',
        MEP_DOLLAR: 'MEP',
        CRYPTO_DOLLAR: 'Cripto'
      },
      ACCOUNT_EVOLUTION: {
        TITLE: 'Evolución de cuenta (U$D)',
        RETAIL_ACCOUNT: 'Minorista',
        CCL_ACCOUNT: 'CCL',
        MEP_ACCOUNT: 'MEP',
        CRYPTO_ACCOUNT: 'Cripto'
      },
      INFLATION: {
        TITLE: 'Inflación (%)'
      },
      FIXED_RATE: {
        TITLE: 'Tasa de interés (%)'
      },
      DOLLAR_RATE: {
        TITLE: 'Dolar ($)',
        RETAIL: 'Minorista',
        CCL: 'CCL',
        MEP: 'MEP',
        CRYPTO: 'Cripto'
      }
    }
  }
};
