import { ArrowUpRight, MapPin, Phone } from "lucide-react";
import type { Person } from "@/lib/person";

export function Offices({ person }: { person: Person }) {
  return (
    <section id="offices" data-testid="offices-section" className="px-6 py-24 sm:px-10 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="reveal max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand">Where to find us</p>
          <h2 className="mt-4 font-sora text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
            {person.location}, with feet on the ground.
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
          {person.addresses.map((office) => {
            const phone = person.phones.find((p) => p.label === office.label);
            const slug = office.label.toLowerCase().replace(/\s+/g, "-");
            return (
              <article key={office.label} data-testid={`office-card-${slug}`} className="reveal group flex flex-col justify-between gap-10 rounded-3xl border border-white/70 bg-white p-8 shadow-[0_4px_20px_-4px_rgba(10,21,48,0.08)] transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_16px_36px_-8px_rgba(10,21,48,0.16)] lg:p-10">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand/10 text-brand"><MapPin className="h-4 w-4" /></span>
                    <h3 className="font-sora text-2xl font-semibold">{office.label}</h3>
                  </div>
                  <p className="mt-6 max-w-md text-sm leading-relaxed text-foreground/65">{office.address}</p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  {phone && (
                    <a href={phone.tel} data-testid={`office-phone-${slug}`} className="flex items-center gap-2 rounded-full border border-navy/10 px-4 py-2 text-sm font-semibold text-navy transition-colors hover:border-brand hover:text-brand">
                      <Phone className="h-4 w-4" /> {phone.number}
                    </a>
                  )}
                  <a href={office.mapsUrl} target="_blank" rel="noopener noreferrer" data-testid={`office-map-${slug}`} className="flex items-center gap-2 rounded-full bg-navy px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand">
                    Open in Maps <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45" />
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
