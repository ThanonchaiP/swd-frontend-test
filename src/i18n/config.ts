import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import { translationEn } from "./translations/en";
import { translationTh } from "./translations/th";

i18n.use(initReactI18next).init({
  lng: "en",
  fallbackLng: "en",
  interpolation: { escapeValue: false },
  resources: {
    en: { translation: translationEn },
    th: { translation: translationTh },
  },
});
