import {
	Head,
	Html,
	Preview,
	Text,
	Font,
	Section,
} from '@react-email/components';
import * as React from 'react';
import EmailComponent from './EmailComponent';
const username = 'boop';
const dataEN = {
	preview: 'We have received your message.',
	greeting: 'Hi',
	content: [
		'Thank you for contacting Performance Fitness Academy. We have received your message and wanted to let you know that our team is reviewing it. We will respond to you within 5 business days. If we require any additional information to assist you, we’ll be sure to get in touch.',
		'Thank you for your patience and understanding.',
	],
	regards: ['Best regards,', 'Team'],
};
const dataTR = {
	preview: 'Mesajınızı aldık.',
	greeting: 'Merhaba',
	content: [
		'Performance Fitness Academy ile iletişime geçtiğiniz için teşekkür ederiz. Mesajınızı aldık ve ekibimizin konuyu incelediğini size bildirmek isteriz. Size 5 iş günü içinde yanıt vereceğiz. Size yardımcı olabilmemiz için ek bir bilgiye ihtiyaç duyarsak, sizinle iletişime geçeceğiz.',
		'Sabır ve anlayışınız için teşekkür ederiz.',
	],
	regards: ['İyi dileklerimizle,', 'Takımı'],
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
					<Text>{local.content[0]}</Text>
					<Text>{local.content[1]}</Text>
					<Text>
						{local.regards[0]}
						<br />
						Performance Fitness Academy {local.regards[1]}
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
