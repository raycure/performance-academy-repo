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
const dataEN = {
	preview: 'You have requested to change your password.',
	greeting: 'Hi',
	content: {
		text: `To change your password, click the button below.\nPlease
					remember that this doesn't change your password in the Les Mills
					Releases App.`,
		button: 'Reset Password',
	},
	footer:
		"If you're having trouble clicking the 'Reset Password' button, copy and paste the URL below into your web browser: ",
};
const dataTR = {
	preview: 'Parolanızı değiştirmeyi talep ettiniz.',
	greeting: 'Merhaba',
	content: {
		text: `Parolanızı değiştirmek için aşağıdaki butona basınız.\n
		Sitemizde kullandığınız bu parolayı değiştirmenin,
			 Les Mills Releases uygulamasındaki hesabınızın parolasını değiştirmediğini lütfen unutmayınız.`,
		button: 'Parolamı Değiştir',
	},
	footer:
		'Eğer butona basmakta sorun yaşıyorsanız bu linki kopyalayıp tarayıcınıza yapıştırabilirsiniz: ',
};
const local = dataEN;
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
			<Preview>{local.preview}</Preview>
			<EmailComponent>
				<Section>
					<Text style={titleText}>
						{local.greeting} {username}!
					</Text>
					<Text>{local.content.text}</Text>
					<Row>
						<Column align='center'>
							<Button href={passResetLink} style={button}>
								{local.content.button}
							</Button>
						</Column>
					</Row>
				</Section>
				<Hr />
				<Section>
					<Text>
						{local.footer} {AddWbr()}
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
