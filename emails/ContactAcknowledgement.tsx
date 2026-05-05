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
  Button,
} from '@react-email/components';
import * as React from 'react';

interface ContactAcknowledgementEmailProps {
  name: string;
  subject: string;
}

export const ContactAcknowledgementEmail = ({
  name,
  subject,
}: ContactAcknowledgementEmailProps) => (
  <Html>
    <Head />
    <Preview>Accusé de réception : Nous avons bien reçu votre message</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={header}>
          <Heading style={h1}>Transmission Reçue</Heading>
        </Section>
        <Section style={content}>
          <Text style={paragraph}>Bonjour <strong>{name}</strong>,</Text>
          <Text style={paragraph}>
            Nous vous confirmons la bonne réception de votre message concernant : <em>"{subject}"</em>.
          </Text>
          <Text style={paragraph}>
            Un expert en architecture logicielle examine actuellement votre demande. Vous recevrez une réponse détaillée sous un délai de **24 heures ouvrées**.
          </Text>
          <Section style={btnContainer}>
            <Button style={button} href="https://eurinhash.com/blog">
              En attendant, visitez notre Blog Tech
            </Button>
          </Section>
          <Hr style={hr} />
          <Text style={footer}>
            <strong>Eurin Hash CS</strong><br />
            Architecture, Souveraineté & Expertise Cloud
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

export default ContactAcknowledgementEmail;

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
  backgroundColor: '#e11d48',
  padding: '32px',
  textAlign: 'center' as const,
};

const h1 = {
  color: '#ffffff',
  fontSize: '20px',
  fontWeight: '800',
  margin: '0',
  textTransform: 'uppercase' as const,
  letterSpacing: '2px',
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

const btnContainer = {
  textAlign: 'center' as const,
  margin: '32px 0',
};

const button = {
  backgroundColor: '#000000',
  borderRadius: '6px',
  color: '#fff',
  fontSize: '14px',
  fontWeight: '600',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '12px 24px',
};

const hr = {
  borderColor: '#e6ebf1',
  margin: '32px 0',
};

const footer = {
  fontSize: '12px',
  lineHeight: '20px',
  color: '#9ca3af',
  textAlign: 'center' as const,
};
