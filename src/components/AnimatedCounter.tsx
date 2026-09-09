"use client";

import React, { useEffect, useState, useRef } from "react";

interface AnimatedCounterProps {
  target: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  duration?: number; // duration in ms
  className?: string;
}

export default function AnimatedCounter({
  target,
  prefix = "",
  suffix = "",
  decimals = 0,
  duration = 2000,
  className = "",
}: AnimatedCounterProps) {
  const [count, setCount] = useState<number>(0);
  const [hasAnimated, setHasAnimated] = useState<boolean>(false);
  const elementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, [hasAnimated]);

  useEffect(() => {
    if (!hasAnimated) return;

    let startTime: number | null = null;
    let animationFrameId: number;

    const easeOutCubic = (t: number): number => {
      return 1 - Math.pow(1 - t, 3);
    };

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easedProgress = easeOutCubic(progress);

      const currentVal = easedProgress * target;
      setCount(currentVal);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };

    animationFrameId = requestAnimationFrame(step);

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [hasAnimated, target, duration]);

  const formattedValue = count.toFixed(decimals);

  return (
    <span ref={elementRef} className={className}>
      {prefix}
      {formattedValue}
      {suffix}
    </span>
  );
}
