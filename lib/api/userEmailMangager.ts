import { useState, useEffect } from "react";

interface EmailCache {
    email: string;
    timestamp: number;
}

let globalEmailCache: EmailCache | null = null;
let pendingPromise: Promise<string | null> | null = null;
const CACHE_DURATION = 60 * 1000; // 1 minute cache

const debugLog = (message: string, data?: any) => {
    if (process.env.NODE_ENV === "development") {
        console.log(
            `%c[EmailManager] ${message}`,
            "color: #00cc66; font-weight: bold;",
            data ? data : ""
        );
    }
};

async function fetchEmail(): Promise<string | null> {
    if (pendingPromise) {
        debugLog("Using existing request");
        return pendingPromise;
    }

    debugLog("Starting new request");
    pendingPromise = fetch("/api/user/profile-current-email")
        .then(async (response) => {
            if (response.ok) {
                const data = await response.json();
                return data.email;
            }
            return null;
        })
        .finally(() => {
            // Clear pending promise after a short delay to handle near-simultaneous requests
            setTimeout(() => {
                pendingPromise = null;
            }, 100);
        });

    return pendingPromise;
}

export function useUserEmail() {
    const [email, setEmail] = useState<string | null>(
        globalEmailCache?.email || null
    );

    useEffect(() => {
        const now = Date.now();

        if (
            globalEmailCache &&
            now - globalEmailCache.timestamp < CACHE_DURATION
        ) {
            debugLog("Using cached email", {
                email: globalEmailCache.email,
                cacheAge: `${Math.floor(
                    (now - globalEmailCache.timestamp) / 1000
                )}s`,
            });
            setEmail(globalEmailCache.email);
            return;
        }

        fetchEmail().then((email) => {
            if (email) {
                globalEmailCache = {
                    email,
                    timestamp: Date.now(),
                };
                setEmail(email);
                debugLog("Email cached", { email });
            }
        });
    }, []);

    return email;
}
