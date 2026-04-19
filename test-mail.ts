import { sendMail } from './lib/mail';

async function test() {
  console.log("Testing email sending...");
  console.log("RESEND_API_KEY:", process.env.RESEND_API_KEY ? "Set" : "Not Set");
  console.log("RESEND_FROM_EMAIL:", process.env.RESEND_FROM_EMAIL);
  
  const result = await sendMail({
    to: "test@example.com", // Will be replaced by a dummy or I'll just see the error
    subject: "Test Email",
    html: "<p>Test</p>"
  });
  
  console.log("Result:", JSON.stringify(result, null, 2));
}

test();