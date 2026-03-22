import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@prisma/client";
import { emailOTP } from "better-auth/plugins";
import { sendMail } from "./mail";

// Better Auth requires a PLAIN PrismaClient — not extended with $extends(withAccelerate())
// Using the extended client from prisma-api.ts causes silent auth failures
const prismaForAuth = new PrismaClient();

const AUTH_BASE_URL =
    process.env.BETTER_AUTH_URL ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    "http://localhost:3000";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const BETTER_AUTH_SECRET = process.env.BETTER_AUTH_SECRET;

if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET) {
    console.warn("[AUTH] Google OAuth credentials not configured - social login will be disabled");
}

if (!BETTER_AUTH_SECRET) {
    throw new Error("[AUTH] BETTER_AUTH_SECRET is not set. Please add it to your .env file.");
}

const trustedOrigins = [
    AUTH_BASE_URL,
    process.env.BETTER_AUTH_URL,
    process.env.NEXT_PUBLIC_SITE_URL,
    "http://localhost:3000",
    "https://localhost:3000",
].filter((v): v is string => Boolean(v));
const uniqueTrustedOrigins = [...new Set(trustedOrigins)];

export const auth = betterAuth({
    baseURL: AUTH_BASE_URL,
    secret: BETTER_AUTH_SECRET,
    database: prismaAdapter(prismaForAuth, {
        provider: "postgresql",
    }),
    emailAndPassword: {
        enabled: false,
    },
    socialProviders: {
        ...(GOOGLE_CLIENT_ID && GOOGLE_CLIENT_SECRET ? {
            google: {
                clientId: GOOGLE_CLIENT_ID,
                clientSecret: GOOGLE_CLIENT_SECRET,
                redirectURI: `${AUTH_BASE_URL}/api/auth/callback/google`,
            },
        } : {}),
    },
    plugins: [
        emailOTP({
            async sendVerificationOTP({ email, otp, type }) {
                const subject = type === "sign-in" ? "Votre code de connexion" : "Vérifiez votre email";
                await sendMail({
                    to: email,
                    subject,
                    html: `
                        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 12px; color: #111827;">
                            <h2 style="font-size: 24px; font-weight: 700; margin-bottom: 16px; text-align: center;">${subject}</h2>
                            <p style="font-size: 16px; margin-bottom: 24px; text-align: center;">Utilisez le code suivant pour continuer votre connexion sur Eurin Hash CS.</p>
                            <div style="font-size: 36px; font-weight: 800; letter-spacing: 8px; padding: 24px; background: #f9fafb; border-radius: 12px; text-align: center; border: 1px solid #e5e7eb;">
                                ${otp}
                            </div>
                            <p style="font-size: 14px; margin-top: 24px; color: #6b7280; text-align: center;">Ce code expirera dans 10 minutes. Si vous n'êtes pas à l'origine de cette demande, vous pouvez ignorer cet email.</p>
                        </div>
                    `,
                });
            },
        }),
    ],
    trustedOrigins: uniqueTrustedOrigins,
    // Session configuration
    session: {
        expiresIn: 60 * 60 * 24 * 7, // 7 days
        updateAge: 60 * 60 * 24, // 1 day
    },
});

// Type exports for use in other parts of the app
export type Session = typeof auth.$Infer.Session.session;
export type User = typeof auth.$Infer.Session.user;
