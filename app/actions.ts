"use server";

import { getDb } from "@/lib/db";

export type ContactState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Partial<Record<"name" | "email" | "message", string>>;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function submitContact(_prev: ContactState, formData: FormData): Promise<ContactState> {
  const field = (key: string, max: number) => String(formData.get(key) ?? "").trim().slice(0, max);
  const data = {
    name: field("name", 100),
    email: field("email", 160),
    phone: field("phone", 30),
    company: field("company", 120),
    message: field("message", 3000),
  };

  const errors: ContactState["errors"] = {};
  if (data.name.length < 2) errors.name = "Please enter your name.";
  if (!EMAIL_RE.test(data.email)) errors.email = "Please enter a valid email address.";
  if (data.message.length < 10) errors.message = "Tell me a little more (at least 10 characters).";
  if (Object.keys(errors).length) return { status: "error", errors, message: "Please check the highlighted fields." };

  try {
    const db = await getDb();
    await db.collection("contact_messages").insertOne({ ...data, created_at: new Date().toISOString() });
  } catch {
    return { status: "error", message: "Your message couldn't be sent right now. Please try WhatsApp or email." };
  }

  return { status: "success", message: `Thanks ${data.name.split(" ")[0]}, your message is in. I'll get back to you shortly.` };
}
