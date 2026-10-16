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
        className="bubble-pop relative min-w-0 max-w-[20rem] rounded-3xl bg-white px-6 py-5 text-sm leading-relaxed text-[#0A1530] shadow-lg"
      >
        <span aria-hidden="true" className="invisible block">
          {text}
        </span>
        <span aria-hidden="true" className="absolute inset-0 px-6 py-5 text-sm leading-relaxed">
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
        {/* Thought bubble tail with circles connecting to the head (top right) */}
        <span aria-hidden="true" className="absolute -right-10 top-4 flex items-center gap-1.5">
          <span className="h-5 w-5 rounded-full bg-white shadow-md animate-thought-1" />
          <span className="h-4 w-4 rounded-full bg-white shadow-md animate-thought-2" />
          <span className="h-2.5 w-2.5 rounded-full bg-white shadow-sm animate-thought-3" />
        </span>
      </div>
    </div>
  );
}
