"use client";

import { useEffect, useState } from "react";

type Props = {
  text: string;
  photo: string;
  name: string;
};

export default function SpeechBubble({ text }: Props) {
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
      }, 1200);

    }, 0);

    return () => {
      window.clearTimeout(reset);
      if (start) window.clearTimeout(start);
      if (interval) window.clearInterval(interval);
    };
  }, [text]);

  return (
    <div className="flex w-full items-center gap-4">
      <div
        aria-label={text}
        className="bubble-pop relative min-w-0 flex-1 rounded-3xl bg-white px-5 py-3 text-sm leading-relaxed text-[#0A1530] shadow-lg"
      >
        <span aria-hidden="true" className="invisible block">
          {text}
        </span>
        <span aria-hidden="true" className="absolute inset-0 px-4 py-3">
          {waiting ? (
            <span className="flex h-full items-center gap-1">
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
        {/* Thought bubble tail with circles */}
        <span aria-hidden="true" className="absolute -bottom-5 left-16 flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-full bg-white shadow-sm" />
          <span className="h-2 w-2 rounded-full bg-white shadow-sm" />
          <span className="h-1.5 w-1.5 rounded-full bg-white shadow-sm" />
        </span>
      </div>
    </div>
  );
}
