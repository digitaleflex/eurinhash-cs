import { createAuthClient } from "better-auth/react";
import { emailOTPClient } from "better-auth/client/plugins";

function getAuthBaseURL() {
    return (
        process.env.NEXT_PUBLIC_SITE_URL ||
        process.env.BETTER_AUTH_URL ||
        "http://localhost:3000"
    );
}

export const authClient = createAuthClient({
    baseURL: getAuthBaseURL(),
    plugins: [
        emailOTPClient(),
    ],
})

// Helper hooks and functions
export const { useSession, signOut } = authClient;
