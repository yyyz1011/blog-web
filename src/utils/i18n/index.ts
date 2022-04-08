import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import cn from "@/utils/i18n/locales/cn";
import en from "@/utils/i18n/locales/en";


const resources = {
  cn: {
    translation: cn,
  },
  en: {
    translation: en,
  },
};

i18n.use(initReactI18next).init({
  resources,
  fallbackLng: "cn",
  detection: {
    caches: ["localStorage", "sessionStorage", "cookie"],
  },
});

export default i18n;
