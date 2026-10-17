"use client";

import { useActionState, useEffect, useState } from "react";
import { CalendarDays, CircleCheck, LoaderCircle } from "lucide-react";
import { submitContact, type ContactState } from "@/app/actions";
import { cn } from "@/lib/utils";

const initial: ContactState = { status: "idle", attempt: 0 };
const SLOTS = ["08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM"];

export function ContactForm() {
  const [formKey, setFormKey] = useState(0);
  return <ContactFormInner key={formKey} onReset={() => setFormKey((k) => k + 1)} />;
}

function ContactFormInner({ onReset }: { onReset: () => void }) {
  const [state, action, pending] = useActionState(submitContact, initial);
  const [today, setToday] = useState<string>();
  useEffect(() => setToday(new Date().toLocaleDateString("en-CA")), []);
  useEffect(() => {
    const first = state.errors && Object.keys(state.errors)[0];
    if (first) document.querySelector<HTMLElement>(`[data-testid="contact-${first}-input"]`)?.focus();
  }, [state.attempt, state.errors]);

  if (state.status === "success") {
    return (
      <div data-testid="contact-success" className="flex flex-col items-start justify-center gap-5 rounded-3xl bg-white p-8 shadow-[0_20px_40px_-12px_rgba(10,21,48,0.15)] lg:p-12">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-500"><CircleCheck className="h-7 w-7" /></span>
        <h3 className="font-sora text-2xl font-semibold">Request received</h3>
        <p data-testid="contact-success-message" className="text-sm leading-relaxed text-foreground/65">{state.message}</p>
        <button type="button" onClick={onReset} data-testid="contact-send-another-btn" className="rounded-full border border-navy/10 px-5 py-2.5 text-sm font-semibold text-navy transition-colors hover:border-brand hover:text-brand">
          Book another meeting
        </button>
      </div>
    );
  }

  const v = state.values ?? {};
  const e = state.errors ?? {};

  return (
    <form key={state.attempt} action={action} noValidate data-testid="contact-form" className="grid grid-cols-1 gap-5 rounded-3xl bg-white p-6 shadow-[0_20px_40px_-12px_rgba(10,21,48,0.15)] sm:grid-cols-2 sm:p-8 lg:p-10">
      <Field name="name" label="Full name" placeholder="Jane Mensah" value={v.name} error={e.name} />
      <Field name="email" type="email" label="Email" placeholder="jane@company.com" value={v.email} error={e.email} />
      <Field name="phone" type="tel" label="Phone (optional)" placeholder="+233 ..." value={v.phone} />
      <Field name="company" label="Company (optional)" placeholder="Company name" value={v.company} />
      <Field name="date" type="date" label="Preferred date" placeholder="" value={v.date} error={e.date} min={today} />
      <label className="flex flex-col gap-2">
        <span className="text-xs font-semibold text-foreground/70">Preferred time</span>
        <select name="time" defaultValue={v.time ?? ""} data-testid="contact-time-select" className={inputClass()}>
          <option value="">Any time</option>
          {SLOTS.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </label>
      <Field name="message" label="What would you like to discuss?" placeholder="Describe the equipment, the problem and your timeline..." value={v.message} error={e.message} textarea />
      {state.status === "error" && state.message && (
        <p role="alert" data-testid="contact-error" className="text-sm font-medium text-red-500 sm:col-span-2">{state.message}</p>
      )}
      <button type="submit" disabled={pending} data-testid="contact-submit-btn" className="group flex h-12 items-center justify-center gap-2 rounded-full bg-brand px-6 text-sm font-semibold text-white transition-[background-color,transform] duration-200 hover:bg-brand-light active:scale-[0.98] disabled:opacity-60 sm:col-span-2 sm:justify-self-start">
        {pending ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <CalendarDays className="h-4 w-4" />}
        {pending ? "Sending..." : "Request meeting"}
      </button>
    </form>
  );
}

function inputClass(error?: string) {
  return cn(
    "w-full rounded-2xl border bg-[#F3F4F6] px-4 py-3 text-sm text-navy placeholder:text-foreground/35 outline-none transition-[border-color,background-color,box-shadow] duration-200 focus:bg-white focus:ring-4 focus:ring-brand-light/20",
    error ? "border-red-400" : "border-transparent focus:border-brand",
  );
}

type FieldProps = { name: string; label: string; placeholder: string; type?: string; value?: string; error?: string; textarea?: boolean; min?: string };

function Field({ name, label, placeholder, type = "text", value, error, textarea, min }: FieldProps) {
  return (
    <label className={cn("flex flex-col gap-2", textarea && "sm:col-span-2")}>
      <span className="text-xs font-semibold text-foreground/70">{label}</span>
      {textarea ? (
        <textarea name={name} rows={5} placeholder={placeholder} defaultValue={value} data-testid={`contact-${name}-input`} className={cn(inputClass(error), "resize-none")} />
      ) : (
        <input name={name} type={type} placeholder={placeholder} defaultValue={value} min={min} data-testid={`contact-${name}-input`} className={inputClass(error)} />
      )}
      {error && <span data-testid={`contact-${name}-error`} className="text-xs font-medium text-red-500">{error}</span>}
    </label>
  );
}
