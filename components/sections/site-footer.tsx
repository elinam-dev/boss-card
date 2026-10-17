import Image from "next/image";
import type { Person } from "@/lib/person";

export function SiteFooter({ person }: { person: Person }) {
  return (
    <footer data-testid="site-footer" className="border-t border-navy/10 px-6 pb-32 pt-12 sm:px-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <Image src="/logo.png" alt={person.company} width={56} height={56} className="h-14 w-14 object-contain" />
          <div>
            <p className="font-sora text-sm font-semibold">{person.name}</p>
            <p className="text-xs text-foreground/55">{person.title}, {person.company}</p>
          </div>
        </div>
        <p className="font-sora text-sm font-semibold text-brand">{person.tagline}</p>
      </div>
    </footer>
  );
}
