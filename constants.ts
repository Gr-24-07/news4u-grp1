import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";

export const CONSENT_COOKIE_NAME = "__consent";

export const CONSENT_OPTIONS: Partial<ResponseCookie> = {
    httpOnly: true,
    maxAge: 60 * 60 * 24,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
};
