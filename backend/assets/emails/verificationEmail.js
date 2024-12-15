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
	Button,
	Row,
	Column,
} from '@react-email/components';
import EmailComponent from './emailComponent.js';
// Localization data
const localizationData = {
	en: {
		preview: 'You have successfully opened an account.',
		greeting: 'Hi',
		content: {
			text: 'Please click the button below to verify your email address.',
			button: 'Verify Email Address',
		},
		footer:
			"If you're having trouble clicking the 'Verify Email Address' button, copy and paste the URL below into your web browser:",
	},
	tr: {
		preview: 'Başarıyla bir hesap oluşturdunuz.',
		greeting: 'Merhaba',
		content: {
			text: 'Lütfen aşağıdaki butona basarak hesabınızı doğrulayın.',
			button: 'Hesabınızı Doğrulayın',
		},
		footer:
			'Eğer butona basmakta sorun yaşıyorsanız bu linki kopyalayıp tarayıcınıza yapıştırabilirsiniz: ',
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
export default function VerificationEmail({
	language = 'en',
	name,
	surname,
	verificationLink,
}) {
	// Select localization based on language, default to English
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
			_jsxs(EmailComponent, {
				children: [
					_jsxs(Section, {
						children: [
							_jsx(Row, {
								children: _jsxs(Text, {
									style: styles.titleText,
									children: [local.greeting, ' ', name, ' ', surname, '!'],
								}),
							}),
							_jsx(Row, {
								children: _jsx(Text, { children: local.content.text }),
							}),
							_jsx(Row, {
								children: _jsx(Column, {
									align: 'center',
									children: _jsx(Button, {
										href: verificationLink,
										style: styles.button,
										children: local.content.button,
									}),
								}),
							}),
						],
					}),
					_jsx(Hr, { style: styles.line }),
					_jsx(Section, {
						children: _jsxs(Text, {
							children: [
								local.footer,
								' ',
								_jsx(AddWbr, { link: verificationLink }),
							],
						}),
					}),
				],
			}),
		],
	});
}
