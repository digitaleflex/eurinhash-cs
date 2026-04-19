import { Resend } from 'resend';
import { logger } from '@/lib/logger';

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

        return { success: true, data };
    } catch (error) {
        logger.error({ error, to, subject }, 'Error sending email via Resend');
        return { success: false, error };
    }
};
