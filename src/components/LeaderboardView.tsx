import { useState } from "react";
import {
  INSTITUTIONS_INDIA_COLLEGE,
  INSTITUTIONS_USA_COLLEGE,
  INSTITUTIONS_INDIA_HS,
  Institution,
} from "../data";

interface Props {
  glass: {
    card: React.CSSProperties;
    cardStrong: React.CSSProperties;
    thin: React.CSSProperties;
    dark: React.CSSProperties;
  };
  StatCard: React.ComponentType<{ value: number; label: React.ReactNode; delay: number }>;
}

const LOCAL_LOGOS: Record<string, string> = {
  "bits-pilani.ac.in": "/bits-pilani.png",
  "iitb.ac.in": "/iit-bombay.png",
  "stanford.edu": "/stanford.png",
  "vit.ac.in": "/vit.png",
};

function CollegeLogo({ domain, name }: { domain: string; name: string }) {
  const [srcIndex, setSrcIndex] = useState(0);
  const initials = name
    .split(" ")
    .filter((w) => !["of", "and", "the", "in", "inst.", "institute"].includes(w.toLowerCase()))
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase() || name.slice(0, 2).toUpperCase();

  const candidates = [
    LOCAL_LOGOS[domain],
    `https://unavatar.io/${domain}`,
    `https://www.google.com/s2/favicons?domain=${domain}&sz=128`,
    `https://logo.clearbit.com/${domain}`,
  ].filter(Boolean) as string[];

  const currentSrc = candidates[srcIndex];

  if (!currentSrc || srcIndex >= candidates.length) {
    return (
      <div
        className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shrink-0 text-[10px] sm:text-xs font-black text-black select-none"
        style={{
          background: "rgba(255, 255, 255, 0.8)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          border: "1px solid rgba(0, 0, 0, 0.1)",
          boxShadow: "0 2px 6px rgba(0, 0, 0, 0.03)",
        }}
      >
        {initials}
      </div>
    );
  }

  return (
    <div
      className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl overflow-hidden shrink-0 flex items-center justify-center p-1"
      style={{
        background: "rgba(255, 255, 255, 0.85)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        border: "1px solid rgba(255, 255, 255, 0.95)",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04), inset 0 1px 0 rgba(255, 255, 255, 1)",
      }}
    >
      <img
        src={currentSrc}
        alt={`${name} logo`}
        className="w-full h-full object-contain select-none"
        onError={() => setSrcIndex((prev) => prev + 1)}
      />
    </div>
  );
}

function LeaderboardRow({ inst, glass }: { inst: Institution; glass: Props["glass"] }) {
  const rank = inst.id;
  const [hovered, setHovered] = useState(false);

  const rowStyle =
    rank === 1
      ? {
          ...glass.cardStrong,
          boxShadow: "0 6px 36px rgba(0,0,0,0.08), 0 1px 3px rgba(0,0,0,0.03), inset 0 1px 0 rgba(255,255,255,1)",
          border: "1px solid rgba(0,0,0,0.12)",
        }
      : {
          ...glass.card,
          boxShadow: hovered
            ? "0 6px 28px rgba(0,0,0,0.08), 0 1px 3px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,1)"
            : glass.card.boxShadow,
        };

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="rounded-2xl px-3 sm:px-5 py-3 sm:py-3.5 flex items-center gap-2.5 sm:gap-4 transition-all duration-200 cursor-default"
      style={{
        ...rowStyle,
        transform: hovered ? "translateY(-1px) scale(1.002)" : "none",
      }}
    >
      {/* Glassmorphic Rank indicator */}
      <div className="w-7 sm:w-8 shrink-0 flex justify-center text-center">
        {rank <= 3 ? (
          <div
            className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm select-none ${
              rank === 1
                ? "bg-black text-white shadow-[0_2px_8px_rgba(0,0,0,0.25)]"
                : "bg-white/90 text-black border border-black/15 shadow-[0_2px_6px_rgba(0,0,0,0.04)]"
            }`}
          >
            {rank}
          </div>
        ) : (
          <span className="text-xs sm:text-sm font-semibold text-black/40" style={{ fontVariantNumeric: "tabular-nums" }}>
            #{rank}
          </span>
        )}
      </div>

      {/* College Logo */}
      <CollegeLogo domain={inst.domain} name={inst.name} />

      {/* College Name & Details */}
      <div className="flex-1 min-w-0 pr-1">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <span className={`font-semibold text-xs sm:text-sm truncate ${rank === 1 ? "text-black font-bold" : "text-black/85"}`}>
            {inst.name}
          </span>
          {rank === 1 && (
            <span
              className="px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-bold tracking-wider uppercase text-white bg-black shrink-0 shadow-xs"
            >
              Leader
            </span>
          )}
        </div>
        <div className="flex flex-wrap items-center gap-x-1.5 gap-y-0.5 text-[10px] sm:text-xs text-black/45 mt-0.5 leading-tight">
          <span>{inst.location}</span>
          <span className="hidden sm:inline">·</span>
          <span className="truncate">
            {inst.directors === 0
              ? "No directors yet"
              : `${inst.directors} Director${inst.directors > 1 ? "s" : ""}`}
          </span>
          {inst.slots && (
            <>
              <span>·</span>
              <span className="px-1.5 py-0.2 rounded bg-black/5 border border-black/10 text-black/80 font-semibold text-[9px] sm:text-[10px]">
                {inst.slots}
              </span>
            </>
          )}
        </div>
      </div>

      {/* Stats pills */}
      <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
        <div className="w-9 sm:w-12 text-center">
          <span className="text-xs font-bold text-black block" style={{ fontVariantNumeric: "tabular-nums" }}>
            {inst.live}
          </span>
          <span className="text-[8px] sm:text-[9px] font-semibold text-black/35 uppercase tracking-wide">Live</span>
        </div>
        <div className="w-9 sm:w-12 text-center">
          <span className="text-xs font-bold text-black block" style={{ fontVariantNumeric: "tabular-nums" }}>
            {inst.rev}
          </span>
          <span className="text-[8px] sm:text-[9px] font-semibold text-black/35 uppercase tracking-wide">Rev</span>
        </div>
        <div
          className="px-2 sm:px-3 py-1 sm:py-1.5 rounded-xl flex items-center gap-0.5 sm:gap-1 min-w-[44px] sm:min-w-[58px] justify-center"
          style={{
            background: rank === 1 ? "rgba(0,0,0,0.08)" : "rgba(0,0,0,0.04)",
            border: rank === 1 ? "1px solid rgba(0,0,0,0.12)" : "1px solid rgba(0,0,0,0.06)",
          }}
        >
          <span className={`font-black leading-tight ${rank === 1 ? "text-xs sm:text-sm text-black" : "text-xs text-black/80"}`}>
            {inst.pts}
          </span>
          <span className="text-[8px] sm:text-[9px] font-semibold text-black/40 uppercase tracking-wide">Pts</span>
        </div>
      </div>
    </div>
  );
}

export default function LeaderboardView({ glass, StatCard }: Props) {
  const [country, setCountry] = useState<"India" | "USA">("India");
  const [category, setCategory] = useState<"College" | "HighSchool">("College");

  const data =
    category === "College"
      ? country === "India"
        ? INSTITUTIONS_INDIA_COLLEGE
        : INSTITUTIONS_USA_COLLEGE
      : INSTITUTIONS_INDIA_HS;

  return (
    <div className="w-full flex flex-col items-center">
      {/* 1. Status Badge with suitable gap from header */}
      <div className="flex justify-center mt-2 sm:mt-4 px-4 w-full">
        <div
          className="inline-flex items-center justify-center gap-2 rounded-full px-4 text-[13px] font-medium text-black/75 select-none"
          style={{
            width: "min(330px, calc(100vw - 32px))",
            height: "38px",
            background: "rgba(255, 255, 255, 0.82)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            border: "1px solid rgba(255, 255, 255, 0.95)",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.03), inset 0 1px 0 rgba(255,255,255,1)",
          }}
        >
          <span className="w-2 h-2 rounded-full bg-black shrink-0 inline-block" />
          <span>Live · Updated daily · No login needed</span>
        </div>
      </div>

      {/* 2. Hero Headline */}
      <div className="text-center mt-7 sm:mt-8 px-4 w-full" style={{ animation: "fadeInUp 0.5s ease-out both" }}>
        <h1 className="font-serif text-[42px] sm:text-[54px] md:text-[66px] text-black leading-[0.98] font-normal tracking-[-0.015em] max-w-[500px] mx-auto">
          The next generation<br />
          <span className="italic">of founders.</span>
        </h1>
      </div>

      {/* 3. Hero Subheading */}
      <div className="text-center mt-6 sm:mt-8 px-4 w-full">
        <p className="text-black font-bold font-sans text-[21px] sm:text-[23px] md:text-[24px] tracking-tight leading-none">
          All in one place.
        </p>
      </div>

      {/* 4. Description */}
      <div className="text-center mt-4 px-4 w-full">
        <p className="text-[#6b7280] text-[15px] sm:text-[16.5px] md:text-[17.5px] font-normal max-w-[430px] mx-auto leading-[1.65]">
          Every venture is real and verified by a human<br className="hidden sm:inline" /> before a stage advances. No placeholders.
        </p>
      </div>

      {/* 5. Statistics Cards Row */}
      <div className="w-full max-w-[800px] px-2 sm:px-4 md:px-0 mx-auto mt-10 sm:mt-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-[15px] w-full">
          <StatCard value={128} label="VENTURES LIVE" delay={0} />
          <StatCard
            value={14}
            label={
              <>
                REACHED<br />REVENUE
              </>
            }
            delay={100}
          />
          <StatCard
            value={47}
            label={
              <>
                COLLEGES &<br />SCHOOLS
              </>
            }
            delay={200}
          />
          <StatCard value={3} label="GRADUATED" delay={300} />
        </div>
      </div>

      {/* 6. Region Toggle (Liquid Glass Pill) */}
      <div className="flex justify-center mt-10 sm:mt-12 px-4 w-full">
        <div
          className="rounded-full p-[4px] flex items-center justify-between"
          style={{
            width: "234px",
            height: "53px",
            background: "rgba(255, 255, 255, 0.75)",
            backdropFilter: "blur(24px) saturate(180%)",
            WebkitBackdropFilter: "blur(24px) saturate(180%)",
            border: "1px solid rgba(255, 255, 255, 0.95)",
            boxShadow: "0 2px 12px rgba(0,0,0,0.03), inset 0 1px 0 rgba(255,255,255,1)",
          }}
        >
          <button
            type="button"
            onClick={() => setCountry("India")}
            className={`w-[110px] h-[45px] rounded-full text-[13px] font-semibold transition-all duration-200 flex items-center justify-center cursor-pointer ${
              country === "India"
                ? "bg-black text-white font-bold shadow-[0_2px_10px_rgba(0,0,0,0.2)]"
                : "text-black/50 hover:text-black"
            }`}
          >
            <span className={`text-[10px] uppercase font-black mr-1.5 tracking-wider ${country === "India" ? "text-white" : "text-black/40"}`}>
              IN
            </span>
            India
          </button>
          <button
            type="button"
            onClick={() => setCountry("USA")}
            className={`w-[110px] h-[45px] rounded-full text-[13px] font-semibold transition-all duration-200 flex items-center justify-center cursor-pointer ${
              country === "USA"
                ? "bg-black text-white font-bold shadow-[0_2px_10px_rgba(0,0,0,0.2)]"
                : "text-black/50 hover:text-black"
            }`}
          >
            <span className={`text-[10px] uppercase font-black mr-1.5 tracking-wider ${country === "USA" ? "text-white" : "text-black/40"}`}>
              US
            </span>
            USA
          </button>
        </div>
      </div>

      {/* 7. Club Type Toggle (Liquid Glass Buttons) */}
      <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-[10px] mt-4 sm:mt-5 px-4 w-full">
        <button
          type="button"
          onClick={() => setCategory("College")}
          className={`h-[48px] rounded-full text-[14px] font-semibold transition-all duration-200 flex items-center justify-center cursor-pointer ${
            category === "College"
              ? "bg-black text-white shadow-[0_4px_16px_rgba(0,0,0,0.16)]"
              : "text-black/70 hover:text-black"
          }`}
          style={{
            width: "min(228px, calc(100vw - 32px))",
            ...(category !== "College"
              ? {
                  background: "rgba(255, 255, 255, 0.75)",
                  backdropFilter: "blur(24px)",
                  WebkitBackdropFilter: "blur(24px)",
                  border: "1px solid rgba(255, 255, 255, 0.95)",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
                }
              : {}),
          }}
        >
          College Venture Club
        </button>
        <button
          type="button"
          onClick={() => setCategory("HighSchool")}
          className={`h-[48px] rounded-full text-[14px] font-semibold transition-all duration-200 flex items-center justify-center cursor-pointer ${
            category === "HighSchool"
              ? "bg-black text-white shadow-[0_4px_16px_rgba(0,0,0,0.16)]"
              : "text-black/70 hover:text-black"
          }`}
          style={{
            width: "min(233px, calc(100vw - 32px))",
            ...(category !== "HighSchool"
              ? {
                  background: "rgba(255, 255, 255, 0.75)",
                  backdropFilter: "blur(24px)",
                  WebkitBackdropFilter: "blur(24px)",
                  border: "1px solid rgba(255, 255, 255, 0.95)",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
                }
              : {}),
          }}
        >
          Aspiring · High School
        </button>
      </div>

      {/* 8. Leaderboard Table Header & Rows */}
      <div className="w-full max-w-[800px] px-2 sm:px-4 md:px-0 mx-auto mt-8 sm:mt-10">
        {/* Column headers */}
        <div className="flex items-center gap-3 sm:gap-4 px-3 sm:px-5 mb-3 select-none text-[11px] font-bold tracking-[1.5px] text-black/35 uppercase">
          <div className="w-7 sm:w-8 shrink-0 text-center">#</div>
          <div className="w-8 sm:w-10 shrink-0" />
          <div className="flex-1 min-w-0 pr-1">Institution</div>
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            <div className="w-9 sm:w-12 text-center">Live</div>
            <div className="w-9 sm:w-12 text-center">Rev</div>
            <div className="w-11 sm:w-14 text-center text-black/40">Pts</div>
          </div>
        </div>

        {/* Leaderboard rows */}
        <div className="flex flex-col gap-2.5 mb-6">
          {data.map((inst) => (
            <LeaderboardRow key={`${country}-${category}-${inst.id}`} inst={inst} glass={glass} />
          ))}
        </div>

        {/* Points explanation banner */}
        <div
          className="rounded-2xl sm:rounded-3xl p-4 sm:p-5 text-[11px] sm:text-xs text-black/60 text-center leading-relaxed mb-8 sm:mb-10"
          style={glass.card}
        >
          <span className="font-semibold text-black">Points:</span> Stage 1 ={" "}
          <span className="font-semibold text-black">1pt</span> · Stage 3 ={" "}
          <span className="font-semibold text-black">5pts</span> · Stage 5 Revenue ={" "}
          <span className="font-semibold text-black">25pts</span> · Stage 8 Graduate ={" "}
          <span className="font-bold text-black">100pts</span>. Every stage verified by a human.
        </div>

        {/* CTA card */}
        <div className="rounded-2xl sm:rounded-[28px] p-6 sm:px-8 sm:py-10 text-center relative overflow-hidden" style={glass.dark}>
          <p className="text-white/50 text-xs sm:text-sm mb-1">Your campus isn't on the board yet?</p>
          <p className="text-white font-semibold text-base sm:text-lg mb-6 leading-snug">
            <span className="font-bold">Apply as Campus Director</span> or submit your venture idea.
          </p>

          <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 justify-center items-stretch sm:items-center">
            <a
              href="/applydirectorintern.html"
              className="px-6 sm:px-7 py-3 rounded-full bg-white text-black font-semibold text-xs sm:text-sm transition-all duration-200 hover:bg-white/90 text-center"
              style={{ boxShadow: "0 2px 20px rgba(255,255,255,0.15)" }}
            >
              Become Campus Director
            </a>
            <a
              href="/venture_club.html"
              className="px-6 sm:px-7 py-3 rounded-full font-semibold text-xs sm:text-sm text-white transition-all duration-200 text-center"
              style={{
                background: "rgba(255,255,255,0.1)",
                border: "1px solid rgba(255,255,255,0.18)",
                backdropFilter: "blur(10px)",
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.12)",
              }}
            >
              Submit your idea
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
