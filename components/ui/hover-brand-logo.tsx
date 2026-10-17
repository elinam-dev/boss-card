"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export const partners = [
  { name: "C.R.I. Pumps", src: "/cri_pumps.png" },
  { name: "SAER Elettropompe", src: "/saer.jpg" },
  { name: "Bray", src: "/bray.jpeg" },
  { name: "Ecodepur", src: "/ecodepur.jpg" },
  { name: "Meson Group", src: "/meson.jpg" },
  { name: "Franklin Electric", src: "/franklin-electric-logo.jpg" },
  { name: "Fluimac", src: "/fluimac.jpg" },
  { name: "Pioneer Pump", src: "/pioneer.jpg" },
  { name: "Jesco", src: "/jesco.jpg" },
  { name: "Bellin", src: "/bellin.jpg" },
];

export function usePartnerCycle() {
  const [active, setActive] = useState(partners[0].name);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const cycle = window.setInterval(() => {
      setActive((current) => {
        const index = partners.findIndex((p) => p.name === current);
        return partners[(index + 1) % partners.length].name;
      });
    }, 2200);
    return () => window.clearInterval(cycle);
  }, [paused]);

  return { active, setActive, setPaused };
}

export function PartnerLabel({ active, className }: { active: string; className?: string }) {
  return (
    <div className={cn("w-full", className)}>
      <p className="mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-foreground/55">Authorised Distributor for</p>
      <div className="relative h-9 overflow-hidden lg:h-11">
        <p key={active} data-testid="partner-active-name" className="animate-partner-label font-sora text-2xl font-bold tracking-tight text-foreground lg:text-[2rem]">
          {active}
        </p>
      </div>
    </div>
  );
}

export function PartnerGrid({ active, setActive, setPaused }: ReturnType<typeof usePartnerCycle>) {
  return (
    <div data-testid="partner-grid" className="grid grid-cols-5 gap-2 sm:gap-3">
      {partners.map((partner) => {
        const isActive = active === partner.name;
        return (
          <button
            key={partner.name}
            type="button"
            aria-label={partner.name}
            data-testid={`partner-logo-${partner.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
            onMouseEnter={() => { setPaused(true); setActive(partner.name); }}
            onMouseLeave={() => setPaused(false)}
            onFocus={() => { setPaused(true); setActive(partner.name); }}
            onBlur={() => setPaused(false)}
            className={cn(
              "flex aspect-square items-center justify-center rounded-xl border bg-white p-2 transition-[transform,opacity,filter,box-shadow,border-color] duration-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-light",
              isActive
                ? "scale-110 border-brand/40 opacity-100 grayscale-0 shadow-[0_12px_28px_-8px_rgba(11,92,184,0.35)]"
                : "border-navy/5 opacity-40 grayscale hover:opacity-70",
            )}
          >
            <Image src={partner.src} alt={partner.name} width={150} height={90} className="max-h-full w-full object-contain mix-blend-multiply" />
          </button>
        );
      })}
    </div>
  );
}
