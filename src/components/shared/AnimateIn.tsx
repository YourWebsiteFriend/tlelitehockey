"use client";

import React, { useEffect, useRef, useState } from "react";

type Animation = "fade-up" | "fade-left" | "fade-in";
type Delay = 0 | 100 | 150 | 200 | 300 | 400;
type As = "div" | "section";

interface AnimateInProps {
  children: React.ReactNode;
  animation?: Animation;
  delay?: Delay;
  className?: string;
  as?: As;
}

const animationClass: Record<Animation, string> = {
  "fade-up": "animate-fade-up",
  "fade-left": "animate-fade-left",
  "fade-in": "animate-fade-in",
};

export function AnimateIn({
  children,
  animation = "fade-up",
  delay = 0,
  className = "",
  as: Tag = "div",
}: AnimateInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true);
            observer.disconnect();
          }
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const appliedClass = inView ? animationClass[animation] : "opacity-0";
  const delayStyle = delay > 0 ? { animationDelay: `${delay}ms` } : undefined;

  return (
    <Tag
      ref={ref as React.RefObject<HTMLDivElement & HTMLElement>}
      className={`${appliedClass} ${className}`}
      style={delayStyle}
    >
      {children}
    </Tag>
  );
}
