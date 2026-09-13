"use client";

import React, { useEffect, useRef } from "react";

interface AnimatedCounterProps {
  target: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  duration?: number; // duration in ms
  className?: string;
  minWidth?: string;
}

export default function AnimatedCounter({
  target,
  prefix = "",
  suffix = "",
  decimals = 0,
  duration = 2000,
  className = "",
  minWidth,
}: AnimatedCounterProps) {
  const elementRef = useRef<HTMLSpanElement>(null);
  const hasAnimatedRef = useRef<boolean>(false);

  const format = (val: number) => `${prefix}${val.toFixed(decimals)}${suffix}`;
  const targetFormatted = format(target);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Respect reduced motion settings
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      element.textContent = targetFormatted;
      return;
    }

    let animationFrameId: number;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimatedRef.current) {
          hasAnimatedRef.current = true;
          observer.disconnect();

          let startTime: number | null = null;
          const easeOutCubic = (t: number): number => 1 - Math.pow(1 - t, 3);

          const step = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const easedProgress = easeOutCubic(progress);
            const currentVal = easedProgress * target;

            if (elementRef.current) {
              elementRef.current.textContent = format(currentVal);
            }

            if (progress < 1) {
              animationFrameId = requestAnimationFrame(step);
            } else if (elementRef.current) {
              elementRef.current.textContent = targetFormatted;
            }
          };

          animationFrameId = requestAnimationFrame(step);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [target, prefix, suffix, decimals, duration, targetFormatted]);

  const initialText = `${prefix}${(0).toFixed(decimals)}${suffix}`;
  const autoMinWidth = `${(targetFormatted.length + (suffix.includes("%") ? 0.8 : 0.4)).toFixed(1)}ch`;

  return (
    <span
      ref={elementRef}
      className={`tabular-nums inline-block transform-gpu ${className}`}
      style={{
        fontVariantNumeric: "tabular-nums",
        minWidth: minWidth || autoMinWidth,
      }}
    >
      {initialText}
    </span>
  );
}
