import { Resend } from 'resend';
import { logger } from '@/lib/logger';
import { render } from '@react-email/render';
import { EventConfirmationEmail } from '@/emails/EventConfirmation';
import { ContactNotificationEmail } from '@/emails/ContactNotification';
import { ContactAcknowledgementEmail } from '@/emails/ContactAcknowledgement';
import * as React from 'react';

const resend = new Resend(process.env.RESEND_API_KEY);

interface SendMailOptions {
    to: string;
    subject: string;
    html: string;
    text?: string;
}

export const sendMail = async ({ to, subject, html, text }: SendMailOptions) => {
    if (!process.env.RESEND_API_KEY) {
        logger.warn('RESEND_API_KEY is not set. Email not sent.');
        return { success: false, error: 'Missing API Key' };
    }

    try {
        const data = await resend.emails.send({
            from: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
            to,
            subject,
            html,
            text,
        });
        
        logger.info({ data, to, subject }, 'Email sent successfully');

        return { success: true, data };
    } catch (error) {
        logger.error({ error, to, subject }, 'Error sending email via Resend');
        return { success: false, error };
    }
};

/**
 * Envoie un email de confirmation d'inscription à un événement
 */
export const sendEventConfirmation = async (options: {
  to: string;
  userName: string;
  eventTitle: string;
  eventDate: string;
  eventUrl: string;
}) => {
  const { to, userName, eventTitle, eventDate, eventUrl } = options;
  
  try {
    const html = await render(
      React.createElement(EventConfirmationEmail, {
        userName,
        eventTitle,
        eventDate,
        eventUrl,
      })
    );

    return await sendMail({
      to,
      subject: `Confirmation : ${eventTitle}`,
      html,
    });
  } catch (error) {
    logger.error({ error, to }, 'Failed to render or send event confirmation email');
    return { success: false, error };
  }
};

/**
 * Prévient l'administrateur d'un nouveau message
 */
export const sendContactNotification = async (data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) => {
  try {
    const html = await render(
      React.createElement(ContactNotificationEmail, data)
    );

    return await sendMail({
      to: process.env.RESEND_FROM_EMAIL || 'contact@eurinhash.com',
      subject: `[CONTACT] ${data.name} : ${data.subject}`,
      html,
    });
  } catch (error) {
    logger.error({ error }, 'Failed to send contact notification email');
    return { success: false, error };
  }
};

/**
 * Envoie un accusé de réception au client
 */
export const sendContactAcknowledgement = async (data: {
  to: string;
  name: string;
  subject: string;
}) => {
  try {
    const html = await render(
      React.createElement(ContactAcknowledgementEmail, {
        name: data.name,
        subject: data.subject,
      })
    );

    return await sendMail({
      to: data.to,
      subject: `[EHAF] Message reçu : ${data.subject}`,
      html,
    });
  } catch (error) {
    logger.error({ error, to: data.to }, 'Failed to send contact acknowledgement email');
    return { success: false, error };
  }
};

