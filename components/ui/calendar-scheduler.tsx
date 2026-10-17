"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

export interface CalendarSchedulerValue {
  date?: string;
  time?: string;
}

interface CalendarSchedulerProps {
  timeSlots?: string[];
  onConfirm?: (value: CalendarSchedulerValue) => void;
}

export function CalendarScheduler({
  timeSlots = ["08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM"],
  onConfirm,
}: CalendarSchedulerProps) {
  const today = new Date().toISOString().slice(0, 10);
  const [date, setDate] = useState(today);
  const [time, setTime] = useState<string>();

  return (
    <div data-testid="meeting-scheduler" className="rounded-3xl border border-white/70 bg-white/95 p-5 shadow-[0_24px_48px_-12px_rgba(10,21,48,0.35)] backdrop-blur-xl">
      <div className="mb-4">
        <h2 className="font-sora text-lg font-semibold text-foreground">Schedule a meeting</h2>
        <p className="mt-1 text-xs text-foreground/60">Choose a date and a convenient time. I&apos;ll confirm by email.</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="rounded-2xl border border-foreground/10 p-3 text-sm text-foreground">
          <span className="mb-2 block font-medium">Select a date</span>
          <input data-testid="meeting-date-input" type="date" value={date} min={today} onChange={(e) => setDate(e.target.value)} className="w-full rounded-xl border border-foreground/15 bg-transparent px-3 py-2 text-sm text-foreground outline-none focus:border-brand" />
        </label>
        <div className="max-h-[220px] overflow-y-auto rounded-2xl border border-foreground/10 p-3">
          <p className="mb-2 text-sm font-medium text-foreground">Pick a time</p>
          <div className="grid grid-cols-2 gap-2">
            {timeSlots.map((slot) => (
              <button key={slot} type="button" data-testid={`meeting-slot-${slot.replace(/[^0-9APM]/g, "")}`} onClick={() => setTime(slot)} className={cn("rounded-xl border px-2 py-2 text-xs font-medium transition-colors", time === slot ? "border-brand bg-brand text-white" : "border-foreground/15 text-foreground hover:border-brand hover:text-brand")}>
                {slot}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-4 flex justify-between">
        <button type="button" data-testid="meeting-reset-btn" onClick={() => { setDate(""); setTime(undefined); }} className="rounded-full px-4 py-2 text-sm text-foreground/60 transition-colors hover:bg-foreground/5">Reset</button>
        <button type="button" data-testid="meeting-confirm-btn" disabled={!date || !time} onClick={() => onConfirm?.({ date, time })} className="rounded-full bg-brand px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-light disabled:cursor-not-allowed disabled:opacity-40">Confirm</button>
      </div>
    </div>
  );
}
