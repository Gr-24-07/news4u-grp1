"use server";

import { CONSENT_COOKIE_NAME, CONSENT_OPTIONS } from "@/constants";
import { cookies } from "next/headers";

export async function getConsentCookie(): Promise<boolean | undefined> {
    const cookie = cookies().get(CONSENT_COOKIE_NAME);

    if (cookie === undefined) {
        return undefined;
    }

    return JSON.parse(cookie.value);
}

export async function setConsentCookie(value: boolean) {
    cookies().set(CONSENT_COOKIE_NAME, JSON.stringify(value), CONSENT_OPTIONS);
}

export async function resetCookie() {
    cookies().delete(CONSENT_COOKIE_NAME);
}
