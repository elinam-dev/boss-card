"use client";

import { CalendarDays } from "lucide-react";

export function ActionDock() {
  const goToBooking = () => {
    window.setTimeout(() => document.querySelector<HTMLInputElement>('[data-testid="contact-name-input"]')?.focus({ preventScroll: true }), 600);
  };

  return (
    <a
      href="#contact"
      onClick={goToBooking}
      data-testid="book-meeting-btn"
      className="group fixed bottom-4 right-4 z-50 flex h-14 items-center gap-3 rounded-full border border-white/20 bg-navy pl-6 pr-2 text-sm font-semibold text-white shadow-[0_20px_40px_-8px_rgba(10,21,48,0.45)] transition-[background-color,transform] duration-200 hover:bg-[#13224a] active:scale-95 sm:bottom-6 sm:right-8"
    >
      Book a meeting
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand transition-transform duration-300 group-hover:rotate-12">
        <CalendarDays className="h-4 w-4" />
      </span>
    </a>
  );
}
