import React from 'react';
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
  Column 
} from '@react-email/components';

import EmailComponent from './componentTest';

// Define interfaces for the data structures
interface EmailLocalization {
  preview: string;
  greeting: string;
  content: {
    text: string[];
    ternary: string[];
  };
  regards: string[];
  contact: string[];
}

// Style types
interface StyleObject {
  [key: string]: React.CSSProperties;
}

// Localization data
const localizationData: Record<string, EmailLocalization> = {
  en: {
    preview: 'We have successfully confirmed your purchase.',
    greeting: 'Hi',
    content: {
      text: [
        'We have confirmed that you have bought our {program} program event. ',
        'Thank you for joining us on this journey, we are thrilled to have you here with us! Now that we have confirmed the transaction you can acquire the initial content we have provided through the ',
        ' my courses page',
        '.',
        "Don't forget that the event you have purchased will start on {startDate} and end on {endDate} dates.",
      ],
      ternary: [
        'You can view the location of the event with this link.',
        'The event will be held on Zoom, the meeting link will be sent to you between 1-3 days before the event starts through e-mail.',
      ],
    },
    regards: ['Best regards,', 'Team'],
    contact: ["If you're having a trouble", ' contact us through this link.'],
  },
  tr: {
    preview: 'Başarıyla bir ödemenizi aldık.',
    greeting: 'Merhaba',
    content: {
      text: [
        '{program} programı etkinliğimize katıldığınızı başarıyla doğruladık! ',
        'Bize bu yolculukta katıldığınız için çok heyecanlıyız, sizi aramızda görmek çok hoş! Ödeme doğrulamasının ardından ön içeriklere ',
        'kurslarım',
        ' sayfasından ulaşabilirsiniz',
        'Satın almış olduğunuz etkinliğin {startDate} ila {endDate} tarihleri arasında gerçekleştirileceğini unutmayınız.',
      ],
      ternary: [
        'Lokasyonu görüntülemek için tıklayınız.',
        'Etkinlik Zoom üzerinden gerçekleştirilecek, toplantı linki etkinliğin başlama tarihinden 1 ila 3 gün önce e-mail yoluyla gönderilecektir.',
      ],
    },
    regards: ['İyi dileklerimizle,', 'Takımı'],
    contact: [
      'Eğer bir sorun yaşıyorsanız bize',
      ' bu link üzerinden ulaşabilirsiniz.',
    ],
  },
};

// Styles
const styles: StyleObject = {
  titleText: {
    color: '#2d3748',
    fontSize: '24px',
    marginBottom: '0px',
  },
  button: {
    padding: '1rem 1.7rem',
    borderRadius: '6px',
    backgroundColor: '#2d3748',
    color: 'white',
    margin: '1rem 0px',
  },
  line: {
    margin: '1rem 0px',
  },
};

// Component to add word break opportunities to long links
const AddWbr: React.FC<{ link: string }> = ({ link }) => {
  const modifiedText = link.split('').map((char, index) => (
    <React.Fragment key={index}>
      {char}
      <wbr />
    </React.Fragment>
  ));

  return <Link href={link}>{modifiedText}</Link>;
};

// Main Email Component
interface PurchaseConfirmationEmailProps {
  language?: 'en' | 'tr';
  name: string;
  surname: string;
  program: string;
  startDate: string;
  endDate: string;
url: {
    myProgramsUrl: string;
    contactUrl: string;
  };
  online: boolean;
  location?: [number, number];
}

export default function PurchaseConfirmationEmail({
  language = 'en', 
  name,
  surname,
  program, 
  startDate,
  endDate, 
  url = { myProgramsUrl: '', contactUrl: '' }, 

  online, 
  location,
}: PurchaseConfirmationEmailProps): React.ReactElement {
  // Select localization based on language, default to English

  console.log('url', url);
  console.log('url myprograms', url.myProgramsUrl);
  console.log('url contactUrl', url.contactUrl);
  
  const local = localizationData[language] || localizationData['en'];

  // Helper function to replace placeholders in text
  const formatText = (text: string) => 
    text.replace('{program}', program)
        .replace('{startDate}', startDate)
        .replace('{endDate}', endDate);

  return (
    <Html>
      <Head>
        <Font
          fontFamily="Roboto"
          fallbackFontFamily="Verdana"
          webFont={{
            url: 'https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2',
            format: 'woff2',
          }}
          fontWeight={450}
          fontStyle="normal"
        />
      </Head>
      <Preview>{local.preview}</Preview>
      <EmailComponent>
      <Section>
        <Row>
          <Text style={styles.titleText}>
            {local.greeting} {name} {surname} !
          </Text>
        </Row>
        
        <Row>
          <Text>
            {formatText(local.content.text[0])}
            {formatText(local.content.text[1])}
            <Link href={url.myProgramsUrl}>{local.content.text[2]}</Link>
            {local.content.text[3]} {formatText(local.content.text[4])}
          </Text>
        </Row>

        <Row>
          {online ? (
            <Text>{local.content.ternary[1]}</Text>
          ) : location ? (
            <Link href={`https://maps.google.com/maps?q=${location[0]},${location[1]}`}>
              {local.content.ternary[0]}
            </Link>
          ) : null}
        </Row>

        <Hr style={styles.line} />

        <Row>
          <Text>
            {local.regards[0]}
            <br />
            Performance Fitness Academy {local.regards[1]}
          </Text>
        </Row>

        <Row>
          <Text>
            {local.contact[0]}
            <Link href={url.contactUrl}>{local.contact[1]}</Link>
          </Text>
        </Row>
      </Section>
      </EmailComponent>
    </Html>
  );
}