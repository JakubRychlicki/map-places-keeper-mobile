import en from './en_ENG';
import pl from './pl_PL';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { getLocales } from 'react-native-localize';

const resources = {
  en,
  pl,
};

const setCurrentLanguage = () => {
  const deviceLanguages = getLocales();

  for (let lang of deviceLanguages) {
    if (lang.languageCode === 'pl') {
      return 'pl';
    }

    return 'en';
  }
};

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  fallbackLng: 'dev',
  lng: setCurrentLanguage(),
  resources,
});

export default i18n;
