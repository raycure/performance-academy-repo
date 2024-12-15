import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import {
	Head,
	Html,
	Preview,
	Text,
	Font,
	Section,
} from '@react-email/components';
import EmailComponent from './emailComponent.js';
const localizationData = {
	en: {
		preview: 'We have received your message.',
		greeting: 'Hi',
		content: [
			"Thank you for contacting Performance Fitness Academy. We have received your message and wanted to let you know that our team is reviewing it. We will respond to you within 5 business days. If we require any additional information to assist you, we'll be sure to get in touch.",
			'Thank you for your patience and understanding.',
		],
		regards: ['Best regards,', 'Team'],
	},
	tr: {
		preview: 'Mesajınızı aldık.',
		greeting: 'Merhaba',
		content: [
			'Performance Fitness Academy ile iletişime geçtiğiniz için teşekkür ederiz. Mesajınızı aldık ve ekibimizin konuyu incelediğini size bildirmek isteriz. Size 5 iş günü içinde yanıt vereceğiz. Size yardımcı olabilmemiz için ek bir bilgiye ihtiyaç duyarsak, sizinle iletişime geçeceğiz.',
			'Sabır ve anlayışınız için teşekkür ederiz.',
		],
		regards: ['İyi dileklerimizle,', 'Takımı'],
	},
};
const titleText = {
	color: '#2d3748',
	fontSize: '24px',
	marginBottom: '0px',
};
export default function contactConfirmationEmail({
	language = 'en',
	name,
	surname,
}) {
	const local = localizationData[language] || localizationData['en'];
	return _jsxs(Html, {
		children: [
			_jsx(Head, {
				children: _jsx(Font, {
					fontFamily: 'Roboto',
					fallbackFontFamily: 'Verdana',
					webFont: {
						url: 'https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2',
						format: 'woff2',
					},
					fontWeight: 450,
					fontStyle: 'normal',
				}),
			}),
			_jsx(Preview, { children: local.preview }),
			_jsx(EmailComponent, {
				children: _jsxs(Section, {
					children: [
						_jsxs(Text, {
							style: titleText,
							children: [local.greeting, ' ', name, ' ', surname, '!'],
						}),
						_jsx(Text, { children: local.content[0] }),
						_jsx(Text, { children: local.content[1] }),
						_jsxs(Text, {
							children: [
								local.regards[0],
								_jsx('br', {}),
								'Performance Fitness Academy ',
								local.regards[1],
							],
						}),
					],
				}),
			}),
		],
	});
}
