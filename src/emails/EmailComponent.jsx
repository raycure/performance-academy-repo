import { Body, Container, Img, Text } from '@react-email/components';
import * as React from 'react';
export default function EmailComponent({ children }) {
	const year = new Date().getFullYear();
	return (
		<Body style={main}>
			<Container>
				<Img
					alt='Lesmills Logo'
					src='https://www.canstarblue.co.nz/wp-content/uploads/2017/05/les-mills-logo.png'
					width='250'
					style={logo}
				/>
			</Container>
			<Container style={innerContainer}>{children}</Container>
			<Container style={footer}>
				<Text>©{year} Performance Academy. All rights reserved.</Text>
			</Container>
		</Body>
	);
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
