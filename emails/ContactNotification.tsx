import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
  Link,
} from '@react-email/components';
import * as React from 'react';

interface ContactNotificationEmailProps {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export const ContactNotificationEmail = ({
  name,
  email,
  subject,
  message,
}: ContactNotificationEmailProps) => (
  <Html>
    <Head />
    <Preview>Nouveau message de {name} : {subject}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={header}>
          <Heading style={h1}>Nouveau Contact Entrant</Heading>
        </Section>
        <Section style={content}>
          <Text style={paragraph}>
            <strong>De :</strong> {name} (<Link href={`mailto:${email}`} style={link}>{email}</Link>)
          </Text>
          <Text style={paragraph}>
            <strong>Sujet :</strong> {subject}
          </Text>
          <Hr style={hr} />
          <Text style={messageHeading}>Message :</Text>
          <Section style={messageBox}>
            <Text style={messageText}>{message}</Text>
          </Section>
          <Text style={footer}>
            Ce message a été envoyé via le formulaire de contact de eurinhash.com
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

export default ContactNotificationEmail;

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '0 0 48px',
  marginBottom: '64px',
  borderRadius: '8px',
  overflow: 'hidden' as const,
  border: '1px solid #e5e7eb',
};

const header = {
  backgroundColor: '#000000',
  padding: '32px',
  textAlign: 'center' as const,
};

const h1 = {
  color: '#ffffff',
  fontSize: '20px',
  fontWeight: '800',
  margin: '0',
  textTransform: 'uppercase' as const,
  letterSpacing: '1px',
};

const content = {
  padding: '40px',
};

const paragraph = {
  fontSize: '16px',
  lineHeight: '26px',
  color: '#484848',
  margin: '16px 0',
};

const link = {
  color: '#e11d48',
  textDecoration: 'underline',
};

const hr = {
  borderColor: '#e6ebf1',
  margin: '32px 0',
};

const messageHeading = {
  fontSize: '14px',
  fontWeight: '700',
  color: '#9ca3af',
  textTransform: 'uppercase' as const,
  letterSpacing: '1px',
  marginBottom: '12px',
};

const messageBox = {
  backgroundColor: '#f9fafb',
  borderRadius: '8px',
  padding: '24px',
  border: '1px solid #e5e7eb',
};

const messageText = {
  fontSize: '16px',
  lineHeight: '24px',
  color: '#374151',
  margin: '0',
  whiteSpace: 'pre-wrap' as const,
};

const footer = {
  fontSize: '12px',
  color: '#9ca3af',
  marginTop: '32px',
  textAlign: 'center' as const,
};
