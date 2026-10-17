"use client";

import { MapPin } from "lucide-react";
import dynamic from "next/dynamic";

const WorldMap = dynamic(() => import("@/components/ui/world-map").then((m) => m.WorldMap), { ssr: false });

const HQ = { lat: 5.6698, lng: -0.0166, label: "Ghana" };

export const COUNTRIES = [
  { name: "Ghana", city: "Tema, Accra (HQ)", ...HQ },
  { name: "Nigeria", city: "Lagos", lat: 6.5244, lng: 3.3792 },
  { name: "Kenya", city: "Nairobi", lat: -1.2921, lng: 36.8219 },
  { name: "South Africa", city: "Johannesburg", lat: -26.2041, lng: 28.0473 },
];

export function PresenceMap() {
  const dots = COUNTRIES.slice(1).map((c) => ({ start: HQ, end: { lat: c.lat, lng: c.lng, label: c.name } }));

  return (
    <div data-testid="presence-map" className="reveal relative">
      <div className="relative aspect-[2/1] w-full overflow-hidden rounded-3xl bg-white/[0.03] ring-1 ring-white/10 lg:aspect-[9/4]">
        <div className="absolute inset-0 origin-[55.3%_62%] scale-[1.9]">
          <WorldMap dots={dots} lineColor="#3B8FE8" dotColor="#FFFFFF55" backgroundColor="transparent" className="h-full" />
        </div>
      </div>
      <ul className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {COUNTRIES.map((c) => (
          <li key={c.name} data-testid={`presence-country-${c.name.toLowerCase().replace(/\s+/g, "-")}`} className="flex items-center gap-3 rounded-2xl bg-white/5 px-4 py-3 ring-1 ring-white/10">
            <MapPin className="h-4 w-4 shrink-0 text-brand-light" />
            <span>
              <span className="block font-sora text-sm font-semibold text-white">{c.name}</span>
              <span className="block text-xs text-white/50">{c.city}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
