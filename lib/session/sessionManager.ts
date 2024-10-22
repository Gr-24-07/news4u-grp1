import {
  useSession as useNextAuthSession,
  signOut as nextAuthSignOut,
} from "next-auth/react";
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

// Debug logging function that only runs in development
const debugLog = (message: string, data?: any) => {
  if (process.env.NODE_ENV === "development") {
    console.log(
      `%c[SessionManager] ${message}`,
      "color: #0066cc; font-weight: bold;",
      data ? data : ""
    );
  }
};

export function useSession() {
  const { data: session, status } = useNextAuthSession();
  const [cachedSession, setCachedSession] = useState<CustomSession | null>(
    globalSession
  );

  useEffect(() => {
    const now = Date.now();
    const timeUntilExpiry = lastFetch + CACHE_DURATION - now;

    if (session && (!globalSession || now - lastFetch > CACHE_DURATION)) {
      debugLog("Updating session cache");
      debugLog(
        "Previous cache age:",
        `${Math.floor((now - lastFetch) / 1000)}s`
      );

      globalSession = session as CustomSession;
      lastFetch = now;
      setCachedSession(session as CustomSession);

      debugLog("New session cached", {
        user: globalSession.user.email,
        role: globalSession.user.role,
        cacheExpiresIn: `${CACHE_DURATION / 1000}s`,
      });
    } else if (globalSession) {
      debugLog("Using cached session", {
        user: globalSession.user.email,
        cacheExpiresIn: `${Math.floor(timeUntilExpiry / 1000)}s`,
      });
    }
  }, [session]);

  return {
    data: cachedSession || (session as CustomSession),
    status: cachedSession ? "authenticated" : status,
  };
}

export const signOut = nextAuthSignOut;
