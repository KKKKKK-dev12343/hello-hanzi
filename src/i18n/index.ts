 import i18n from 'i18next'
 import { initReactI18next } from 'react-i18next'
 import en from '../locales/en.json'
 import zh from '../locales/zh.json'
 
 i18n.use(initReactI18next).init({
   resources: { en: { translation: en }, zh: { translation: zh } },
   lng: localStorage.getItem('hellohanzi_lang') || 'en',
   fallbackLng: 'en',
   interpolation: { escapeValue: false },
 })
 
 export function setLanguage(lang: 'en' | 'zh') {
   i18n.changeLanguage(lang)
   localStorage.setItem('hellohanzi_lang', lang)
 }
 
 export default i18n
