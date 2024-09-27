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
import * as React from 'react';
import EmailComponent from '../components/Containers/EmailComponent';
const username = 'boop';
const program = 'Body Combat';
const firstPurchase = true;
export default function Email() {
	const type = 'account';
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
			<Preview>
				Your {type === 'account' ? 'account' : 'event'} has been activated.
			</Preview>
			<EmailComponent>
				<Section>
					<Text style={titleText}>Hi {username}!</Text>
					<Text>
						{firstPurchase ? (
							<>Your account</>
						) : (
							<>The {program} event on your account</>
						)}
						has been succesfully activated! You can now use the Les Mills
						Releases App to watch and go through the lesson content any time you
						want.
						<br />
						If you're having problems free to
						{<Link href=''> contact us through this link</Link>}!
					</Text>
				</Section>
				<Hr />
				<Section>
					<Row>
						<Link href='https://play.google.com/store/apps/details?id=nz.co.lmidigital&hl=en&pli=1'>
							Les Mills Releases App for Android
						</Link>
					</Row>
					<Row>
						<Link href='https://apps.apple.com/us/app/les-mills-releases/id1205725378'>
							Les Mills Releases App for IOS
						</Link>
					</Row>
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
