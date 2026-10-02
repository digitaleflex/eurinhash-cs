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
          <Heading style={h1}>Eurin Hash <span style={accent}>CS</span></Heading>
          <Text style={badge}>Transmission Reçue</Text>
        </Section>
        <Section style={content}>
          <Text style={paragraph}>Bonjour <strong>{name}</strong>,</Text>
          <Text style={paragraph}>
            Ceci est un accusé de réception automatique. Nous vous confirmons la bonne réception de votre message concernant : <span style={highlight}>"{subject}"</span>.
          </Text>
          <Text style={paragraph}>
            Votre demande est en cours d'analyse. Vous avez échangé directement avec la personne qui réalise le travail : la réponse arrivera dès que l'analyse sera terminée.
          </Text>
          
          <Section style={btnContainer}>
            <Button style={button} href="https://eurinhash.com/blog">
              Découvrir nos derniers articles tech
            </Button>
          </Section>
          
          <Hr style={hr} />
          
          <Text style={footer}>
            <strong>Eurin Hash CS</strong><br />
            Architecture logicielle, IA appliquée et cybersécurité
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
  margin: '16px 0',
};

const highlight = {
  color: '#3b82f6',
  fontWeight: '700',
};

const btnContainer = {
  textAlign: 'center' as const,
  margin: '32px 0',
};

const button = {
  backgroundColor: '#000000',
  borderRadius: '8px',
  color: '#fff',
  fontSize: '14px',
  fontWeight: '900',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '16px 32px',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.1em',
};

const hr = {
  borderColor: '#e5e7eb',
  margin: '32px 0',
};

const footer = {
  fontSize: '12px',
  lineHeight: '20px',
  color: '#9ca3af',
  textAlign: 'center' as const,
};

export default ContactAcknowledgementEmail;
