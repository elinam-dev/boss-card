import "server-only";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

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
  
  try {
    const { data, error } = await resend.emails.send({
      from: `${process.env.EMAIL_FROM_NAME} <${process.env.EMAIL_FROM}>`,
      to: [to],
      subject,
      html,
    });

    if (error) {
      console.error('Resend error:', error);
      return null;
    }

    return data?.id ?? null;
  } catch (err) {
    console.error('Email send failed:', err);
    return null;
  }
}
