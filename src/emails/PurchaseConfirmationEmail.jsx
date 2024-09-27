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
			<Preview>You have succesfully purchased an event from us.</Preview>
			<EmailComponent>
				<Section>
					<Text style={titleText}>Hi {username}!</Text>
					<Text>
						We have confirmed that you have bought our {program} program!{' '}
						{firstPurchase ? (
							<>
								We are working on activating your account on our Les Mills
								Releases App for you to use on your phone. When your account is
								activated you will receive a confirmation email regarding that.
								If you don't receive one in 5 business days feel free to
								{<Link href=''> contact us through this link</Link>}!
							</>
						) : (
							<>
								We are working on activating the event on your account in our
								Les Mills Releases App. When the event is activated on your
								account you will receive a confirmation email regarding that. If
								you don't receive one in 5 business days feel free to
								{<Link href=''> contact us through this link</Link>}!
							</>
						)}{' '}
						You will receive a new lesson video every 3 months so don't forget
						to regularly check the new content out!
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
