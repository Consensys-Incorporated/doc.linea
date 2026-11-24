import type { VercelRequest, VercelResponse } from "@vercel/node";
import { sanitizeFeedbackText } from "./feedback-sanitize";

// ---------- Types ----------

interface FeedbackBody {
  page_url: string;
  rating: "yes" | "no";
  reason?: string;
  timestamp?: string;
}

function isValidPageUrl(url: string): boolean {
  // Accept relative paths (e.g. /developers/guides/bridge)
  if (url.startsWith("/")) return /^\/[\w\-./]*$/.test(url);
  // Accept full URLs from the docs site
  try {
    const parsed = new URL(url);
    return parsed.origin === "https://docs.linea.build";
  } catch {
    return false;
  }
}

// ---------- GitHub Issue ----------

async function createGitHubIssue(pageUrl: string, reason: string): Promise<void> {
  const repo = process.env.GITHUB_REPO!; // "Consensys-Incorporated/doc.linea"
  const res = await fetch(`https://api.github.com/repos/${repo}/issues`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      Accept: "application/vnd.github+json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: `Docs feedback: ${pageUrl}`,
      body: `**Page:** ${pageUrl}\n\n**Feedback:**\n${reason}`,
      labels: ["user-feedback"],
    }),
  });

  if (!res.ok) {
    console.error("GitHub issue creation failed:", res.status, await res.text());
  }
}

// ---------- Handler ----------

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Rate limiting is handled by Vercel Firewall (project dashboard)

  // Validate
  const { page_url: pageUrl, rating, reason } = req.body as FeedbackBody;

  if (!pageUrl || !rating || !["yes", "no"].includes(rating)) {
    return res.status(400).json({ error: "page_url and rating (yes/no) are required" });
  }

  if (!isValidPageUrl(pageUrl)) {
    return res.status(400).json({ error: "invalid page_url" });
  }

  const cleanReason = reason ? sanitizeFeedbackText(reason) : "";

  if (rating === "no" && !cleanReason) {
    return res.status(400).json({ error: "reason is required for negative feedback" });
  }

  // Negative + reason → GitHub issue
  if (rating === "no" && cleanReason) {
    try {
      await createGitHubIssue(pageUrl, cleanReason);
    } catch (err) {
      console.error("GitHub issue failed:", err);
    }
  }

  return res.status(200).json({ ok: true });
}
