import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function formatPrice(priceInCents: number) {
    return new Intl.NumberFormat("en-US", {
        currency: "USD",
        style: "currency",
    }).format(priceInCents / 100);
}
