// import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
// import React from 'react';
// import {
// 	Head,
// 	Html,
// 	Preview,
// 	Text,
// 	Font,
// 	Section,
// 	Hr,
// 	Link,
// 	Row,
// } from '@react-email/components';
// import EmailComponent from './EmailComponent';
// // Localization data
// const localizationData = {
// 	en: {
// 		preview: 'Your event link.',
// 		greeting: 'Hello',
// 		content: {
// 			text: 'Thank you for registering for the {program} program event. We are excited to have you join us! Please ensure that you log in a few minutes early to avoid any technical issues.',
// 			details: [
// 				'Dates: {startDate} - {endDate}',
// 				'Time: {eventTime}',
// 				'Zoom Meeting Link: {zoomLink}',
// 			],
// 		},
// 		regards: ['Best regards,', 'The Team'],
// 		contact: [
// 			'If you are experiencing any issues, you can reach us',
// 			' through this link.',
// 		],
// 	},
// 	tr: {
// 		preview: 'Etkinlik bağlantınız.',
// 		greeting: 'Merhaba',
// 		content: {
// 			text: '{program} etkinliğine kayıt olduğunuz için teşekkür ederiz. Sizi aramızda görmekten mutluluk duyuyoruz! Teknik aksaklıkları önlemek için birkaç dakika erken giriş yapmanızı öneririz.',
// 			details: [
// 				'Tarihler: {startDate} - {endDate}',
// 				'Saat: {eventTime}',
// 				'Zoom Toplantı Bağlantısı: {zoomLink}',
// 			],
// 		},
// 		regards: ['İyi dileklerimizle,', 'Takımı'],
// 		contact: [
// 			'Eğer bir sorun yaşıyorsanız bize',
// 			' bu link üzerinden ulaşabilirsiniz.',
// 		],
// 	},
// };
// // Styles
// const styles = {
// 	titleText: {
// 		color: '#2d3748',
// 		fontSize: '24px',
// 		marginBottom: '0px',
// 	},
// 	button: {
// 		padding: '1rem 1.7rem',
// 		borderRadius: '6px',
// 		backgroundColor: '#2d3748',
// 		color: 'white',
// 		margin: '1rem 0px',
// 	},
// 	line: {
// 		margin: '1rem 0px',
// 	},
// };

// export default function EventPlatform({
// 	language = 'en',
// 	name,
// 	surname,
// 	program,
// 	startDate,
// 	endDate,
// 	eventTime,
// 	zoomId,
// 	zoomPassword,
// 	url = { contactUrl: '', zoomLink: '' },
// }) {
// 	// Select localization based on language, default to English
// 	console.log('url', url);
// 	const local = localizationData[language] || localizationData['tr'];
// 	const formattedZoomLink = url.zoomLink.split('').map((char, index) => (
// 		<React.Fragment key={index}>
// 			{char}
// 			<wbr />
// 		</React.Fragment>
// 	));
// 	// Helper function to replace placeholders in text
// 	const formatText = (text) =>
// 		text
// 			.replace('{program}', program)
// 			.replace('{startDate}', startDate)
// 			.replace('{endDate}', endDate)
// 			.replace('{eventTime}', eventTime)
// 			.replace('{zoomLink}', formattedZoomLink);
// 	return _jsxs(Html, {
// 		children: [
// 			_jsx(Head, {
// 				children: _jsx(Font, {
// 					fontFamily: 'Roboto',
// 					fallbackFontFamily: 'Verdana',
// 					webFont: {
// 						url: 'https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2',
// 						format: 'woff2',
// 					},
// 					fontWeight: 450,
// 					fontStyle: 'normal',
// 				}),
// 			}),
// 			_jsx(Preview, { children: local.preview }),
// 			_jsx(EmailComponent, {
// 				children: _jsxs(Section, {
// 					children: [
// 						_jsx(Row, {
// 							children: _jsxs(Text, {
// 								style: styles.titleText,
// 								children: [local.greeting, ' ', name, ' ', surname, ' !'],
// 							}),
// 						}),
// 						_jsx(Row, {
// 							children: _jsxs(Text, {
// 								children: [formatText(local.content.text)],
// 							}),
// 						}),
// 						_jsx(Row, {
// 							children: [
// 								...local.content.details.map(
// 									(detail, index) =>
// 										_jsx(
// 											Text,
// 											{
// 												children: formatText(detail),
// 											},
// 											index
// 										) // Use index as the unique key
// 								),
// 							],
// 						}),
// 						_jsx(Hr, { style: styles.line }),
// 						_jsx(Row, {
// 							children: _jsxs(Text, {
// 								children: [
// 									local.regards[0],
// 									_jsx('br', {}),
// 									'Performance Fitness Academy ',
// 									local.regards[1],
// 								],
// 							}),
// 						}),
// 						_jsx(Row, {
// 							children: _jsxs(Text, {
// 								children: [
// 									local.contact[0],
// 									_jsx(Link, {
// 										href: url.contactUrl,
// 										children: local.contact[1],
// 									}),
// 								],
// 							}),
// 						}),
// 					],
// 				}),
// 			}),
// 		],
// 	});
// }
