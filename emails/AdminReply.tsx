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
  Button,
} from '@react-email/components';
import * as React from 'react';

interface AdminReplyEmailProps {
  userName: string;
  originalMessage: string;
  replyContent: string;
}

export const AdminReplyEmail = ({
  userName,
  originalMessage,
  replyContent,
}: AdminReplyEmailProps) => (
  <Html>
    <Head />
    <Preview>Réponse à votre message sur Eurin Hash</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={headerSection}>
          <Heading style={h1}>Eurin Hash <span style={accent}>CS</span></Heading>
        </Section>
        <Section style={contentSection}>
          <Text style={text}>Bonjour {userName},</Text>
          <Text style={text}>
            Je reviens vers vous concernant votre message. Voici ma réponse :
          </Text>
          <Section style={replyBox}>
            <Text style={replyText}>{replyContent}</Text>
          </Section>
          
          <Hr style={hr} />
          
          <Text style={subtext}>
            <strong>Rappel de votre message :</strong>
          </Text>
          <Section style={originalMessageBox}>
            <Text style={originalMessageText}>"{originalMessage}"</Text>
          </Section>
          
          <Text style={footer}>
            Si vous avez d'autres questions, n'hésitez pas à répondre directement à cet email.
          </Text>
          <Text style={signature}>
            Cordialement,<br />
            <strong>Eurin Hash</strong><br />
            Expert Full Stack & Cloud
          </Text>
        </Section>
        <Section style={footerSection}>
          <Text style={footerText}>
            © {new Date().getFullYear()} Eurin Hash. Tous droits réservés.
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
  borderRadius: '12px',
  border: '1px solid #e6ebf1',
  overflow: 'hidden',
};

const headerSection = {
  padding: '32px',
  backgroundColor: '#0a0a0a',
  textAlign: 'center' as const,
};

const h1 = {
  color: '#ffffff',
  fontSize: '24px',
  fontWeight: '900',
  textTransform: 'uppercase' as const,
  letterSpacing: '-0.05em',
  margin: '0',
};

const accent = {
  color: '#3b82f6',
};

const contentSection = {
  padding: '40px 48px',
};

const text = {
  color: '#444',
  fontSize: '16px',
  lineHeight: '26px',
  marginBottom: '20px',
};

const replyBox = {
  backgroundColor: '#f9fafb',
  borderRadius: '8px',
  padding: '24px',
  border: '1px solid #e5e7eb',
  marginBottom: '32px',
};

const replyText = {
  color: '#111827',
  fontSize: '16px',
  lineHeight: '26px',
  margin: '0',
  whiteSpace: 'pre-wrap' as const,
};

const originalMessageBox = {
  borderLeft: '4px solid #e5e7eb',
  paddingLeft: '16px',
  margin: '16px 0 32px',
};

const originalMessageText = {
  color: '#6b7280',
  fontSize: '14px',
  fontStyle: 'italic',
  lineHeight: '22px',
};

const subtext = {
  color: '#111827',
  fontSize: '14px',
  fontWeight: '700',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.05em',
};

const hr = {
  borderColor: '#e6ebf1',
  margin: '32px 0',
};

const footer = {
  color: '#666',
  fontSize: '14px',
  lineHeight: '22px',
};

const signature = {
  color: '#111827',
  fontSize: '16px',
  lineHeight: '26px',
  marginTop: '32px',
};

const footerSection = {
  textAlign: 'center' as const,
  padding: '0 32px',
};

const footerText = {
  color: '#8898aa',
  fontSize: '12px',
  lineHeight: '16px',
};

export default AdminReplyEmail;
