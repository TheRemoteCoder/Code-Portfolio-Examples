import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './en-US';

const config = {
  resources: {
    en: { translations: en },
  },
  lng: 'en',
  fallbackLng: 'en',
  debug: false,
  ns: ['translations'],
  defaultNS: 'translations',
  interpolation: {
    escapeValue: false,
    formatSeparator: ',',
  },
  react: {
    useSuspense: true,
  },
};

i18n.use(initReactI18next).init(config);

export default i18n;
