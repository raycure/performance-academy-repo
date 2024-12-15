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
  Column,
} from '@react-email/components';
import EmailComponent from './componentTest.js';

// Define interfaces for data structure
interface EmailLocalization {
  preview: string;
  greeting: string;
  content: {
    text: string;
    button: string;
  };
  regards: string[];
  footer: string;
}

// Style types
interface StyleObject {
  [key: string]: React.CSSProperties;
}

// Localization data
const localizationData: Record<string, EmailLocalization> = {
  en: {
    preview: 'You have requested to change your password.',
    greeting: 'Hi',
    content: {
      text: 'To change your password, click the button below.',
      button: 'Reset Password',
    },
    regards: ['Best regards,', 'Team'],
    footer: "If you're having trouble clicking the 'Reset Password' button, copy and paste the URL below into your web browser: ",
  },
  tr: {
    preview: 'Parolanızı değiştirmeyi talep ettiniz.',
    greeting: 'Merhaba',
    content: {
      text: 'Parolanızı değiştirmek için aşağıdaki butona basınız.',
      button: 'Parolamı Değiştir',
    },
    regards: ['İyi dileklerimizle,', 'Takımı'],
    footer: 'Eğer butona basmakta sorun yaşıyorsanız bu linki kopyalayıp tarayıcınıza yapıştırabilirsiniz: ',
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
interface ForgotPasswordEmailProps {
  language?: 'en' | 'tr';
  name: string;
  surname: string;
  passwordResetLink: 'dsafa.com';
}

export default function ForgotPasswordEmail({
  language = 'en',
  name,
  surname,
  passwordResetLink,
}: ForgotPasswordEmailProps): React.ReactElement {
  // Select localization based on language, default to English
  const local = localizationData[language] || localizationData['en'];

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
              {local.greeting} {name} {surname}!
            </Text>
          </Row>
          <Row>
            <Text>{local.content.text}</Text>
          </Row>
          <Row>
            <Column align="center">
              <Button href={passwordResetLink} style={styles.button}>
                {local.content.button}
              </Button>
            </Column>
          </Row>
          <Row>
            <Text>
              {local.regards[0]} <br />
              Performance Fitness Academy {local.regards[1]}
            </Text>
          </Row>
        </Section>
        <Hr style={styles.line} />
        <Section>
          <Text>
            {local.footer} <AddWbr link={passwordResetLink} />
          </Text>
        </Section>
      </EmailComponent>
    </Html>
  );
}