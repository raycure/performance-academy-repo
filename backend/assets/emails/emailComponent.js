import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { Body, Container, Img, Text } from '@react-email/components';
export default function EmailComponent({ children }) {
	const year = new Date().getFullYear();
	return _jsxs(Body, {
		style: main,
		children: [
			_jsx(Container, {
				children: _jsx(Img, {
					alt: 'Lesmills Logo',
					src: 'https://www.canstarblue.co.nz/wp-content/uploads/2017/05/les-mills-logo.png',
					width: '250',
					style: logo,
				}),
			}),
			_jsx(Container, { style: innerContainer, children: children }),
			_jsx(Container, {
				style: footer,
				children: _jsxs(Text, {
					children: [
						'\u00A9',
						year,
						' Performance Academy. All rights reserved.',
					],
				}),
			}),
		],
	});
}
const main = {
	backgroundColor: '#eeeef3',
	color: '#737f8d',
	fontSize: '16px',
};
const innerContainer = {
	backgroundColor: 'white',
	maxWidth: '700px',
	borderRadius: '8px',
	marginTop: '1rem',
	marginBottom: '1rem',
	overflow: 'hidden',
	padding: '2rem',
};
const logo = {
	margin: '0px auto',
};
const footer = {
	maxWidth: '650px',
	marginTop: '1rem',
	marginBottom: '1rem',
	color: '#a6aeb7',
	textAlign: 'center',
};
