"use client";

import { useEffect, useState } from "react";

export default function SpeechBubble({ text }: { text: string }) {
  const [shown, setShown] = useState("");
  const [typing, setTyping] = useState(false);
  const [waiting, setWaiting] = useState(true);

  useEffect(() => {
    let start: number | undefined;
    let interval: number | undefined;
    const reset = window.setTimeout(() => {
      setShown("");
      setTyping(false);
      setWaiting(true);

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setShown(text);
        setWaiting(false);
        return;
      }

      start = window.setTimeout(() => {
        setWaiting(false);
        setTyping(true);
        let index = 0;
        interval = window.setInterval(() => {
          index += 1;
          setShown(text.slice(0, index));
          if (index >= text.length) {
            if (interval) window.clearInterval(interval);
            setTyping(false);
          }
        }, 35);
      }, 1800);
    }, 0);

    return () => {
      window.clearTimeout(reset);
      if (start) window.clearTimeout(start);
      if (interval) window.clearInterval(interval);
    };
  }, [text]);

  return (
    <div
      data-testid="thought-bubble"
      aria-label={text}
      className="bubble-pop relative w-full rounded-[2.5rem] border border-white/70 bg-white/85 px-6 py-5 font-sora text-[15px] font-medium leading-relaxed text-navy shadow-[0_20px_40px_-12px_rgba(10,21,48,0.22)] backdrop-blur-xl sm:px-7 lg:text-lg"
    >
      <span aria-hidden="true" className="invisible block">{text}</span>
      <span aria-hidden="true" className="absolute inset-0 px-6 py-5 sm:px-7">
        {waiting ? (
          <span className="flex h-full items-center gap-1.5">
            <i className="dot" />
            <i className="dot [animation-delay:150ms]" />
            <i className="dot [animation-delay:300ms]" />
          </span>
        ) : (
          <>
            {shown}
            {typing && <span className="caret" />}
          </>
        )}
      </span>
      <span aria-hidden="true" className="absolute bottom-0 right-1/3 sm:hidden">
        <span className="absolute -bottom-5 right-0 h-4 w-4 rounded-full bg-white/90 shadow-md animate-thought-1" />
        <span className="absolute -bottom-10 -right-4 h-3 w-3 rounded-full bg-white/90 shadow-md animate-thought-2" />
        <span className="absolute -bottom-14 -right-7 h-2 w-2 rounded-full bg-white/90 shadow-sm animate-thought-3" />
      </span>
      <span aria-hidden="true" data-testid="thought-trail" className="absolute right-6 top-0 hidden sm:block">
        <span className="absolute -right-6 -top-4 h-6 w-6 rounded-full bg-white/90 shadow-md animate-thought-1" />
        <span className="absolute -right-12 -top-11 h-4 w-4 rounded-full bg-white/90 shadow-md animate-thought-2" />
        <span className="absolute -right-[4.25rem] -top-[4.25rem] h-2.5 w-2.5 rounded-full bg-white/90 shadow-sm animate-thought-3" />
      </span>
    </div>
  );
}
