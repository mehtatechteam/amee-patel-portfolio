import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        // Everything is public on this one-pager — nothing to disallow.
        userAgent: "*",
        allow: "/",
      },
      {
        // Explicit allow-list for the AI assistants/answer engines that
        // power "AI search" results (ChatGPT/Perplexity/Copilot answers,
        // Google AI Overviews, Apple Intelligence) — redundant with the
        // wildcard rule above today, but keeps this site discoverable by
        // name even if the wildcard is ever tightened later.
        userAgent: [
          "GPTBot",
          "OAI-SearchBot",
          "ChatGPT-User",
          "PerplexityBot",
          "Perplexity-User",
          "ClaudeBot",
          "Claude-User",
          "Claude-SearchBot",
          "anthropic-ai",
          "Google-Extended",
          "Applebot-Extended",
          "Amazonbot",
          "Meta-ExternalAgent",
          "CCBot",
        ],
        allow: "/",
      },
      {
        // Bingbot is Microsoft's regular web-search crawler, not an
        // AI-answer-engine bot specifically (that's a separate UA) — kept
        // as its own explicit rule so this file doesn't misdescribe it.
        userAgent: "Bingbot",
        allow: "/",
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
