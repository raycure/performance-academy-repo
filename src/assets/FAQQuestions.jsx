import { useTranslation } from 'react-i18next';
function FaqQuestions() {
	const { t, i18n } = useTranslation('faqQuestions');
	const faqQuestions = [
		{
			title: t('question1.title'),
			response: t('question1.response'),
		},
		{
			title: t('question2.title'),
			response: t('question2.response'),
		},
		{
			title: t('question3.title'),
			response: t('question3.response'),
		},
		{
			title: t('question4.title'),
			response: t('question4.response'),
		},
		{
			title: t('question5.title'),
			response: t('question5.response'),
		},
	];
	return faqQuestions;
}
export default FaqQuestions;
