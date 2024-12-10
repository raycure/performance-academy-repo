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
// import EmailComponent from '../../../src/components/Containers/EmailComponent.jsx';

// Define interfaces for data structure
interface EmailLocalization {
  preview: string;
  greeting: string;
  content: {
    text: string;
    button: string;
  };
  footer: string;
}

// Style types
interface StyleObject {
  [key: string]: React.CSSProperties;
}

const username: string = 'baap';
const verifyLink: string = 'https://www.trendyol.com/coverzone/kablosuz-karaoke-cift-mikrofon-6-35mm-sahne-performansi-partiler-aktiviteler-amfi-hoparlor-icin-wn06-p-826296697';

const dataEN: EmailLocalization = {
  preview: 'You have successfully opened an account.',
  greeting: 'Hi',
  content: {
    text: 'Please click the button below to verify your email address.',
    button: 'Verify Email Address',
  },
  footer:
    "If you're having trouble clicking the 'Verify Email Address' button, copy and paste the URL below into your web browser:",
};

const dataTR: EmailLocalization = {
  preview: 'Başarıyla bir hesap oluşturdunuz.',
  greeting: 'Merhaba',
  content: {
    text: 'Lütfen aşağıdaki butona basarak hesabınızı doğrulayın.',
    button: 'Hesabınızı Doğrulayın',
  },
  footer:
    'Eğer butona basmakta sorun yaşıyorsanız bu linki kopyalayıp tarayıcınıza yapıştırabilirsiniz: ',
};

const local: EmailLocalization = dataEN;

const AddWbr: React.FC = () => {
  const modifiedText = verifyLink.split('').map((char, index) => (
    <React.Fragment key={index}>
      {char}
      <wbr />
    </React.Fragment>
  ));

  return <Link href={verifyLink}>{modifiedText}</Link>;
};

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

export default function VerificationEmail(): React.ReactElement {
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
      {/* <EmailComponent> */}
        <Section>
          <Row>
            <Text style={styles.titleText}>
              {local.greeting} {username}!
            </Text>
          </Row>
          <Row>
            <Text>{local.content.text}</Text>
          </Row>
          <Row>
            <Column align="center">
              <Button href={verifyLink} style={styles.button}>
                {local.content.button}
              </Button>
            </Column>
          </Row>
        </Section>
        <Hr style={styles.line} />
        <Section>
          <Text>
            {local.footer} <AddWbr />
          </Text>
        </Section>
      {/* </EmailComponent> */}
    </Html>
  );
}