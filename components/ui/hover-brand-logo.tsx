"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const partners = [
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

export function HoverBrandLogo({ compact = false }: { compact?: boolean }) {
  const [hoveredName, setHoveredName] = useState<string>();
  const [isPointerOver, setIsPointerOver] = useState(false);

  useEffect(() => {
    const cycle = window.setInterval(() => {
      if (isPointerOver) return;

      setHoveredName((currentName) => {
        const currentIndex = partners.findIndex((partner) => partner.name === currentName);
        return partners[(currentIndex + 1) % partners.length].name;
      });
    }, 2200);

    return () => window.clearInterval(cycle);
  }, [isPointerOver]);

  return (
    <section className={cn(
      compact
        ? "flex items-center"
        : "border-t border-navy/10 bg-background px-6 py-16 sm:px-10 sm:py-24",
    )} aria-labelledby="partners-heading">
      <div className={cn(
        "mx-auto flex w-full items-center",
        compact ? "justify-start gap-10" : "justify-between flex-col gap-10 sm:flex-row sm:gap-12",
      )}>
        <div className={cn(
          "w-full shrink-0 text-left",
          compact ? "w-36" : "text-center sm:w-72 sm:text-left",
        )}>
          <p className={cn("mb-1 font-medium tracking-tight text-foreground/60", compact ? "text-xs lg:text-base" : "text-sm")}>Authorised Distributor for</p>
          <div className={cn("relative overflow-hidden", compact ? "h-8" : "h-12")}>
            <p className={cn("pointer-events-none absolute opacity-0 font-bold leading-tight", compact ? "text-base lg:text-2xl" : "text-2xl")}>leading manufacturers</p>
            <p id="partners-heading" className={cn("animate-partner-label font-bold leading-tight text-foreground", compact ? "text-base lg:text-2xl" : "text-2xl")}>
              {hoveredName ?? "leading manufacturers"}
            </p>
          </div>
          {!compact && <p className="mt-4 max-w-xs text-sm leading-6 text-foreground/60">Trusted brands we represent across Africa.</p>}
        </div>

        <div className={cn(
          "grid",
          compact ? "grid-cols-5 gap-x-16 gap-y-6" : "w-full grid-cols-2 gap-3 sm:flex sm:flex-wrap sm:justify-end sm:gap-3",
        )}>
          {partners.map((partner) => {
            const isActive = hoveredName === partner.name;
            return (
              <button
                key={partner.name}
                type="button"
                aria-label={partner.name}
                  onMouseEnter={() => {
                    setIsPointerOver(true);
                    setHoveredName(partner.name);
                  }}
                  onMouseLeave={() => {
                    setIsPointerOver(false);
                    setHoveredName(undefined);
                  }}
                className={cn(
                  compact
                    ? "flex h-14 w-14 items-center justify-center rounded-md border border-transparent p-2 transition-all duration-300"
                    : "flex h-24 items-center justify-center rounded-xl border border-transparent p-3 transition-all duration-300 sm:h-20 sm:w-28",
                  isActive ? "border-brand/50 scale-105 shadow-md opacity-100 grayscale-0" : "border-navy/10 opacity-15 grayscale",
                )}
              >
                <Image src={partner.src} alt={partner.name} width={150} height={90} className="max-h-full w-full object-contain mix-blend-multiply" />
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
