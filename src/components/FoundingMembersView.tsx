import { useState } from "react";
import { FOUNDING_MEMBERS_DATA } from "../data";

interface Props {
  glass: {
    card: React.CSSProperties;
    cardStrong: React.CSSProperties;
    thin: React.CSSProperties;
    dark: React.CSSProperties;
  };
  StatCard: React.ComponentType<{ value: number; label: React.ReactNode; delay: number }>;
}

const CATEGORIES = ["All", "Security", "Design", "Bug Fix", "UX Suggestion", "Community", "Development"] as const;

export default function FoundingMembersView({ glass, StatCard }: Props) {
  const [country, setCountry] = useState<"India" | "USA">("India");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const countryData = FOUNDING_MEMBERS_DATA[country];
  const members = countryData.members.filter((m) => {
    if (selectedCategory === "All") return true;
    return m.category === selectedCategory;
  });

  return (
    <div className="w-full flex flex-col items-center">
      {/* Live pill badge with suitable gap from header */}
      <div className="flex justify-center mt-2 sm:mt-4 px-4 w-full">
        <div
          className="inline-flex items-center justify-center gap-2 rounded-full px-4 text-[13px] font-medium text-black/75 select-none"
          style={{
            width: "min(390px, calc(100vw - 32px))",
            height: "38px",
            background: "rgba(255, 255, 255, 0.82)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            border: "1px solid rgba(255, 255, 255, 0.95)",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.03), inset 0 1px 0 rgba(255,255,255,1)",
          }}
        >
          <span className="w-2 h-2 rounded-full bg-black shrink-0 inline-block" />
          <span>Hall of Fame · Verified Contributors · Beta Pioneers</span>
        </div>
      </div>

      {/* Hero section */}
      <div className="text-center mt-7 sm:mt-8 px-4 w-full" style={{ animation: "fadeInUp 0.5s ease-out both" }}>
        <h1 className="font-serif text-[42px] sm:text-[54px] md:text-[66px] text-black leading-[0.98] font-normal tracking-[-0.015em] max-w-[500px] mx-auto">
          The founding members<br />
          <span className="italic">who shaped the product.</span>
        </h1>
      </div>

      {/* Hero subheading */}
      <div className="text-center mt-6 sm:mt-8 px-4 w-full">
        <p className="text-black font-bold font-sans text-[21px] sm:text-[23px] md:text-[24px] tracking-tight leading-none">
          Honoring the students and builders who built with us.
        </p>
      </div>

      {/* Description */}
      <div className="text-center mt-4 px-4 w-full">
        <p className="text-[#6b7280] text-[15px] sm:text-[16.5px] md:text-[17.5px] font-normal max-w-[480px] mx-auto leading-[1.65]">
          These early contributors discovered critical system bugs, refined mechanics, and validated models before general release.
        </p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-[15px] w-full max-w-[800px] px-2 sm:px-4 md:px-0 mx-auto mt-10 sm:mt-12 mb-8 sm:mb-10">
        <StatCard
          value={countryData.stats.members}
          label={
            <>
              Founding<br />Members
            </>
          }
          delay={0}
        />
        <StatCard
          value={countryData.stats.bugs}
          label={
            <>
              Bugs<br />Identified
            </>
          }
          delay={100}
        />
        <StatCard
          value={countryData.stats.vulns}
          label={
            <>
              Security<br />Patches
            </>
          }
          delay={200}
        />
        <StatCard
          value={countryData.stats.design}
          label={
            <>
              Design<br />Concepts
            </>
          }
          delay={300}
        />
      </div>

      {/* Country toggle (Liquid Glass) */}
      <div className="flex justify-center mb-4 sm:mb-5">
        <div
          className="inline-flex p-[4px] rounded-full"
          style={{
            background: "rgba(255, 255, 255, 0.75)",
            backdropFilter: "blur(24px) saturate(180%)",
            WebkitBackdropFilter: "blur(24px) saturate(180%)",
            border: "1px solid rgba(255, 255, 255, 0.95)",
            boxShadow: "0 2px 10px rgba(0,0,0,0.03), inset 0 1px 0 rgba(255,255,255,1)",
          }}
        >
          <button
            type="button"
            onClick={() => {
              setCountry("India");
              setSelectedCategory("All");
            }}
            className={`px-4 sm:px-5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 flex items-center cursor-pointer ${
              country === "India"
                ? "bg-black text-white font-bold shadow-[0_2px_8px_rgba(0,0,0,0.2)]"
                : "text-black/60 hover:text-black"
            }`}
          >
            <span className={`text-[9px] uppercase font-black mr-1 tracking-wider ${country === "India" ? "text-white" : "text-black/50"}`}>
              IN
            </span>
            India
          </button>
          <button
            type="button"
            onClick={() => {
              setCountry("USA");
              setSelectedCategory("All");
            }}
            className={`px-4 sm:px-5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 flex items-center cursor-pointer ${
              country === "USA"
                ? "bg-black text-white font-bold shadow-[0_2px_8px_rgba(0,0,0,0.2)]"
                : "text-black/60 hover:text-black"
            }`}
          >
            <span className={`text-[9px] uppercase font-black mr-1 tracking-wider ${country === "USA" ? "text-white" : "text-black/50"}`}>
              US
            </span>
            USA
          </button>
        </div>
      </div>

      {/* Category filter pills (Black & White Glass) */}
      <div className="flex flex-wrap justify-center gap-1 sm:gap-1.5 mb-6 sm:mb-8 px-1">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setSelectedCategory(cat)}
            className="px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-semibold transition-all duration-150 cursor-pointer"
            style={
              selectedCategory === cat
                ? { background: "#000000", color: "#ffffff", boxShadow: "0 2px 10px rgba(0,0,0,0.18)" }
                : {
                    background: "rgba(255, 255, 255, 0.7)",
                    backdropFilter: "blur(16px)",
                    WebkitBackdropFilter: "blur(16px)",
                    border: "1px solid rgba(255, 255, 255, 0.9)",
                    color: "rgba(0,0,0,0.6)",
                  }
            }
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Info notice banner (Liquid Glass) */}
      <div
        className="w-full max-w-[800px] rounded-2xl sm:rounded-3xl p-4 sm:p-5 mb-6 sm:mb-8 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4"
        style={glass.card}
      >
        <div className="flex items-center gap-3 text-xs sm:text-sm text-black/80 text-center sm:text-left">
          <span className="text-lg sm:text-xl">🚀</span>
          <span>{countryData.banner}</span>
        </div>
        <a
          href="/applydirectorintern.html"
          className="w-full sm:w-auto shrink-0 px-5 py-2.5 rounded-full bg-black text-white text-xs font-bold text-center transition-all duration-200 hover:bg-black/85 shadow-sm"
        >
          Join as Contributor →
        </a>
      </div>

      {/* Members grid (Liquid Glass Cards) */}
      <div className="w-full max-w-[800px] grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4 mb-8 sm:mb-10">
        {members.map((m, idx) => (
          <div
            key={idx}
            className="rounded-2xl sm:rounded-3xl p-4 sm:p-6 flex flex-col justify-between transition-all duration-200 hover:scale-[1.01]"
            style={{
              ...glass.card,
              boxShadow: "0 4px 24px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,1)",
            }}
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3 sm:mb-4">
                <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                  <div
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center font-bold text-black text-xs sm:text-sm shrink-0"
                    style={{
                      background: "rgba(255,255,255,0.9)",
                      border: "1px solid rgba(0,0,0,0.08)",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                    }}
                  >
                    {m.initials}
                  </div>
                  <div className="min-w-0 pr-1">
                    <div className="font-bold text-black text-xs sm:text-sm flex items-center gap-1 truncate">
                      <span className="truncate">{m.name}</span>
                      <span className="text-xs text-black/40 shrink-0">★</span>
                    </div>
                    <div className="text-[11px] sm:text-xs text-black/45 truncate">{m.location}</div>
                  </div>
                </div>

                {/* Strictly monochrome transparent glass badge */}
                <span
                  className="px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[9px] sm:text-[10px] font-bold tracking-wider uppercase bg-black/5 text-black border border-black/10 shrink-0"
                >
                  {m.category}
                </span>
              </div>

              <p className="text-xs text-black/70 leading-relaxed mb-3 sm:mb-4">
                {m.description}
              </p>
            </div>

            <div className="pt-2.5 sm:pt-3 border-t border-black/5 flex items-center justify-between text-[10px] sm:text-[11px] text-black/40">
              <span>{m.joined}</span>
              <span className="font-semibold text-black/75 flex items-center gap-1">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-black" /> Verified Contributor
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* CTA section (Glass Dark Card) */}
      <div className="w-full max-w-[800px] rounded-2xl sm:rounded-[28px] p-6 sm:px-8 sm:py-10 text-center relative overflow-hidden" style={glass.dark}>
        <p className="text-white/50 text-xs sm:text-sm mb-1">Want to be featured as a Founding Member?</p>
        <p className="text-white font-semibold text-base sm:text-lg mb-6 leading-snug">
          <span className="font-bold">Spot a bug, propose an architecture improvement</span>, or help launch your campus.
        </p>
        <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 justify-center items-stretch sm:items-center">
          <a
            href="/applydirectorintern.html"
            className="px-6 sm:px-7 py-3 rounded-full bg-white text-black font-semibold text-xs sm:text-sm transition-all duration-200 hover:bg-white/90 text-center"
            style={{ boxShadow: "0 2px 20px rgba(255,255,255,0.15)" }}
          >
            Submit Feedback or Bug
          </a>
          <a
            href="/leaderboard.html"
            className="px-6 sm:px-7 py-3 rounded-full font-semibold text-xs sm:text-sm text-white transition-all duration-200 text-center"
            style={{
              background: "rgba(255,255,255,0.1)",
              border: "1px solid rgba(255,255,255,0.18)",
              backdropFilter: "blur(10px)",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.12)",
            }}
          >
            View Leaderboard
          </a>
        </div>
      </div>
    </div>
  );
}
