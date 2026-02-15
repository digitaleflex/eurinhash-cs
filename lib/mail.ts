import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

interface SendMailOptions {
    to: string;
    subject: string;
    html: string;
    text?: string;
}

export const sendMail = async ({ to, subject, html, text }: SendMailOptions) => {
    if (!process.env.RESEND_API_KEY) {
        console.warn('RESEND_API_KEY is not set. Email not sent.');
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
        console.error('Error sending email:', error);
        return { success: false, error };
    }
};
