import i18n from "i18next";
import { initReactI18next  } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';
import Backend from 'i18next-http-backend';
// npm install i18next react-i18next i18next-browser-languagedetector i18next-http-backend react-cookie
i18n
  .use(initReactI18next) 
  .use(LanguageDetector)
  .use(HttpApi)
  .use(Backend)
  .init({
    supportedLngs:['en','ar'],
    fallbackLng:'ar',
    debug: false,
    detection:{
      order: ['cookie','htmlTag','path','navigator', 'localStorage', 'querystring',  'subdomain'],
      caches:['cookie']
    },
    backend:{
      loadPath: '/assets/locales/{{lng}}/translation.json',
    },
    react: {
      useSuspense: true,
    }
  });

  export default i18n;