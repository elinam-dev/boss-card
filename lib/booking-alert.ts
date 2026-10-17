import "server-only";
import { escapeHtml, sendEmail } from "@/lib/email";

type Booking = { name: string; email: string; phone: string; company: string; date: string; time: string; message: string };

export async function sendBookingAlert(b: Booking) {
  const to = process.env.ALERT_EMAIL;
  if (!to) return null;
  const e = (v: string) => escapeHtml(v || "—");
  const when = b.date ? `${b.date}${b.time ? ` at ${b.time}` : ""}` : "No preferred time";
  const row = (label: string, value: string) =>
    `<tr><td style="padding:6px 0;color:#6b7280;font-size:13px;width:120px;vertical-align:top">${label}</td><td style="padding:6px 0;color:#0A1530;font-size:14px">${value}</td></tr>`;

  const html = `<table role="presentation" width="100%" style="background:#E5E7EB;padding:24px 0"><tr><td align="center">
<table role="presentation" width="560" style="background:#ffffff;border-radius:16px;padding:32px;font-family:Arial,sans-serif">
<tr><td style="color:#0B5CB8;font-size:12px;font-weight:bold;letter-spacing:2px;text-transform:uppercase">New meeting request</td></tr>
<tr><td style="padding:8px 0 20px;color:#0A1530;font-size:22px;font-weight:bold">${e(b.name)} wants to meet</td></tr>
<tr><td><table role="presentation" width="100%">
${row("Preferred time", e(when))}
${row("Email", `<a href="mailto:${escapeHtml(b.email)}" style="color:#0B5CB8">${e(b.email)}</a>`)}
${row("Phone", b.phone ? `<a href="tel:${escapeHtml(b.phone.replace(/[^+\d]/g, ""))}" style="color:#0B5CB8">${e(b.phone)}</a>` : "—")}
${row("Company", e(b.company))}
</table></td></tr>
<tr><td style="padding-top:20px;color:#6b7280;font-size:13px">Message</td></tr>
<tr><td style="padding:8px 0 0;color:#0A1530;font-size:14px;line-height:1.6;white-space:pre-wrap">${e(b.message)}</td></tr>
<tr><td style="padding-top:28px;color:#9ca3af;font-size:12px">Sent by Flowitec from your digital business card booking form.</td></tr>
</table></td></tr></table>`;

  return sendEmail({ to, subject: `New meeting request from ${b.name.slice(0, 60)}`, html });
}
