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
			`We have confirmed that you have bought our ${program} program event! `,
			"You will receive new lesson content every 3 months so don't forget to regularly check the new content out!",
		],
		ternary: [
			"We are working on activating your account on our Les Mills Releases App for you to use on your phone. When your account is activated you will receive a confirmation email regarding that. If you don't receive one in 5 business days feel free to",
			"We are working on activating the event on your account in our Les Mills Releases App. When the event is activated on your account you will receive a confirmation email regarding that. If you don't receive one in 5 business days feel free to",
		],
		contact: ' contact us through this link',
		text2: `You can access the ${program} event opening video in the "my courses" section on our website!`,
	},
	footer: [' App for Android', ' App for IOS'],
};
const dataTR = {
	preview: 'Başarıyla bir etkinliğimize katıldınız.',
	greeting: 'Merhaba',
	content: {
		text: [
			`${program} programı etkinliğimize katıldığınızı başarıyla doğruladık! `,
			'Her 3 ayda bir bu program için yeni içeriklere ulaşabileceksiniz, bu sebeple düzenli olarak uygulamamızı kontrol etmeyi unutmayın!',
		],
		ternary: [
			'Les Mills Releases uygulamamızı kullanabilmeniz için hesabınızı akifleştirmeye çalışıyoruz. Hesabınız aktifleştirildiğinde bir aktivasyon maili alacaksınız. Eğer 5 iş günü içerisinde bu maili alamazsanız bize ',
			'Les Mills Releases uygulamamızda hesabınız için bu etkinliği akifleştirmeye çalışıyoruz. Etkinlik aktifleştirildiğinde bir aktivasyon maili alacaksınız. Eğer 5 iş günü içerisinde bu maili alamazsanız bize ',
		],
		contact: 'bu link üzerinden ulaşabilirsiniz!',
		text2: `Şimdiden sitemizde bulunan "kurslarım" bölümünden ${program} etkinliğimizin açılış videosunu izleyebilirsiniz!`,
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
					<Text>{local.content.text2}</Text>
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
