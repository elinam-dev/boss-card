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
      className="bubble-pop relative w-full rounded-[2rem] rounded-br-lg border border-white/70 bg-white/85 px-6 py-5 font-sora text-[15px] font-medium leading-relaxed text-navy shadow-[0_20px_40px_-12px_rgba(10,21,48,0.22)] backdrop-blur-xl sm:px-7 lg:text-lg"
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
      <span aria-hidden="true" className="absolute -right-12 bottom-2 hidden items-center gap-1.5 sm:flex">
        <span className="h-5 w-5 rounded-full bg-white/90 shadow-md animate-thought-1" />
        <span className="h-3.5 w-3.5 rounded-full bg-white/90 shadow-md animate-thought-2" />
        <span className="h-2 w-2 rounded-full bg-white/90 shadow-sm animate-thought-3" />
      </span>
    </div>
  );
}
