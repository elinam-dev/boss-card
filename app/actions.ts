"use server";

import { getDb } from "@/lib/db";

type Field = "name" | "email" | "phone" | "company" | "date" | "time" | "message";

export type ContactState = {
  status: "idle" | "success" | "error";
  attempt: number;
  message?: string;
  errors?: Partial<Record<Field, string>>;
  values?: Partial<Record<Field, string>>;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

export async function submitContact(prev: ContactState, formData: FormData): Promise<ContactState> {
  const field = (key: Field, max: number) => String(formData.get(key) ?? "").trim().slice(0, max);
  const data = {
    name: field("name", 100),
    email: field("email", 160),
    phone: field("phone", 30),
    company: field("company", 120),
    date: field("date", 10),
    time: field("time", 10),
    message: field("message", 3000),
  };
  const attempt = prev.attempt + 1;

  const errors: ContactState["errors"] = {};
  if (data.name.length < 2) errors.name = "Please enter your name.";
  if (!EMAIL_RE.test(data.email)) errors.email = "Please enter a valid email address.";
  if (data.date && !DATE_RE.test(data.date)) errors.date = "Please pick a valid date.";
  if (data.message.length < 10) errors.message = "Tell me a little more (at least 10 characters).";
  if (Object.keys(errors).length) {
    return { status: "error", attempt, errors, values: data, message: "Please check the highlighted fields." };
  }

  try {
    const db = await getDb();
    await db.collection("contact_messages").insertOne({ ...data, created_at: new Date().toISOString() });
  } catch {
    return { status: "error", attempt, values: data, message: "Your request couldn't be sent right now. Please try email instead." };
  }

  const when = data.date ? ` for ${data.date}${data.time ? ` at ${data.time}` : ""}` : "";
  return { status: "success", attempt, message: `Thanks ${data.name.split(" ")[0]}, your meeting request${when} is in. I'll confirm by email shortly.` };
}
