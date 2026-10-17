import "server-only";

const EMAIL_BASE_URL = "https://integrations.emergentagent.com";
const CRED_ASK = ["reply with your password", "reply with the code", "send your password", "cvv", "seed phrase", "verify your card", "confirm your bank details"];

export const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] as string);

function assertSafeEmail(subject: string, html: string) {
  if (/<(form|input|textarea|select)\b/i.test(html)) throw new Error("No forms or inputs in email");
  const body = `${subject}\n${html}`.toLowerCase();
  const ask = CRED_ASK.find((p) => body.includes(p));
  if (ask) throw new Error(`Email asks for credentials: ${ask}`);
  for (const [, url] of html.matchAll(/(?:href|src)\s*=\s*"([^"]*)"/gi)) {
    const low = url.trim().toLowerCase();
    if (/^(mailto:|tel:|cid:|#)/.test(low)) continue;
    if (!low.startsWith("https://")) throw new Error(`Links must be absolute https: ${url}`);
    const { hostname, username } = new URL(low);
    if (!hostname || hostname.includes("xn--") || /^[\d.]+$|:/.test(hostname) || username) throw new Error(`Unsafe link: ${url}`);
  }
}

export async function sendEmail({ to, subject, html }: { to: string; subject: string; html: string }) {
  assertSafeEmail(subject, html);
  const res = await fetch(`${EMAIL_BASE_URL}/api/v1/email/send`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-Email-Key": process.env.EMERGENT_EMAIL_KEY as string },
    body: JSON.stringify({ to: [to], subject, html, from_name: process.env.EMAIL_FROM_NAME }),
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    if (["insufficient_credits", "integration_disabled", "daily_limit_reached"].includes(data.code)) {
      console.warn(`Email paused: ${data.code} (${res.status}): ${data.message ?? ""}`);
    } else {
      console.error(`Email send failed: ${res.status} ${JSON.stringify(data)}`);
    }
    return null;
  }
  return ((await res.json()) as { id?: string }).id ?? null;
}
