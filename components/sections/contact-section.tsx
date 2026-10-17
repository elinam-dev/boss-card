import { Mail, MessageCircle, Phone } from "lucide-react";
import { ContactForm } from "@/components/sections/contact-form";
import type { Person } from "@/lib/person";

export function ContactSection({ person }: { person: Person }) {
  const channels = [
    { icon: Mail, label: "Email", value: person.email, href: `mailto:${person.email}` },
    { icon: MessageCircle, label: "WhatsApp", value: person.whatsapp.displayNumber, href: person.whatsapp.url },
    ...person.phones.map((p) => ({ icon: Phone, label: p.label, value: p.number, href: p.tel })),
  ];

  return (
    <section id="contact" data-testid="contact-section" className="relative overflow-hidden px-6 pb-24 sm:px-10 lg:pb-32">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-14 rounded-[2.5rem] bg-white/50 p-6 ring-1 ring-white/70 sm:p-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20 lg:p-16">
        <div className="reveal">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand">Book a meeting</p>
          <h2 className="mt-4 font-sora text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
            Facing downtime? Let&apos;s meet and solve it.
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-foreground/65">
            Pick a date and time that suits you and tell me about your pumps, valves, motors or process challenge. I&apos;ll confirm the meeting by email.
          </p>
          <ul className="mt-10 space-y-3">
            {channels.map(({ icon: Icon, label, value, href }) => (
              <li key={label}>
                <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" data-testid={`contact-channel-${label.toLowerCase().replace(/\s+/g, "-")}`} className="group flex items-center gap-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-brand shadow-sm transition-[background-color,color] duration-300 group-hover:bg-brand group-hover:text-white">
                    <Icon className="h-4 w-4" />
                  </span>
                  <span>
                    <span className="block text-[11px] font-semibold uppercase tracking-[0.2em] text-foreground/45">{label}</span>
                    <span className="block text-sm font-semibold text-navy transition-colors group-hover:text-brand">{value}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
