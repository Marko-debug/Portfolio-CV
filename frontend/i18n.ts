import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import enTranslation from "./public/locales/en/translation.json";
import deTranslation from "./public/locales/de/translation.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    debug: process.env.NODE_ENV === "development",
    interpolation: { escapeValue: false },
    resources: {
      en: { translation: enTranslation },
      de: { translation: deTranslation },
    },
  });

export default i18n;
