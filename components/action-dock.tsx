"use client";

import { useEffect, useRef, useState } from "react";
import { CalendarDays, Check, Mail, MessageCircle, Phone, UserPlus } from "lucide-react";
import { CalendarScheduler } from "@/components/ui/calendar-scheduler";
import { cn } from "@/lib/utils";
import type { Person } from "@/lib/person";

function downloadVCard(person: Person) {
  const vcard = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `FN:${person.name}`,
    `ORG:${person.company}`,
    `TITLE:${person.title}`,
    `EMAIL:${person.email}`,
    `URL:${person.website}`,
    ...person.phones.map((phone) => `TEL;TYPE=WORK:${phone.number}`),
    ...person.addresses.map((a) => `ADR;TYPE=WORK:;;${a.address}`),
    "END:VCARD",
  ].join("\n");
  const url = URL.createObjectURL(new Blob([vcard], { type: "text/vcard" }));
  const link = document.createElement("a");
  link.href = url;
  link.download = `${person.name.replace(/\s+/g, "_")}.vcf`;
  link.click();
  URL.revokeObjectURL(url);
}

const pill = "flex h-11 items-center justify-center gap-2 rounded-full px-3.5 text-xs font-semibold transition-[background-color,color,transform,box-shadow] duration-200 active:scale-95 sm:px-4";

export function ActionDock({ person }: { person: Person }) {
  const [saved, setSaved] = useState(false);

  const save = () => {
    downloadVCard(person);
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2000);
  };

  return (
    <nav data-testid="action-dock" aria-label="Quick contact" className="fixed inset-x-0 bottom-0 z-50 px-3 pb-3 sm:px-6 sm:pb-5">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 rounded-full border border-white/60 bg-white/70 p-1.5 shadow-[0_20px_40px_-8px_rgba(10,21,48,0.25)] backdrop-blur-xl">
        <div className="flex items-center gap-1 sm:gap-1.5">
          <button type="button" onClick={save} data-testid="save-contact-btn" className={cn(pill, "bg-brand text-white hover:bg-brand-light")}>
            {saved ? <Check className="h-4 w-4" /> : <UserPlus className="h-4 w-4" />}
            <span className="hidden sm:inline">{saved ? "Saved" : "Save Contact"}</span>
          </button>
          <a href={person.whatsapp.url} target="_blank" rel="noopener noreferrer" data-testid="whatsapp-btn" aria-label="WhatsApp" className={cn(pill, "bg-[#25D366] text-white hover:bg-[#1FB457]")}>
            <MessageCircle className="h-4 w-4" />
            <span className="hidden sm:inline">WhatsApp</span>
          </a>
          <a href={person.phones[0].tel} data-testid="call-btn" aria-label="Call" className={cn(pill, "text-brand hover:bg-brand hover:text-white")}>
            <Phone className="h-4 w-4" />
            <span className="hidden sm:inline">Call</span>
          </a>
          <a href={`mailto:${person.email}`} data-testid="email-btn" aria-label="Email" className={cn(pill, "text-brand hover:bg-brand hover:text-white")}>
            <Mail className="h-4 w-4" />
            <span className="hidden md:inline">Email</span>
          </a>
        </div>
        <MeetingButton person={person} />
      </div>
    </nav>
  );
}

function MeetingButton({ person }: { person: Person }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const close = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        data-testid="book-meeting-btn"
        className={cn(pill, "group bg-navy pl-4 pr-1.5 text-white hover:bg-[#13224a]")}
      >
        <span><span className="hidden sm:inline">Book a </span>meeting</span>
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand transition-transform duration-300 group-hover:rotate-12">
          <CalendarDays className="h-4 w-4" />
        </span>
      </button>
      {open && (
        <div className="animate-meeting-menu absolute bottom-14 right-0 z-40 w-[min(92vw,600px)]">
          <CalendarScheduler
            onConfirm={({ date, time }) => {
              const subject = encodeURIComponent("Meeting request");
              const body = encodeURIComponent(`Hello ${person.name},\n\nI would like to book a meeting on ${date} at ${time}.`);
              window.location.href = `mailto:${person.email}?subject=${subject}&body=${body}`;
              setOpen(false);
            }}
          />
        </div>
      )}
    </div>
  );
}
