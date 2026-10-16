"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { CalendarScheduler } from "@/components/ui/calendar-scheduler";
import { HoverBrandLogo } from "@/components/ui/hover-brand-logo";
import SpeechBubble from "@/components/SpeechBubble";

interface MinimalistHeroProps {
  person: {
    name: string;
    title: string;
    company: string;
    tagline: string;
    bio: string;
    phones: Array<{ label: string; number: string; tel: string }>;
    whatsapp: { number: string; displayNumber: string; url: string };
    email: string;
    website: string;
    services: string[];
    location: string;
    addresses: Array<{ label: string; address: string; mapsUrl: string }>;
    social: Array<{ platform: string; url: string }>;
  };
  className?: string;
}

function generateVCard(person: MinimalistHeroProps["person"]) {
  const vcard = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `FN:${person.name}`,
    `ORG:${person.company}`,
    `TITLE:${person.title}`,
    `EMAIL:${person.email}`,
    `URL:${person.website}`,
    ...person.phones.map((phone) => `TEL;TYPE=WORK:${phone.number}`),
    person.addresses[0] ? `ADR;TYPE=WORK:;;${person.addresses[0].address.replace(/\n/g, ";")}` : "",
    "END:VCARD",
  ]
    .filter(Boolean)
    .join("\n");

  return vcard;
}

export function MinimalistHero({ person, className }: MinimalistHeroProps) {
  const [meetingOpen, setMeetingOpen] = useState(false);
  const [saved, setSaved] = useState(false);
  const meetingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!meetingOpen) return;

    const closeOnOutsideClick = (event: MouseEvent) => {
      if (meetingRef.current && !meetingRef.current.contains(event.target as Node)) {
        setMeetingOpen(false);
      }
    };

    document.addEventListener("mousedown", closeOnOutsideClick);
    return () => document.removeEventListener("mousedown", closeOnOutsideClick);
  }, [meetingOpen]);

  const handleSaveContact = () => {
    const vcard = generateVCard(person);
    const blob = new Blob([vcard], { type: "text/vcard" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${person.name.replace(/\s+/g, "_")}.vcf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <main className={cn("relative flex min-h-screen w-full flex-col overflow-hidden bg-background px-6 py-7 font-sans sm:px-10 sm:py-9", className)}>
      <header className="relative z-30 flex w-full max-w-7xl self-center items-start justify-between">
        <div className="flex-1 max-w-xl">
          <a href="#" className="animate-name-slide-in font-sora text-xl font-bold tracking-wide text-foreground">
            {person.name}
          </a>
          <span className="animate-title-rise block mt-2 text-xs font-medium uppercase tracking-[0.2em] text-foreground/70">
            {person.title}
          </span>
          <div className="mt-10 w-full max-w-[20rem]">
            <SpeechBubble text={person.bio} photo="/boss.png" name={person.name} />
          </div>
        </div>
        <a
          href={person.website}
          target="_blank"
          rel="noopener noreferrer"
          className="group absolute right-0 top-0 flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-xs font-medium text-navy shadow-sm transition-shadow hover:shadow-md"
        >
          <span>{person.website.replace("https://", "").replace("www.", "")}</span>
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand text-white transition-transform group-hover:translate-x-0.5">
            <svg aria-hidden="true" viewBox="0 0 24 24" className="h-3 w-3">
              <path d="M5 12h13M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </a>
        <div className="absolute left-0 top-[calc(100%+12rem)] w-[min(96vw,800px)]">
          <HoverBrandLogo compact />
        </div>
      </header>

      <section className="relative z-10 mx-auto grid w-full max-w-7xl flex-1 grid-cols-1 items-center gap-8 py-12 md:grid-cols-3 md:gap-0 md:py-0">
        <div className="order-2" aria-hidden="true" />

        <div className="relative order-1 flex h-full min-h-[320px] items-center justify-center md:order-2">
          <Image
            src="/logo1.png"
            alt="Flowitec"
            width={700}
            height={700}
            priority
            className="animate-scale-in absolute h-[350px] w-[350px] rounded-full object-contain mix-blend-multiply sm:h-[460px] sm:w-[460px] lg:h-[400px] lg:w-[400px]"
          />
          <Image
            src="/boss.png"
            alt={`${person.name} - ${person.title}`}
            width={760}
            height={960}
            priority
            className="animate-portrait relative z-10 h-auto max-h-[720px] w-[27rem] scale-125 object-contain sm:w-[31rem] sm:scale-125 md:w-[31rem] md:scale-150 lg:w-[38rem] lg:scale-[1.65]"
          />
        </div>

        <div className="order-3" aria-hidden="true" />
      </section>

      <footer className="relative z-30 flex w-full max-w-7xl self-center items-center justify-between flex-wrap gap-4">
        {/* Quick Action Buttons - Mobile First */}
        <div className="flex items-center gap-3 order-1 w-full sm:w-auto sm:order-2">
          <button
            type="button"
            onClick={handleSaveContact}
            className="flex items-center gap-2 rounded-full bg-brand px-4 py-2 text-xs font-medium text-white shadow-sm transition-all hover:bg-brand-light hover:shadow-md"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span>{saved ? "Saved ✓" : "Save Contact"}</span>
          </button>

          <a
            href={person.whatsapp.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-2 text-xs font-medium text-white shadow-sm transition-all hover:bg-[#20BA5A] hover:shadow-md"
          >
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
            <span>WhatsApp</span>
          </a>

          <a
            href={person.phones[0].tel}
            className="flex items-center gap-2 rounded-full bg-white border border-brand/20 px-4 py-2 text-xs font-medium text-brand shadow-sm transition-all hover:bg-brand hover:text-white hover:shadow-md"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span>Call</span>
          </a>

          <a
            href={`mailto:${person.email}`}
            className="flex items-center gap-2 rounded-full bg-white border border-brand/20 px-4 py-2 text-xs font-medium text-brand shadow-sm transition-all hover:bg-brand hover:text-white hover:shadow-md"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span>Email</span>
          </a>
        </div>

        {/* Book Meeting Button */}
        <div ref={meetingRef} className="relative order-2 sm:order-3">
          <button
            type="button"
            onClick={() => setMeetingOpen((open) => !open)}
            aria-expanded={meetingOpen}
            className="group flex items-center gap-3 rounded-full bg-white px-4 py-2 text-xs font-medium text-navy shadow-sm transition-shadow hover:shadow-md"
          >
            <span>Book a meeting</span>
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand text-white transition-transform group-hover:translate-x-1">
              <svg aria-hidden="true" viewBox="0 0 24 24" className="h-3 w-3">
                <path d="M5 12h13M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </button>
          {meetingOpen && (
            <div className="animate-meeting-menu absolute bottom-12 right-0 z-40 w-[min(92vw,600px)]">
              <CalendarScheduler
                onConfirm={({ date, time }) => {
                  const subject = encodeURIComponent("Meeting request");
                  const body = encodeURIComponent(`Hello ${person.name},\n\nI would like to book a meeting on ${date} at ${time}.`);
                  window.location.href = `mailto:${person.email}?subject=${subject}&body=${body}`;
                  setMeetingOpen(false);
                }}
              />
            </div>
          )}
        </div>
      </footer>
    </main>
  );
}
