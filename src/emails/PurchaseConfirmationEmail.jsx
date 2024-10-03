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
const dataEN = {
	preview: 'You have succesfully purchased an event from us.',
	greeting: 'Hi',
	content: {
		text: [
			`We have confirmed that you have bought our ${program} program! `,
			"You will receive a new lesson video every 3 months so don't forgetto regularly check the new content out!",
		],
		ternary: [
			"We are working on activating your account on our Les Mills Releases App for you to use on your phone. When your account is activated you will receive a confirmation email regarding that. If you don't receive one in 5 business days feel free to",
			"We are working on activating the event on your account in our Les Mills Releases App. When the event is activated on your account you will receive a confirmation email regarding that. If you don't receive one in 5 business days feel free to",
		],
		contact: ' contact us through this link',
	},
	footer: [
		'Les Mills Releases App for Android',
		'Les Mills Releases App for IOS',
	],
};
const dataTR = {
	preview: '',
	greeting: '',
	content: {
		text: [],
		ternary: [,],
		contact: '',
	},
	footer: [],
};
const local = dataEN;
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
			<Preview>{local.preview}</Preview>
			<EmailComponent>
				<Section>
					<Text style={titleText}>
						{local.greeting} {username}!
					</Text>
					<Text>
						{local.content.text[0]}
						{firstPurchase ? (
							<>
								{local.content.ternary[0]}
								{<Link href=''>{local.content.contact}</Link>}!
							</>
						) : (
							<>
								{local.content.ternary[1]}
								{<Link href=''>{local.content.contact}</Link>}!
							</>
						)}{' '}
						{local.content.text[1]}
					</Text>
				</Section>
				<Hr />
				<Section>
					<Row>
						<Link href='https://play.google.com/store/apps/details?id=nz.co.lmidigital&hl=en&pli=1'>
							{local.footer[0]}
						</Link>
					</Row>
					<Row>
						<Link href='https://apps.apple.com/us/app/les-mills-releases/id1205725378'>
							{local.footer[1]}
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
