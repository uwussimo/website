"use client";

import { useEffect, useRef } from "react";

/**
 * Fades its children in the first time they scroll into view. The hidden
 * state lives in globals.css under [data-reveal].
 */
export function Reveal({
  children,
  variant = "up",
  delay = 0,
  className,
  style,
}: {
  children: React.ReactNode;
  variant?: "up" | "left" | "right" | "grow";
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      el.dataset.visible = "true";
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        el.dataset.visible = "true";
        observer.disconnect();
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-reveal={variant}
      className={className}
      style={delay ? { ...style, transitionDelay: `${delay}ms` } : style}
    >
      {children}
    </div>
  );
}
