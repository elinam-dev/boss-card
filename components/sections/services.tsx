import { Cog, Droplets, Gauge, SlidersHorizontal, Wrench, Zap, type LucideIcon } from "lucide-react";
import { PresenceMap } from "@/components/sections/presence-map";
import type { Person } from "@/lib/person";

const DETAILS: Record<string, { icon: LucideIcon; text: string }> = {
  Pumps: { icon: Droplets, text: "Selection, supply and troubleshooting for water, process and industrial duty." },
  Valves: { icon: Gauge, text: "Isolation, control and check valves matched to your pressure and flow." },
  "Electric Motors": { icon: Zap, text: "Efficient motors sized to the load, with installation support." },
  Actuators: { icon: Cog, text: "Electric and pneumatic actuation for reliable, automated valve control." },
  Controls: { icon: SlidersHorizontal, text: "Controls that protect equipment, stabilise processes and save energy." },
  Spares: { icon: Wrench, text: "Genuine spares from the brands we represent, so you get back online fast." },
};

export function Services({ person }: { person: Person }) {
  return (
    <section id="services" data-testid="services-section" className="relative bg-navy px-6 py-24 text-white sm:px-10 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <PresenceMap />

        <ul className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-3xl bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
          {person.services.map((service, i) => {
            const { icon: Icon, text } = DETAILS[service];
            return (
              <li key={service} data-testid={`service-card-${service.toLowerCase().replace(/\s+/g, "-")}`} className="reveal group relative bg-navy p-8 transition-colors duration-300 hover:bg-[#0f1d40] lg:p-10">
                <span className="absolute right-8 top-8 font-sora text-xs font-semibold text-white/25">0{i + 1}</span>
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand/15 text-brand-light transition-[background-color,color,transform] duration-300 group-hover:-translate-y-1 group-hover:bg-brand group-hover:text-white">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-8 font-sora text-xl font-semibold">{service}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/60">{text}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
