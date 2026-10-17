"use client";

import Image from "next/image";
import { ArrowUpRight, MapPin } from "lucide-react";
import SpeechBubble from "@/components/SpeechBubble";
import { PartnerGrid, PartnerLabel, usePartnerCycle } from "@/components/ui/hover-brand-logo";
import type { Person } from "@/lib/person";

export function MinimalistHero({ person }: { person: Person }) {
  const cycle = usePartnerCycle();

  return (
    <main data-testid="hero-section" className="relative isolate w-full overflow-hidden px-6 pt-7 sm:px-10 lg:min-h-[100svh]">
      <div aria-hidden="true" className="hero-glow" />

      <header className="relative z-30 mx-auto flex w-full max-w-7xl items-start justify-between gap-4">
        <div>
          <h1 data-testid="hero-name" className="animate-name-slide-in font-sora text-[1.7rem] font-bold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            {person.name}
          </h1>
          <p data-testid="hero-title" className="animate-title-rise mt-3 flex items-center gap-3 whitespace-nowrap text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground/65 sm:text-xs sm:tracking-[0.25em]">
            <span className="h-px w-6 bg-brand sm:w-8" />
            {person.title} · {person.company}
          </p>
        </div>
        <WebsitePill website={person.website} />
      </header>

      <section className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 lg:min-h-[calc(100svh-8rem)] lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)_minmax(0,0.9fr)]">
        <div className="relative z-20 flex flex-col gap-10 pt-8 lg:pt-12">
          <div className="max-w-md lg:-mr-24 lg:max-w-none">
            <SpeechBubble text={person.bio} />
          </div>
          <PartnerLabel active={cycle.active} className="hidden lg:block" />
          <p className="hidden items-center gap-2 text-sm font-medium text-foreground/60 lg:flex">
            <MapPin className="h-4 w-4 text-brand" /> {person.location} · {person.addresses.map((a) => a.label).join(" & ")}
          </p>
        </div>

        <Portrait name={person.name} title={person.title} />

        <div className="relative z-20 flex flex-col gap-6 pb-32 pt-8 lg:justify-center lg:pb-40 lg:pt-0">
          <PartnerLabel active={cycle.active} className="lg:hidden" />
          <PartnerGrid {...cycle} />
          <p data-testid="hero-tagline" className="hidden font-sora text-sm font-semibold text-brand lg:block">{person.tagline}</p>
        </div>
      </section>
    </main>
  );
}

function WebsitePill({ website }: { website: string }) {
  return (
    <a
      href={website}
      target="_blank"
      rel="noopener noreferrer"
      data-testid="website-link"
      className="group flex shrink-0 items-center gap-2 rounded-full border border-white/60 bg-white/80 py-1.5 pl-4 pr-1.5 text-xs font-semibold text-navy shadow-sm backdrop-blur-xl transition-shadow duration-300 hover:shadow-md"
    >
      <span className="hidden sm:inline">{website.replace("https://", "").replace("www.", "")}</span>
      <span className="sm:hidden">Website</span>
      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand text-white transition-transform duration-300 group-hover:rotate-45">
        <ArrowUpRight className="h-3.5 w-3.5" />
      </span>
    </a>
  );
}

function Portrait({ name, title }: { name: string; title: string }) {
  return (
    <div className="relative flex min-h-[360px] items-end justify-center sm:min-h-[520px] lg:min-h-0">
      <Image
        src="/logo1.png"
        alt=""
        aria-hidden="true"
        width={700}
        height={700}
        priority
        className="animate-scale-in absolute bottom-[22%] left-1/2 h-[220px] w-[220px] -translate-x-[30%] sm:bottom-[18%] sm:-translate-x-[35%] object-contain opacity-90 mix-blend-multiply sm:h-[380px] sm:w-[380px] lg:h-[420px] lg:w-[420px]"
      />
      <Image
        src="/boss.png"
        alt={`${name} - ${title}`}
        width={1448}
        height={1086}
        priority
        data-testid="hero-portrait"
        className="animate-portrait relative z-10 w-[150%] max-w-none translate-x-[6%] object-contain sm:w-[120%] lg:w-[170%] lg:translate-x-[6%]"
      />
    </div>
  );
}
