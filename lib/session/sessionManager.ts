import { useSession as useNextAuthSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Session } from "next-auth";
import { Role } from "@/types/user";

interface CustomSession extends Session {
    user: {
        id: string;
        email: string;
        role: Role;
        name?: string | null;
    };
}

let globalSession: CustomSession | null = null;
let lastFetch = 0;
const CACHE_DURATION = 60 * 1000; // 1 minute cache

const debugLog = (message: string, data?: unknown) => {
    if (process.env.NODE_ENV === "development") {
        console.log(
            `%c[SessionManager] ${message}`,
            "color: #0066cc; font-weight: bold;",
            data ? data : "",
            new Error().stack?.split("\n")[2]
        );
    }
};

export function useSession() {
    const { data: nextAuthSession, status } = useNextAuthSession();
    const [cachedSession, setCachedSession] = useState<CustomSession | null>(
        globalSession
    );

    useEffect(() => {
        const now = Date.now();

        if (globalSession && now - lastFetch < CACHE_DURATION) {
            debugLog("Using cached session", {
                user: globalSession.user.email,
                cacheAge: `${Math.floor((now - lastFetch) / 1000)}s`,
            });
            setCachedSession(globalSession);
            return;
        }

        if (nextAuthSession) {
            debugLog("Updating session cache");
            globalSession = nextAuthSession as CustomSession;
            lastFetch = now;
            setCachedSession(globalSession);
            debugLog("Session cached", { user: nextAuthSession.user.email });
        }
    }, [nextAuthSession]);

    return {
        data: cachedSession || (nextAuthSession as CustomSession | null),
        status: cachedSession ? "authenticated" : status,
    };
}

export { signOut } from "next-auth/react";
