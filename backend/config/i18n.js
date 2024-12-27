import { dirname } from 'path';
import i18n from 'i18n';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
i18n.configure({
	locales: ['en', 'tr'],
	// directory: path.join(__dirname, 'locales'),
	directory: path.join(__dirname, '..', 'locales'),
	defaultLocale: 'en',
	objectNotation: true, // Enables dot notation for nested translations
	updateFiles: false, //When a translation key is accessed but not found, i18n will automatically add it to the file with an empty string as its value. this prevent that happening
	cookie: 'lang',
	register: global,
	logWarnFn: function (msg) {
		console.warn('i18n warning:', msg);
	},
	logErrorFn: function (msg) {
		console.error('i18n error:', msg);
	},
});

export default i18n;
