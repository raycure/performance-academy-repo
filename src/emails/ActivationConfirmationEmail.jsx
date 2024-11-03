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
const type = 'account';
const dataEN = {
	preview: `Your ${
		type === 'account' ? 'account ' : 'event '
	}has been activated.`,
	greeting: 'Hi',
	content: {
		ternary: ['Your account ', `The ${program} event on your account `],
		text: `has been succesfully activated! You can now use the Les Mills
					Releases App to watch and go through the lesson content any time you
					want to.\nIf you're having problems feel free to`,
		contact: ' contact us through this link',
	},
	footer: [' App for Android', ' App for IOS'],
};
const dataTR = {
	preview: `${
		type === 'account' ? 'Hesabınız ' : 'Hesabınızdaki etkinlik '
	}aktive edildi.`,
	greeting: 'Merhaba',
	content: {
		ternary: ['Hesabınız', `Aldığınız ${program} etkinliği hesabınızda`],
		text: `başarıyla aktive edilmiştir! Les Mills Releases uygulaması ile
		 almış olduğunuz etkinlik içeriğine istediğiniz zaman ulaşabilirsiniz.\nEğer bir sorun yaşıyorsanız`,
		contact: 'bu link üzerinden bize ulaşabilirsiniz',
	},
	footer: [' IOS Uygulaması', ' Android Uygulaması'],
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
						{firstPurchase ? (
							<>{local.content.ternary[0]}</>
						) : (
							<>{local.content.ternary[1]}</>
						)}
						{local.content.text}
						{<Link href=''>{local.content.contact}</Link>}!
					</Text>
				</Section>
				<Hr />
				<Section>
					<Row>
						<Link href='https://play.google.com/store/apps/details?id=nz.co.lmidigital&hl=en&pli=1'>
							Les Mills Releases{local.footer[0]}
						</Link>
					</Row>
					<Row>
						<Link href='https://apps.apple.com/us/app/les-mills-releases/id1205725378'>
							Les Mills Releases{local.footer[1]}
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
