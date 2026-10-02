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
          <Heading style={h1}>EH <span style={accent}>HUB</span></Heading>
          <Text style={badge}>Nouveau Contact</Text>
        </Section>
        <Section style={content}>
          <Text style={paragraph}>
            <strong>De :</strong> {name}
          </Text>
          <Text style={paragraph}>
            <strong>Email :</strong> <Link href={`mailto:${email}`} style={link}>{email}</Link>
          </Text>
          <Text style={paragraph}>
            <strong>Sujet :</strong> {subject}
          </Text>
          
          <Hr style={hr} />
          
          <Text style={messageHeading}>Contenu du Message :</Text>
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

const main = {
  backgroundColor: '#0a0a0a',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '0 0 48px',
  marginBottom: '64px',
  borderRadius: '12px',
  overflow: 'hidden' as const,
  border: '1px solid #222',
};

const header = {
  backgroundColor: '#000000',
  padding: '40px 32px',
  textAlign: 'center' as const,
};

const h1 = {
  color: '#ffffff',
  fontSize: '24px',
  fontWeight: '900',
  margin: '0',
  textTransform: 'uppercase' as const,
  letterSpacing: '-0.05em',
};

const accent = {
  color: '#3b82f6',
};

const badge = {
  color: '#9ca3af',
  fontSize: '10px',
  fontWeight: '700',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.2em',
  marginTop: '8px',
};

const content = {
  padding: '40px',
};

const paragraph = {
  fontSize: '16px',
  lineHeight: '26px',
  color: '#111827',
  margin: '12px 0',
};

const link = {
  color: '#3b82f6',
  textDecoration: 'none',
  fontWeight: '600',
};

const hr = {
  borderColor: '#e5e7eb',
  margin: '32px 0',
};

const messageHeading = {
  fontSize: '12px',
  fontWeight: '800',
  color: '#6b7280',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.1em',
  marginBottom: '16px',
};

const messageBox = {
  backgroundColor: '#f9fafb',
  borderRadius: '8px',
  padding: '24px',
  border: '1px solid #e5e7eb',
};

const messageText = {
  fontSize: '16px',
  lineHeight: '26px',
  color: '#111827',
  margin: '0',
  whiteSpace: 'pre-wrap' as const,
};

const footer = {
  fontSize: '12px',
  color: '#9ca3af',
  marginTop: '40px',
  textAlign: 'center' as const,
};

export default ContactNotificationEmail;
