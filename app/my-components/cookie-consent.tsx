import { getConsentCookie } from "../actions/cookie-consent";
import CookieModal from "./cookie-modal";

export default async function CookieConsent() {
    const cookieConsent = await getConsentCookie();

    return <CookieModal showModal={cookieConsent === undefined}></CookieModal>;
}
