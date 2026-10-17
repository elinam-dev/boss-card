"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Mail, MapPin, Phone, ArrowUpRight } from "lucide-react";
import { OFFICES, type Office } from "@/lib/offices";
import { cn } from "@/lib/utils";

const WorldMap = dynamic(() => import("@/components/ui/world-map").then((m) => m.WorldMap), { ssr: false });

const slug = (s: string) => s.toLowerCase().replace(/\s+/g, "-");

export function PresenceMap() {
  const [active, setActive] = useState(OFFICES[0].country);
  const [hq, ...rest] = OFFICES;
  const start = { lat: hq.lat, lng: hq.lng, label: hq.country };
  const dots = rest.map((o) => ({ start, end: { lat: o.lat, lng: o.lng, label: o.country } }));
  const office = OFFICES.find((o) => o.country === active) ?? hq;

  return (
    <div data-testid="presence-map" className="reveal relative">
      <div className="relative aspect-[2/1] w-full overflow-hidden rounded-3xl bg-white/[0.03] ring-1 ring-white/10 lg:aspect-[9/4]">
        <div className="absolute inset-0 origin-[55.3%_62%] scale-[1.9]">
          <WorldMap dots={dots} lineColor="#3B8FE8" dotColor="#FFFFFF55" backgroundColor="transparent" className="h-full" activeLabel={active} onPointClick={setActive} />
        </div>
        <p className="pointer-events-none absolute left-5 top-4 hidden text-[11px] sm:block font-semibold uppercase tracking-[0.2em] text-white/40">Tap a pin to see the office</p>
        <OfficeCard office={office} className="absolute bottom-5 right-5 hidden w-[22rem] lg:block" />
      </div>

      <ul className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {OFFICES.map((o) => (
          <li key={o.country}>
            <button
              type="button"
              onClick={() => setActive(o.country)}
              aria-pressed={active === o.country}
              data-testid={`presence-country-${slug(o.country)}`}
              className={cn(
                "flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left ring-1 transition-[background-color,box-shadow] duration-200",
                active === o.country ? "bg-brand/25 ring-brand-light/60" : "bg-white/5 ring-white/10 hover:bg-white/10",
              )}
            >
              <MapPin className="h-4 w-4 shrink-0 text-brand-light" />
              <span>
                <span className="block font-sora text-sm font-semibold text-white">{o.country}</span>
                <span className="block text-xs text-white/50">{o.city}</span>
              </span>
            </button>
          </li>
        ))}
      </ul>
      <OfficeCard office={office} className="mt-4 lg:hidden" />
    </div>
  );
}

function OfficeCard({ office, className }: { office: Office; className?: string }) {
  const maps = `https://maps.google.com/?q=${encodeURIComponent(office.address)}`;
  return (
    <div key={office.country} data-testid="office-detail-card" className={cn("animate-partner-label rounded-3xl border border-white/15 bg-navy/80 p-6 text-white shadow-2xl backdrop-blur-xl", className)}>
      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-light">{office.country}</p>
      <h3 data-testid="office-detail-company" className="mt-2 font-sora text-lg font-semibold leading-snug">{office.company}</h3>
      <p data-testid="office-detail-address" className="mt-3 text-sm leading-relaxed text-white/65">{office.address}</p>
      <p className="mt-1 text-xs text-white/40">{office.postal}</p>
      <ul className="mt-4 space-y-2 text-sm">
        {office.phones.map((p) => (
          <li key={p}>
            <a href={`tel:${p.replace(/\s+/g, "")}`} data-testid={`office-detail-phone-${p.replace(/\D/g, "")}`} className="flex items-center gap-2 font-medium transition-colors hover:text-brand-light">
              <Phone className="h-3.5 w-3.5 text-brand-light" /> {p}
            </a>
          </li>
        ))}
        <li>
          <a href={`mailto:${office.email}`} data-testid="office-detail-email" className="flex items-center gap-2 font-medium transition-colors hover:text-brand-light">
            <Mail className="h-3.5 w-3.5 text-brand-light" /> {office.email}
          </a>
        </li>
      </ul>
      <a href={maps} target="_blank" rel="noopener noreferrer" data-testid="office-detail-map" className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-brand px-4 py-2 text-xs font-semibold transition-colors hover:bg-brand-light">
        Open in Maps <ArrowUpRight className="h-3.5 w-3.5" />
      </a>
    </div>
  );
}
