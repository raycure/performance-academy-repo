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
	Column,
	Button,
} from '@react-email/components';
import * as React from 'react';
import EmailComponent from '../components/Containers/EmailComponent';
const username = 'beep';
const passResetLink =
	'https://www.trendyol.com/coverzone/kablosuz-karaoke-cift-mikrofon-6-35mm-sahne-performansi-partiler-aktiviteler-amfi-hoparlor-icin-wn06-p-826296697';
function AddWbr() {
	const modifiedText = passResetLink.split('').map((char, index) => (
		<React.Fragment key={index}>
			{char}
			<wbr />
		</React.Fragment>
	));

	return <Link href={passResetLink}>{modifiedText}</Link>;
}
export default function Email() {
	return (
		<Html>
			<Head>
				<Font
					fontFamily='Roboto'
					fallbackFontFamily='Verdana'
					webFont={{
						url: 'https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2',
						format: 'woff2',
					}}
					fontWeight={450}
					fontStyle='normal'
				/>
			</Head>
			<Preview>You have requested to change your password.</Preview>
			<EmailComponent>
				<Section>
					<Text style={titleText}>Hi {username}!</Text>
					<Text>
						To change your password, click the button below. <br /> Please
						remember that this doesn't change your password in the Les Mills
						Releases App.
					</Text>
					<Row>
						<Column align='center'>
							<Button href={passResetLink} style={button}>
								Reset Password
							</Button>
						</Column>
					</Row>
				</Section>
				<Hr />
				<Section>
					<Text>
						If you're having trouble clicking the "Reset Password" button, copy
						and paste the URL below into your web browser: {AddWbr()}
					</Text>
				</Section>
			</EmailComponent>
		</Html>
	);
}
const titleText = {
	color: '#2d3748',
	fontSize: '24px',
	marginBottom: '0px',
};
const button = {
	padding: '1rem 1.7rem',
	borderRadius: '6px',
	backgroundColor: '#2d3748',
	color: 'white',
	margin: '1rem 0px',
};
