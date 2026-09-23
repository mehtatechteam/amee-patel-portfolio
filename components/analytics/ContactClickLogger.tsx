"use client";

import { useEffect } from "react";
import { sendGAEvent } from "@next/third-parties/google";
import { CLICK_LOG_URL } from "@/lib/constants/site";

/**
 * One document-level listener that records every contact click (WhatsApp,
 * email, phone, map) — including links inside modals — without touching
 * each button. Each click is sent to:
 *  - Google Analytics as a named event (whatsapp_click / email_click / …)
 *  - the shared "Website Contact Clicks" Google Sheet via an Apps Script
 *    web app (CLICK_LOG_URL), when configured.
 *
 * Clicks are anonymous: no name/number is known until the visitor actually
 * sends the message. The visitor ID is a random per-browser token so repeat
 * clicks from one person can be grouped.
 */

function classify(href: string) {
  if (href.startsWith("https://wa.me/")) return "whatsapp";
  if (href.startsWith("mailto:")) return "email";
  if (href.startsWith("tel:")) return "phone";
  if (href.includes("maps.google.") || href.includes("google.com/maps")) return "map";
  return null;
}

function sectionOf(el: Element) {
  const dialog = el.closest('[role="dialog"]');
  if (dialog) {
    const labelId = dialog.getAttribute("aria-labelledby");
    const heading = labelId ? document.getElementById(labelId)?.textContent?.trim() : "";
    return `popup: ${dialog.getAttribute("aria-label") || heading || "untitled"}`.slice(0, 80);
  }
  if (el.closest("footer")) return "footer";
  if (el.closest("nav, header")) return "nav";
  const section = el.closest("section[id]");
  return section?.id || "floating-button";
}

function visitorId() {
  try {
    let id = localStorage.getItem("ap_vid");
    if (!id) {
      id = Math.random().toString(36).slice(2, 10);
      localStorage.setItem("ap_vid", id);
    }
    return id;
  } catch {
    return "";
  }
}

export function ContactClickLogger() {
  useEffect(() => {
    function onClick(event: MouseEvent) {
      const anchor = (event.target as Element | null)?.closest?.("a[href]");
      if (!anchor) return;
      const href = anchor.getAttribute("href") || "";
      const kind = classify(href);
      if (!kind) return;

      const button =
        anchor.getAttribute("aria-label") ||
        (anchor.textContent || "").replace(/\s+/g, " ").trim().slice(0, 80) ||
        kind;
      const section = sectionOf(anchor);

      sendGAEvent("event", `${kind}_click`, { button, section });

      if (!CLICK_LOG_URL) return;
      const params = new URLSearchParams(window.location.search);
      const payload = JSON.stringify({
        button,
        section,
        kind,
        link: href.split("?")[0],
        page: window.location.pathname + window.location.hash,
        referrer: document.referrer || "direct",
        utm: params.get("utm_source") || "",
        device: window.matchMedia("(pointer: coarse)").matches ? "mobile/tablet" : "desktop",
        screen: `${window.screen.width}x${window.screen.height}`,
        lang: navigator.language,
        vid: visitorId(),
      });
      // text/plain avoids a CORS preflight, which Apps Script can't answer.
      const blob = new Blob([payload], { type: "text/plain" });
      if (!navigator.sendBeacon?.(CLICK_LOG_URL, blob)) {
        fetch(CLICK_LOG_URL, { method: "POST", body: blob, mode: "no-cors", keepalive: true }).catch(() => {});
      }
    }

    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return null;
}
