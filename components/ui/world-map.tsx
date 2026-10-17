"use client";
import { useMemo, useRef } from "react";
import { motion } from "framer-motion";
import DottedMap from "dotted-map";
import Image from "next/image";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

interface MapProps {
  dots?: Array<{
    start: { lat: number; lng: number; label?: string };
    end: { lat: number; lng: number; label?: string };
  }>;
  lineColor?: string;
  dotColor?: string;
  backgroundColor?: string;
  className?: string;
  activeLabel?: string;
  onPointClick?: (label: string) => void;
}

export function WorldMap({
  dots = [],
  lineColor = "#0ea5e9",
  dotColor,
  backgroundColor,
  className,
  activeLabel,
  onPointClick,
}: MapProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const { theme } = useTheme();
  const map = useMemo(() => new DottedMap({ height: 100, grid: "diagonal" }), []);
  const svgMap = useMemo(() => {
    return map.getSVG({
      radius: 0.22,
      color: dotColor ?? (theme === "dark" ? "#FFFFFF40" : "#00000040"),
      shape: "circle",
      backgroundColor: backgroundColor ?? (theme === "dark" ? "black" : "white"),
    });
  }, [map, theme, dotColor, backgroundColor]);

  const [, mapW, mapH] = (svgMap.match(/viewBox="0 0 ([\d.]+) ([\d.]+)"/) ?? ["", "198", "100"]).map(Number);

  const projectPoint = (lat: number, lng: number) => {
    const pin = map.getPin({ lat, lng });
    if (!pin) return { x: (lng + 180) * (800 / 360), y: (90 - lat) * (400 / 180) };
    return { x: (pin.x / mapW) * 800, y: (pin.y / mapH) * 400 };
  };

  const createCurvedPath = (
    start: { x: number; y: number },
    end: { x: number; y: number }
  ) => {
    const midX = (start.x + end.x) / 2;
    const midY = Math.min(start.y, end.y) - 50;
    return `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`;
  };

  return (
    <div className={cn("w-full aspect-[2/1] rounded-lg relative font-sans", !backgroundColor && "dark:bg-black bg-white", className)}>
      <Image
        src={`data:image/svg+xml;utf8,${encodeURIComponent(svgMap)}`}
        className="h-full w-full [mask-image:linear-gradient(to_bottom,transparent,white_10%,white_90%,transparent)] pointer-events-none select-none"
        alt="world map"
        height="495"
        width="1056"
        draggable={false}
        unoptimized
      />
      <svg
        ref={svgRef}
        viewBox="0 0 800 400"
        className="w-full h-full absolute inset-0 pointer-events-none select-none"
      >
        {dots.map((dot, i) => {
          const startPoint = projectPoint(dot.start.lat, dot.start.lng);
          const endPoint = projectPoint(dot.end.lat, dot.end.lng);
          return (
            <g key={`path-group-${i}`}>
              <motion.path
                d={createCurvedPath(startPoint, endPoint)}
                fill="none"
                stroke="url(#path-gradient)"
                strokeWidth="1"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, delay: 0.5 * i, ease: "easeOut" }}
                key={`start-upper-${i}`}
              ></motion.path>
            </g>
          );
        })}
        <defs>
          <linearGradient id="path-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="5%" stopColor={lineColor} stopOpacity="1" />
            <stop offset="95%" stopColor={lineColor} stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
        </defs>
        {dots.map((dot, i) => (
          <g key={`points-group-${i}`}>
            {[dot.start, dot.end].map((point, j) => {
              const { x, y } = projectPoint(point.lat, point.lng);
              const label = point.label;
              const clickable = Boolean(onPointClick && label);
              return (
                <g
                  key={`${j === 0 ? "start" : "end"}-${i}`}
                  role={clickable ? "button" : undefined}
                  tabIndex={clickable ? 0 : undefined}
                  aria-label={clickable ? `Show ${label} office` : undefined}
                  data-testid={clickable ? `map-pin-${label!.toLowerCase().replace(/\s+/g, "-")}-${i}-${j}` : undefined}
                  onClick={clickable ? () => onPointClick!(label!) : undefined}
                  onKeyDown={clickable ? (e) => (e.key === "Enter" || e.key === " ") && onPointClick!(label!) : undefined}
                  style={clickable ? { pointerEvents: "auto", cursor: "pointer", outline: "none" } : undefined}
                >
                  {clickable && <circle cx={x} cy={y} r="9" fill="transparent" />}
                  {label && activeLabel === label && (
                    <circle cx={x} cy={y} r="4.5" fill="none" stroke={lineColor} strokeWidth="1" />
                  )}
                  <circle cx={x} cy={y} r="2" fill={lineColor} />
                  <circle cx={x} cy={y} r="2" fill={lineColor} opacity="0.5">
                    <animate attributeName="r" from="2" to="8" dur="1.5s" begin="0s" repeatCount="indefinite" />
                    <animate attributeName="opacity" from="0.5" to="0" dur="1.5s" begin="0s" repeatCount="indefinite" />
                  </circle>
                </g>
              );
            })}
          </g>
        ))}
      </svg>
    </div>
  );
}
