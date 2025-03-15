import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import English from "../assets/locales/en.json";
import Greek from "../assets/locales/gr.json";

i18n
    .use(initReactI18next)
    .use(LanguageDetector)
    .init({
        resources: {
            en: {
                translation: English
            },
            gr: {
                translation: Greek
            }
        },
        debug: true,
        fallbackLng: "en",
        interpolation: {
            escapeValue: false
        }
    });