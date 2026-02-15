
const fs = require('fs');
const path = require('path');
const { Resend } = require('resend');

async function main() {
    console.log('Current working directory:', process.cwd());

    // Load .env manually
    try {
        const envPath = path.resolve(process.cwd(), '.env');
        console.log('Loading .env from:', envPath);

        if (!fs.existsSync(envPath)) {
            console.error('.env file NOT FOUND at', envPath);
            process.exit(1);
        }

        const envFile = fs.readFileSync(envPath, 'utf8');
        const lines = envFile.split(/\r?\n/);
        console.log(`Read ${lines.length} lines from .env`);

        lines.forEach(line => {
            // Match KEY=VALUE, handling optional quotes
            const match = line.match(/^\s*([\w_]+)\s*=\s*(.*)?\s*$/);
            if (match) {
                const key = match[1];
                let value = match[2] || '';
                // Remove surrounding quotes if present
                if (value.length > 0 && (
                    (value.startsWith('"') && value.endsWith('"')) ||
                    (value.startsWith("'") && value.endsWith("'"))
                )) {
                    value = value.slice(1, -1);
                }
                process.env[key] = value;

                if (key === 'RESEND_API_KEY') {
                    console.log('Loaded RESEND_API_KEY (length:', value.length, ')');
                }
            }
        });
    } catch (e) {
        console.error('Could not load .env file:', e);
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
        console.error('CRITICAL ERROR: RESEND_API_KEY is missing from process.env after loading .env');
        console.log('Please ensure RESEND_API_KEY is set in', path.resolve(process.cwd(), '.env'));
        process.exit(1);
    }

    // Initialize Resend AFTER loading env
    const resend = new Resend(apiKey);

    console.log('Sending email...');
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';
    console.log('From:', fromEmail);
    console.log('To: eflexcloud@gmail.com');

    try {
        const data = await resend.emails.send({
            from: fromEmail,
            to: 'eflexcloud@gmail.com',
            subject: 'Test Email from EurinHash Portfolio',
            html: '<h1>It works!</h1><p>This is a test email from your EurinHash Portfolio application.</p>',
        });

        if (data.error) {
            console.error('Resend API returned error:', data.error);
        } else {
            console.log('Email sent successfully:', JSON.stringify(data, null, 2));
        }
    } catch (error) {
        console.error('Exception sending email:', error);
    }
}

main();
