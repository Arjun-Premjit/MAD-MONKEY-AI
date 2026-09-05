import React, { useState, useEffect } from "react";

interface StatCardProps {
  value: number;
  label: string;
  delay?: number;
}

export default function StatCard({ value, label, delay = 0 }: StatCardProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let raf: number;
    const timeout = setTimeout(() => {
      const start = performance.now();
      const duration = 1000;
      const step = (now: number) => {
        const p = Math.min((now - start) / duration, 1);
        const ease = 1 - Math.pow(1 - p, 3);
        setCount(Math.round(ease * value));
        if (p < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    }, delay);

    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(raf);
    };
  }, [value, delay]);

  return (
    <div
      className="bg-white rounded-[26px] p-5 sm:p-6 flex flex-col items-center justify-center text-center shadow-[0_10px_30px_rgba(0,0,0,0.04)] border border-black/[0.04] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(0,0,0,0.07)]"
      style={{
        animation: "fadeInUp 0.5s ease-out both",
        animationDelay: `${delay}ms`,
      }}
    >
      <span className="text-3xl sm:text-4xl font-extrabold text-black tracking-tight mb-1.5 tabular-nums">
        {count.toLocaleString()}
      </span>
      <span className="text-[10px] sm:text-[11px] font-bold tracking-widest text-neutral-400 uppercase leading-snug whitespace-pre-line">
        {label}
      </span>
    </div>
  );
}
