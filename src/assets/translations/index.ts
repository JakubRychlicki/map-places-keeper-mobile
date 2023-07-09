import en from './en_ENG';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en,
};

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  fallbackLng: 'dev',
  lng: 'en',
  resources,
});

export default i18n;
