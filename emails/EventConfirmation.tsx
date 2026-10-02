import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
  Button,
} from '@react-email/components';
import * as React from 'react';

interface EventConfirmationEmailProps {
  userName: string;
  eventTitle: string;
  eventDate: string;
  eventUrl: string;
}

export const EventConfirmationEmail = ({
  userName,
  eventTitle,
  eventDate,
  eventUrl,
}: EventConfirmationEmailProps) => (
  <Html>
    <Head />
    <Preview>Confirmation d'inscription : {eventTitle}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={header}>
          <Heading style={h1}>Eurin Hash CS</Heading>
        </Section>
        <Section style={content}>
          <Text style={paragraph}>Bonjour {userName},</Text>
          <Text style={paragraph}>
            C'est avec grand plaisir que nous vous confirmons votre inscription à l'événement :
          </Text>
          <Section style={eventCard}>
            <Text style={eventTitleText}>{eventTitle}</Text>
            <Text style={eventDetailText}>📅 Date : {eventDate}</Text>
          </Section>
          <Text style={paragraph}>
            Nous sommes ravis de vous compter parmi nous. Vous pouvez accéder aux détails de l'événement et aux ressources via le bouton ci-dessous :
          </Text>
          <Section style={btnContainer}>
            <Button style={button} href={eventUrl}>
              Accéder à l'événement
            </Button>
          </Section>
          <Text style={paragraph}>
            À très bientôt,
            <br />
            L'équipe Eurin Hash
          </Text>
        </Section>
        <Hr style={hr} />
        <Section style={footer}>
          <Text style={footerText}>
            © 2026 Eurin Hash CS. Tous droits réservés.
          </Text>
          <Link href="https://eurinhash.com" style={footerLink}>
            eurinhash.com
          </Link>
        </Section>
      </Container>
    </Body>
  </Html>
);

export default EventConfirmationEmail;

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
  borderRadius: '8px',
  boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
};

const header = {
  padding: '32px',
  textAlign: 'center' as const,
  backgroundColor: '#000000',
  borderRadius: '8px 8px 0 0',
};

const h1 = {
  color: '#ffffff',
  fontSize: '24px',
  fontWeight: '800',
  margin: '0',
  textTransform: 'uppercase' as const,
  letterSpacing: '2px',
};

const content = {
  padding: '32px',
};

const paragraph = {
  fontSize: '16px',
  lineHeight: '26px',
  color: '#484848',
};

const eventCard = {
  backgroundColor: '#f9fafb',
  borderRadius: '8px',
  padding: '24px',
  margin: '24px 0',
  border: '1px solid #e5e7eb',
};

const eventTitleText = {
  fontSize: '18px',
  fontWeight: '700',
  margin: '0 0 8px 0',
  color: '#e11d48',
};

const eventDetailText = {
  fontSize: '14px',
  margin: '0',
  color: '#6b7280',
};

const btnContainer = {
  textAlign: 'center' as const,
  margin: '32px 0',
};

const button = {
  backgroundColor: '#e11d48',
  borderRadius: '6px',
  color: '#fff',
  fontSize: '16px',
  fontWeight: '600',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '12px 24px',
};

const hr = {
  borderColor: '#e6ebf1',
  margin: '20px 0',
};

const footer = {
  padding: '0 32px',
  textAlign: 'center' as const,
};

const footerText = {
  fontSize: '12px',
  color: '#8898aa',
  margin: '0 0 8px 0',
};

const footerLink = {
  fontSize: '12px',
  color: '#e11d48',
  textDecoration: 'underline',
};
