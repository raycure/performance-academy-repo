import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
//import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import translationEN from './locales/en/translation.json';
import translationTR from './locales/tr/translation.json';
import programsEN from './locales/en/programs.json';
import programsTR from './locales/tr/programs.json';
import faqQuestionsEN from './locales/en/faqQuestions.json';
import faqQuestionsTR from './locales/tr/faqQuestions.json';
const resources = {
	en: {
		translation: translationEN,
		faqQuestions: faqQuestionsEN,
		programs: programsEN,
	},
	tr: {
		translation: translationTR,
		faqQuestions: faqQuestionsTR,
		programs: programsTR,
	},
};
i18n
	//.use(Backend)
	.use(LanguageDetector)
	.use(initReactI18next) // passes i18n down to react-i18next
	.init({
		resources,
		fallbackLng: 'en',
		//lng: 'en', // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
		// you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
		// if you're using a language detector, do not define the lng option

		// interpolation: {
		// 	escapeValue: false, // react already safes from xss
		// },
	});

export default i18n;
