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
import * as React from 'react';
import EmailComponent from '../components/Containers/EmailComponent';
const username = 'baap';
const verifyLink =
	'https://www.trendyol.com/coverzone/kablosuz-karaoke-cift-mikrofon-6-35mm-sahne-performansi-partiler-aktiviteler-amfi-hoparlor-icin-wn06-p-826296697';
const dataEN = {
	preview: 'You have succesfully opened an account.',
	greeting: 'Hi',
	content: {
		text: 'Please click the button below to verify your email address.',
		button: 'Verify Email Adress',
	},
	footer:
		"If you're having trouble clicking the 'Verify Email Address' button, copy and paste the URL below into your web browser:",
};
const dataTR = {
	preview: 'Başarıyla bir hesap oluşturdunuz.',
	greeting: 'Merhaba',
	content: {
		text: 'Lütfen aşağıdaki butona basarak hesabınızı doğrulayın.',
		button: 'Hesabınızı Doğrulayın',
	},
	footer:
		'Eğer butona basmakta sorun yaşıyorsanız bu linki kopyalayıp tarayıcınıza yapıştırabilirsiniz: ',
};
const local = dataEN;
// const linkLineBreaked = () => {
// 	const updatedLink = verifyLink.replace(/./g, '$&<wbr/>');
// 	console.log(updatedLink);
// 	return updatedLink;
// }; //when doing it like this the wbr tag doesntt work because it becomes string
function AddWbr() {
	const modifiedText = verifyLink.split('').map((char, index) => (
		<React.Fragment key={index}>
			{char}
			<wbr />
		</React.Fragment> //for not having unnecessary nodes, basically <></> but with key
	));

	return <Link href={verifyLink}>{modifiedText}</Link>;
}
export default function verificationEmail() {
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
					<Row>
						<Text style={titleText}>
							{local.greeting} {username}!
						</Text>
					</Row>
					<Row>
						<Text>{local.content.text}</Text>
					</Row>
					<Row>
						<Column align='center'>
							<Button href={verifyLink} style={button}>
								{local.content.button}
							</Button>
						</Column>
					</Row>
				</Section>
				<Hr style={line} />
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
const line = {
	margin: '1rem 0px',
};
