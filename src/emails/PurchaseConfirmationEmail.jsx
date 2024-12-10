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
} from '@react-email/components';
import * as React from 'react';
import EmailComponent from './EmailComponent';
import { FaGlobeAfrica } from 'react-icons/fa';
const username = 'boop';
const eventdata = {
	startDate: '2024-08-04',
	endDate: '2024-08-06',
	program: 'Body Combat',
	online: true,
	location: [40.7719881790364, -74.07145598632484],
};
const dataEN = {
	preview: 'We have succesfully confirmed your purchase.',
	greeting: 'Hi',
	content: {
		text: [
			`We have confirmed that you have bought our ${eventdata.program} program event. `,
			`Thank you for joining us on this journey, we are thrilled to have you here with us! Now that we have confirmed the transaction you can acquire the initial content we have provided through the `,
			' my courses page',
			'.',
			`Don't forget that the event you have purchased will start on ${eventdata.startDate} and end on ${eventdata.endDate} dates.`,
		],
		ternary: [
			`You can view the location of the event with this link.`,
			`The event will be held on Zoom, the meeting link will be sent to you between 1-3 days before the event starts through e-mail.`,
		],
	},
	regards: ['Best regards,', 'Team'],
	contact: ["If you're having a trouble", ' contact us through this link.'],
};
const dataTR = {
	preview: 'Başarıyla bir ödemenizi aldık.',
	greeting: 'Merhaba',
	content: {
		text: [
			`${eventdata.program} programı etkinliğimize katıldığınızı başarıyla doğruladık! `,
			`Bize bu yolculukta katıldığınız için çok heyecanlıyız, sizi aramızda görmek çok hoş! Ödeme doğrulamasının ardından ön içeriklere `,
			'kurslarım',
			' sayfasından ulaşabilirsiniz',
			`Satın almış olduğunuz etkinliğin ${eventdata.startDate} ila ${eventdata.endDate} tarihleri arasında gerçekleştirileceğini unutmayınız.`,
		],
		ternary: [
			`Lokasyonu görüntülemek için tıklayınız.`,
			'Etkinlik Zoom üzerinden gerçekleştirilecek, toplantı linki etkinliğin başlama tarihinden 1 ila 3 gün önce e-mail yoluyla gönderilecektir.',
		],
	},
	regards: ['İyi dileklerimizle,', 'Takımı'],
	contact: [
		'Eğer bir sorun yaşıyorsanız bize',
		' bu link üzerinden ulaşabilirsiniz.',
	],
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
					<Text>{local.content.text[0]}</Text>
					<Text>
						{local.content.text[1]}
						<Link href='https://infopfa.com/kurslarım'>
							{local.content.text[2]}
						</Link>
						{local.content.text[3]} {local.content.text[4]}
					</Text>
					{local.online ? (
						<Text>{local.content.ternary[1]}</Text>
					) : (
						<Row>
							<Column align='center'>
								<Link
									href={
										'https://maps.google.com?q=' +
										eventdata.location[0] +
										',' +
										eventdata.location[1]
									}
								>
									<FaGlobeAfrica /> {local.content.ternary[0]}
								</Link>
							</Column>
						</Row>
					)}
					<Text>
						{local.regards[0]}
						<br />
						Performance Fitness Academy {local.regards[1]}
					</Text>
				</Section>
				<Hr />
				<Section>
					{local.contact[0]}
					<Link href='https://infopfa.com/iletişim'>{local.contact[1]}</Link>
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
