import { useState, useEffect } from "react";
import LeaderboardView from "./components/LeaderboardView";
import DirectorsView from "./components/DirectorsView";
import FoundingMembersView from "./components/FoundingMembersView";
import GlassHeader from "./components/GlassHeader";

// iOS liquid glass presets - strictly white, black, or transparent
const glass = {
  card: {
    background: "rgba(255, 255, 255, 0.72)",
    backdropFilter: "blur(28px) saturate(180%)",
    WebkitBackdropFilter: "blur(28px) saturate(180%)",
    border: "1px solid rgba(255, 255, 255, 0.95)",
    boxShadow: "0 4px 24px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.02), inset 0 1px 0 rgba(255, 255, 255, 1)",
  },
  cardStrong: {
    background: "rgba(255, 255, 255, 0.84)",
    backdropFilter: "blur(36px) saturate(200%)",
    WebkitBackdropFilter: "blur(36px) saturate(200%)",
    border: "1px solid rgba(255, 255, 255, 1)",
    boxShadow: "0 6px 32px rgba(0, 0, 0, 0.07), 0 1px 3px rgba(0, 0, 0, 0.04), inset 0 1px 0 rgba(255, 255, 255, 1)",
  },
  thin: {
    background: "rgba(255, 255, 255, 0.55)",
    backdropFilter: "blur(20px) saturate(160%)",
    WebkitBackdropFilter: "blur(20px) saturate(160%)",
    border: "1px solid rgba(255, 255, 255, 0.85)",
    boxShadow: "0 2px 12px rgba(0, 0, 0, 0.03), inset 0 1px 0 rgba(255, 255, 255, 0.95)",
  },
  dark: {
    background: "rgba(12, 12, 12, 0.88)",
    backdropFilter: "blur(40px) saturate(150%)",
    WebkitBackdropFilter: "blur(40px) saturate(150%)",
    border: "1px solid rgba(255, 255, 255, 0.12)",
    boxShadow: "0 24px 64px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.08)",
  },
};

function useCountUp(target: number, delay = 0) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let raf: number;
    const timeout = setTimeout(() => {
      const start = performance.now();
      const duration = 1200;
      const step = (now: number) => {
        const p = Math.min((now - start) / duration, 1);
        const ease = 1 - Math.pow(1 - p, 3);
        setCount(Math.round(ease * target));
        if (p < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    }, delay);
    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(raf);
    };
  }, [target, delay]);
  return count;
}

function StatCard({ value, label, delay }: { value: number; label: React.ReactNode; delay: number }) {
  const count = useCountUp(value, delay);
  return (
    <div
      className="rounded-[24px] md:rounded-[28px] w-full h-[140px] md:h-[146px] p-3 flex flex-col items-center justify-center text-center transition-all duration-300 hover:translate-y-[-2px]"
      style={{
        background: "rgba(255, 255, 255, 0.75)",
        backdropFilter: "blur(24px) saturate(180%)",
        WebkitBackdropFilter: "blur(24px) saturate(180%)",
        border: "1px solid rgba(255, 255, 255, 0.95)",
        boxShadow: "0 4px 24px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.02), inset 0 1px 0 rgba(255, 255, 255, 1)",
        animation: "fadeInUp 0.5s ease-out both",
        animationDelay: `${delay}ms`,
      }}
    >
      <span
        className="text-[34px] md:text-[38px] font-bold text-black font-sans leading-none tracking-tight"
        style={{ fontVariantNumeric: "tabular-nums" }}
      >
        {count}
      </span>
      <span className="text-[12px] md:text-[13.5px] font-semibold tracking-[1.6px] md:tracking-[1.8px] text-[#8e8e93] uppercase text-center mt-2.5 leading-[1.25]">
        {label}
      </span>
    </div>
  );
}

type ViewType = "leaderboard" | "directors" | "foundingmembers";

function getInitialView(): ViewType {
  if (typeof window === "undefined") return "leaderboard";
  const path = window.location.pathname.toLowerCase();
  if (path.includes("directors")) return "directors";
  if (path.includes("foundingmembers")) return "foundingmembers";
  return "leaderboard";
}

export default function App() {
  const [view, setView] = useState<ViewType>(getInitialView);

  // Sync with browser navigation
  useEffect(() => {
    const handlePopState = () => {
      setView(getInitialView());
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  return (
    <div className="min-h-full w-full relative overflow-x-hidden" style={{ background: "#f3f3f4" }}>
      {/* Authentic Home Glass Header Shared across all views */}
      <GlassHeader currentView={view} onNavigate={setView} />

      {/* Main content container with suitable gap beneath floating glass header */}
      <main className="relative z-10 w-full min-h-full flex flex-col items-center pt-[90px] sm:pt-[106px] md:pt-[120px] pb-24 px-3 sm:px-6">
        {/* Dynamic View rendering based on current page */}
        {view === "leaderboard" && <LeaderboardView glass={glass} StatCard={StatCard} />}
        {view === "directors" && <DirectorsView glass={glass} StatCard={StatCard} />}
        {view === "foundingmembers" && <FoundingMembersView glass={glass} StatCard={StatCard} />}
      </main>
    </div>
  );
}
