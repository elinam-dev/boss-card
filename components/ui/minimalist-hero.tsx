"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { CalendarScheduler } from "@/components/ui/calendar-scheduler";
import { HoverBrandLogo } from "@/components/ui/hover-brand-logo";
import SpeechBubble from "@/components/SpeechBubble";

type IconName = "facebook" | "instagram" | "twitter" | "linkedin";

interface MinimalistHeroProps {
  logoText: string;
  imageSrc: string;
  imageAlt: string;
  socialLinks: { icon: IconName; href: string; label: string }[];
  className?: string;
}

const socialPaths: Record<IconName, ReactNode> = {
  facebook: <path d="M14 8h3V4h-3c-3.3 0-5 1.9-5 5v3H6v4h3v8h4v-8h3.2l.8-4H13V9c0-.7.3-1 1-1Z" />,
  instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </>
  ),
  twitter: <path d="M21 7.2v.6A13 13 0 0 1 8.1 21c-2.6 0-5-.8-7-2.2h1.1c2.2 0 4.2-.7 5.8-2a4.5 4.5 0 0 1-4.2-3.1 4.5 4.5 0 0 0 2-.1A4.5 4.5 0 0 1 2.2 9v-.1c.6.3 1.3.5 2 .5A4.5 4.5 0 0 1 2.8 3.4a12.8 12.8 0 0 0 9.3 4.7 4.5 4.5 0 0 1 7.7-4.1 9 9 0 0 0 2.9-1.1 4.5 4.5 0 0 1-2 2.5A9 9 0 0 0 23.3 5a9.7 9.7 0 0 1-2.3 2.2Z" />,
  linkedin: <path d="M5 8H1v13h4V8ZM3 2a2.3 2.3 0 1 0 0 4.6A2.3 2.3 0 0 0 3 2ZM9 8H5v13h4v-6.8c0-1.8.3-3.5 2.6-3.5 2.2 0 2.2 2 2.2 3.6V21h4v-7.5c0-3.7-.8-6.5-5-6.5-2 0-3.3 1.1-3.8 2.1V8Z" />,
};

function SocialIcon({ icon, href, label }: { icon: IconName; href: string; label: string }) {
  return (
    <a href={href} aria-label={label} className="text-foreground/60 transition-colors hover:text-foreground">
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 fill-current stroke-current" strokeWidth="1.5">
        {socialPaths[icon]}
      </svg>
    </a>
  );
}

export function MinimalistHero({
  logoText,
  imageSrc,
  imageAlt,
  socialLinks,
  className,
}: MinimalistHeroProps) {
  const [meetingOpen, setMeetingOpen] = useState(false);
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

  return (
    <main className={cn("relative flex min-h-screen w-full flex-col overflow-hidden bg-background px-6 py-7 font-sans sm:px-10 sm:py-9", className)}>
      <header className="relative z-30 flex w-full max-w-7xl self-center items-center justify-between">
        <div>
          <a href="#" className="animate-name-slide-in font-sora text-xl font-bold tracking-wide text-foreground">{logoText}</a>
          <span className="animate-title-rise absolute left-0 top-8 text-xs font-medium uppercase tracking-[0.2em] text-foreground/70">Technical Director</span>
          <div className="mt-14 w-[min(92vw,31rem)]">
            <SpeechBubble
              text="Solve Rotating and Static Engineering Problems. I help Industries reduce downtime."
              photo="/boss.jpg"
              name="Ing. Godwin Asamoah"
            />
          </div>
        </div>
        <a
          href="https://www.flowitec.com"
          target="_blank"
          rel="noopener noreferrer"
          className="group absolute right-0 top-0 flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-xs font-medium text-navy shadow-sm transition-shadow hover:shadow-md"
        >
          <span>www.flowitec.com</span>
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
          <Image src={imageSrc} alt={imageAlt} width={760} height={960} priority className="animate-portrait relative z-10 h-auto max-h-[720px] w-[27rem] scale-125 object-contain sm:w-[31rem] sm:scale-125 md:w-[31rem] md:scale-150 lg:w-[38rem] lg:scale-[1.65]" />
        </div>

        <div className="order-3" aria-hidden="true" />
      </section>

      <footer className="relative z-30 flex w-full max-w-7xl self-center items-center justify-between">
        <div className="flex items-center gap-4">
          {socialLinks.map((link) => <SocialIcon key={link.label} {...link} />)}
        </div>
        <div ref={meetingRef} className="relative">
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
                  const body = encodeURIComponent(`Hello Ing. Godwin,\n\nI would like to book a meeting on ${date} at ${time}.`);
                  window.location.href = `mailto:godwin.asamoah@flowitec.com?subject=${subject}&body=${body}`;
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
