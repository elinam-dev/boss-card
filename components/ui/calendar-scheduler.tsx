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
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [time, setTime] = useState<string>();

  return (
    <div className="w-full max-w-[600px]">
      <div className="rounded-2xl border border-brand/20 bg-background p-4 shadow-xl shadow-navy/20">
        <div className="mb-4">
          <h2 className="text-base font-semibold text-foreground">Schedule a Meeting</h2>
          <p className="mt-1 text-xs text-foreground/60">Choose a date and a convenient time.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="rounded-xl border border-foreground/10 p-3 text-sm text-foreground">
            <span className="mb-2 block font-medium">Select a date</span>
            <input type="date" value={date} min={new Date().toISOString().slice(0, 10)} onChange={(event) => setDate(event.target.value)} className="w-full rounded-lg border border-foreground/15 bg-transparent px-3 py-2 text-sm text-foreground outline-none focus:border-brand" />
          </label>
          <div className="max-h-[220px] overflow-y-auto rounded-xl border border-foreground/10 p-3">
            <p className="mb-2 text-sm font-medium text-foreground">Pick a time</p>
            <div className="grid grid-cols-2 gap-2">
              {timeSlots.map((slot) => (
                <button key={slot} type="button" onClick={() => setTime(slot)} className={cn("rounded-lg border px-2 py-2 text-xs transition-colors", time === slot ? "border-brand bg-brand text-white" : "border-foreground/15 text-foreground hover:border-brand hover:text-brand")}>
                  {slot}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-4 flex justify-between">
          <button type="button" onClick={() => { setDate(""); setTime(undefined); }} className="rounded-lg px-3 py-2 text-sm text-foreground/60 hover:bg-foreground/10">Reset</button>
          <button type="button" disabled={!date || !time} onClick={() => onConfirm?.({ date, time })} className="rounded-lg bg-brand px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-light disabled:cursor-not-allowed disabled:opacity-40">Confirm</button>
        </div>
      </div>
    </div>
  );
}
