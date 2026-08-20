import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Builds a wa.me link with an optional pre-filled, URL-encoded message. */
export function whatsappLink(phone: string, message?: string) {
  return message ? `https://wa.me/${phone}?text=${encodeURIComponent(message)}` : `https://wa.me/${phone}`;
}
