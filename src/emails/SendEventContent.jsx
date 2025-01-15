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
import EmailComponent from './EmailComponent';
// Localization data
const localizationData = {
	en: {
		preview: 'Your event content has arrived!',
		greeting: 'Hello',
		content: {
			text: [
				'You can now access the choreography video, instructor guide, music, and program guide for our {program} program event! You need to download the provided content within 7 days, as the link below will become unavailable after this period. ',
				'Click here to download the content!',
				'Please remember that the event you purchased will take place between {startDate} and {endDate}.',
			],
			ternary: [
				'Click here to view the location.',
				'The event will be held via Zoom, and the meeting link will be sent via email 1 to 3 days before the event start date.',
			],
		},
		regards: ['Best regards,', 'The Team'],
		contact: [
			'If you are experiencing any issues, you can reach us',
			' through this link.',
		],
	},
	tr: {
		preview: 'Etkinlik içeriğiniz geldi!',
		greeting: 'Merhaba',
		content: {
			text: [
				'{program} programı etkinliğimizin koreografi videosu, eğitmen kitapçığı, müzikleri ve program kitapçığına artık ulaşabilirsiniz! 7 günlük bir süre içerisinde sağladığımız içerikleri indirmeniz gerekmektedir, bu sürenin sonunda aşağıda bulunan link kullanılamaz hale gelecektir. ',
				'İçerikleri indirmek için tıklayınız!',
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

export default function SendEventContent({
	language = 'en',
	name,
	surname,
	program,
	startDate,
	endDate,
	url = { contactUrl: '', wetransferLink: '' },
	online,
	location,
}) {
	// Select localization based on language, default to English
	console.log('url', url);
	const local = localizationData[language] || localizationData['tr'];
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
									formatText(local.content.text[2]),
								],
							}),
						}),
						_jsx(Row, {
							children: _jsxs(Text, {
								children: [
									_jsx(Link, {
										href: url.wetransferLink,
										children: local.content.text[1],
									}),
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
