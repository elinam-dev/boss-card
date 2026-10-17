"use client";

import { useActionState, useState } from "react";
import { CircleCheck, LoaderCircle, Send } from "lucide-react";
import { submitContact, type ContactState } from "@/app/actions";
import { cn } from "@/lib/utils";

const initial: ContactState = { status: "idle" };

export function ContactForm() {
  const [formKey, setFormKey] = useState(0);
  return <ContactFormInner key={formKey} onReset={() => setFormKey((k) => k + 1)} />;
}

function ContactFormInner({ onReset }: { onReset: () => void }) {
  const [state, action, pending] = useActionState(submitContact, initial);

  if (state.status === "success") {
    return (
      <div data-testid="contact-success" className="flex flex-col items-start justify-center gap-5 rounded-3xl bg-white p-8 shadow-[0_20px_40px_-12px_rgba(10,21,48,0.15)] lg:p-12">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-500"><CircleCheck className="h-7 w-7" /></span>
        <h3 className="font-sora text-2xl font-semibold">Message received</h3>
        <p data-testid="contact-success-message" className="text-sm leading-relaxed text-foreground/65">{state.message}</p>
        <button type="button" onClick={onReset} data-testid="contact-send-another-btn" className="rounded-full border border-navy/10 px-5 py-2.5 text-sm font-semibold text-navy transition-colors hover:border-brand hover:text-brand">
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form action={action} noValidate data-testid="contact-form" className="reveal grid grid-cols-1 gap-5 rounded-3xl bg-white p-6 shadow-[0_20px_40px_-12px_rgba(10,21,48,0.15)] sm:grid-cols-2 sm:p-8 lg:p-10">
      <Field name="name" label="Full name" placeholder="Jane Mensah" error={state.errors?.name} required />
      <Field name="email" type="email" label="Email" placeholder="jane@company.com" error={state.errors?.email} required />
      <Field name="phone" type="tel" label="Phone (optional)" placeholder="+233 ..." />
      <Field name="company" label="Company (optional)" placeholder="Company name" />
      <Field name="message" label="How can I help?" placeholder="Describe the equipment, the problem and your timeline..." error={state.errors?.message} textarea required />
      {state.status === "error" && state.message && (
        <p role="alert" data-testid="contact-error" className="text-sm font-medium text-red-500 sm:col-span-2">{state.message}</p>
      )}
      <button type="submit" disabled={pending} data-testid="contact-submit-btn" className="group flex h-12 items-center justify-center gap-2 rounded-full bg-brand px-6 text-sm font-semibold text-white transition-[background-color,transform] duration-200 hover:bg-brand-light active:scale-[0.98] disabled:opacity-60 sm:col-span-2 sm:justify-self-start">
        {pending ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />}
        {pending ? "Sending..." : "Send message"}
      </button>
    </form>
  );
}

type FieldProps = { name: string; label: string; placeholder: string; type?: string; error?: string; textarea?: boolean; required?: boolean };

function Field({ name, label, placeholder, type = "text", error, textarea, required }: FieldProps) {
  const base = cn(
    "w-full rounded-2xl border bg-[#F3F4F6] px-4 py-3 text-sm text-navy placeholder:text-foreground/35 outline-none transition-[border-color,background-color,box-shadow] duration-200 focus:bg-white focus:ring-4 focus:ring-brand-light/20",
    error ? "border-red-400" : "border-transparent focus:border-brand",
  );
  return (
    <label className={cn("flex flex-col gap-2", textarea && "sm:col-span-2")}>
      <span className="text-xs font-semibold text-foreground/70">{label}</span>
      {textarea ? (
        <textarea name={name} rows={5} placeholder={placeholder} required={required} data-testid={`contact-${name}-input`} className={cn(base, "resize-none")} />
      ) : (
        <input name={name} type={type} placeholder={placeholder} required={required} data-testid={`contact-${name}-input`} className={base} />
      )}
      {error && <span data-testid={`contact-${name}-error`} className="text-xs font-medium text-red-500">{error}</span>}
    </label>
  );
}
