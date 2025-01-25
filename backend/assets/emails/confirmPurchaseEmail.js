import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import React from 'react';
import {
	Head,
	Html,
	Preview,
	Text,
	Font,
	Section,
	Hr,
	Link,
	Row,
} from '@react-email/components';
import EmailComponent from './emailComponent.js';
// Localization data
const localizationData = {
	en: {
		preview: 'We have successfully confirmed your purchase.',
		greeting: 'Hi',
		content: {
			text: [
				'We have confirmed that you have bought our {program} program event. ',
				'Thank you for joining us on this journey, we are thrilled to have you here with us! You can acquire the initial content through an email we will send you 10 days before the event starts.',
				"Don't forget that the event you have purchased will start on {startDate} and end on {endDate} dates.",
			],
			ternary: [
				'You can view the location of the event with this link.',
				'The event will be held on Zoom, the meeting link will be sent to you between 1-3 days before the event starts through e-mail.',
			],
		},
		regards: ['Best regards,', 'Team'],
		contact: ["If you're having a trouble", ' contact us through this link.'],
	},
	tr: {
		preview: 'Başarıyla bir ödemenizi aldık.',
		greeting: 'Merhaba',
		content: {
			text: [
				'{program} programı etkinliğimize katıldığınızı başarıyla doğruladık! ',
				'Bize bu yolculukta katıldığınız için çok heyecanlıyız, sizi aramızda görmek çok hoş! Ödeme doğrulamasının ardından ön içeriklere size etkinlikten 10 gün önce yollayacağımız mail üzerinden ulaşabileceksiniz. ',
				'Satın almış olduğunuz etkinliğin {startDate} ila {endDate} tarihleri arasında gerçekleştirileceğini unutmayınız.',
			],
			ternary: [
				'Lokasyonu görüntülemek için tıklayınız.',
				'Etkinlik Zoom üzerinden gerçekleştirilecek, toplantı linki etkinliğin başlama tarihinden 1 ila 3 gün önce e-mail yoluyla gönderilecektir.',
			],
		},
		regards: ['İyi dileklerimizle,', 'Takımı'],
		contact: [
			'Eğer bir sorun yaşıyorsanız bize',
			' bu link üzerinden ulaşabilirsiniz.',
		],
	},
};
// Styles
const styles = {
	titleText: {
		color: '#2d3748',
		fontSize: '24px',
		marginBottom: '0px',
	},
	button: {
		padding: '1rem 1.7rem',
		borderRadius: '6px',
		backgroundColor: '#2d3748',
		color: 'white',
		margin: '1rem 0px',
	},
	line: {
		margin: '1rem 0px',
	},
};
// Component to add word break opportunities to long links
const AddWbr = ({ link }) => {
	const modifiedText = link
		.split('')
		.map((char, index) =>
			_jsxs(React.Fragment, { children: [char, _jsx('wbr', {})] }, index)
		);
	return _jsx(Link, { href: link, children: modifiedText });
};
export default function PurchaseConfirmationEmail({
	language = 'en',
	name,
	surname,
	program,
	startDate,
	endDate,
	url = { myProgramsUrl: '', contactUrl: '' },
	online,
	location,
}) {
	// Select localization based on language, default to English
	const local = localizationData[language] || localizationData['en'];
	// Helper function to replace placeholders in text
	const formatText = (text) =>
		text
			.replace('{program}', program)
			.replace('{startDate}', startDate)
			.replace('{endDate}', endDate);
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
						_jsx(Row, {
							children: _jsxs(Text, {
								style: styles.titleText,
								children: [local.greeting, ' ', name, ' ', surname, ' !'],
							}),
						}),
						_jsx(Row, {
							children: _jsxs(Text, {
								children: [
									formatText(local.content.text[0]),
									formatText(local.content.text[1]),
									formatText(local.content.text[2]),
								],
							}),
						}),
						_jsx(Row, {
							children: online
								? _jsx(Text, { children: local.content.ternary[1] })
								: location
								? _jsx(Link, {
										href: `https://maps.google.com/maps?q=${location[0]},${location[1]}`,
										children: local.content.ternary[0],
								  })
								: null,
						}),
						_jsx(Hr, { style: styles.line }),
						_jsx(Row, {
							children: _jsxs(Text, {
								children: [
									local.regards[0],
									_jsx('br', {}),
									'Performance Fitness Academy ',
									local.regards[1],
								],
							}),
						}),
						_jsx(Row, {
							children: _jsxs(Text, {
								children: [
									local.contact[0],
									_jsx(Link, {
										href: url.contactUrl,
										children: local.contact[1],
									}),
								],
							}),
						}),
					],
				}),
			}),
		],
	});
}
