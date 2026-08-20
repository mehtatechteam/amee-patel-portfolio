"use client";

import { useEffect, useState } from "react";

/** Real current time in India (Amee's timezone), not decoration — updates
 * client-side only. Renders nothing until mounted to avoid a server/client
 * mismatch (the server has no meaningful "current time" to render). */
export function LiveClock() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const formatter = new Intl.DateTimeFormat("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Asia/Kolkata",
    });
    const update = () => setTime(formatter.format(new Date()));
    update();
    const interval = window.setInterval(update, 30_000);
    return () => window.clearInterval(interval);
  }, []);

  if (!time) return null;

  return <span>{time} IST</span>;
}
