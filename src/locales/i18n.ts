import i18n from 'i18next';
import en from './en.json';
import hi from './hi.json';
import {initReactI18next} from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNLanguageDetector from '@os-team/i18next-react-native-language-detector';

i18n
  .use(RNLanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    resources: {
      en: {translation: en},
      hi: {translation: hi},
    },
    detection: {
      order: ['asyncStorage', 'device'],
      caches: ['asyncStorage'],
      lookupAsyncStorage: 'user-language',
      asyncStorage: AsyncStorage,
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
