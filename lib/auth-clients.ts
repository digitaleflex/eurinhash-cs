import { createAuthClient } from "better-auth/react";
import { emailOTPClient } from "better-auth/client/plugins";

function getAuthBaseURL() {
    const raw =
        process.env.NEXT_PUBLIC_SITE_URL ||
        process.env.BETTER_AUTH_URL ||
        "http://localhost:3000";
    const trimmed = raw.trim().replace(/^["']|["']$/g, "");
    if (!trimmed.startsWith("http://") && !trimmed.startsWith("https://")) {
        return `https://${trimmed}`;
    }
    return trimmed;
}

export const authClient = createAuthClient({
    baseURL: getAuthBaseURL(),
    plugins: [
        emailOTPClient(),
    ],
})

// Helper hooks and functions
export const { useSession, signOut } = authClient;
