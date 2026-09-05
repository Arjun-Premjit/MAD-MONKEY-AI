import React, { useState } from "react";
import StatCard from "./StatCard";
import { LEADERBOARD_INSTITUTIONS, Institution } from "../data";

function CampusLogo({ domain, name }: { domain: string; name: string }) {
  const [failed, setFailed] = useState(false);
  const initials = name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
  const src = `https://logo.clearbit.com/${domain}`;

  if (failed) {
    return (
      <div
        className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center shrink-0 text-xs font-bold text-neutral-600 bg-neutral-100 border border-black/[0.08]"
      >
        {initials}
      </div>
    );
  }

  return (
    <div
      className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl overflow-hidden shrink-0 flex items-center justify-center bg-white border border-black/[0.08] shadow-xs"
    >
      <img
        src={src}
        alt={name}
        onError={() => setFailed(true)}
        className="w-full h-full object-contain p-1"
        loading="lazy"
      />
    </div>
  );
}

export default function LeaderboardView() {
  const [country, setCountry] = useState<"India" | "USA">("India");
  const [category, setCategory] = useState<"College" | "HighSchool">("College");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = LEADERBOARD_INSTITUTIONS.filter(
    (item) =>
      item.country === country &&
      item.category === category &&
      (searchQuery === "" ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.city.toLowerCase().includes(searchQuery.toLowerCase()))
  ).sort((a, b) => b.points - a.points);

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 pb-24 pt-24 sm:pt-32">
      {/* 1. Live Badge */}
      <div className="flex justify-center mb-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-black/[0.06] shadow-xs text-xs font-semibold text-neutral-700">
          <span className="w-2 h-2 rounded-full bg-black inline-block" />
          Live · Updated daily · No login needed
        </div>
      </div>

      {/* 2. Hero Typography */}
      <div className="text-center mb-10">
        <h1 className="font-serif text-4xl sm:text-6xl lg:text-[70px] text-neutral-900 leading-[1.05] mb-3 tracking-tight">
          The next generation<br />
          <span className="font-normal italic">of founders.</span>
        </h1>
        <p className="font-sans font-extrabold text-xl sm:text-2xl text-black tracking-tight mb-3">
          All in one place.
        </p>
        <p className="text-sm sm:text-base text-neutral-500 max-w-lg mx-auto leading-relaxed">
          Every venture is real and verified by a human before a stage advances. No placeholders.
        </p>
      </div>

      {/* 3. Four Metric Stat Cards (Square rounded cards from Image 2) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-10">
        <StatCard value={128} label={`VENTURES\nLIVE`} delay={0} />
        <StatCard value={14} label={`REACHED\nREVENUE`} delay={100} />
        <StatCard value={47} label={`COLLEGES &\nSCHOOLS`} delay={200} />
        <StatCard value={3} label={`GRADUATED`} delay={300} />
      </div>

      {/* 4. Controls: Country & Category Switchers */}
      <div className="flex flex-col items-center gap-3.5 mb-10">
        {/* Country Toggle */}
        <div className="flex p-1 rounded-full bg-white/85 backdrop-blur-md border border-black/[0.08] shadow-xs">
          <button
            onClick={() => setCountry("India")}
            className={`px-5 py-1.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
              country === "India"
                ? "bg-black text-white shadow-sm"
                : "text-neutral-500 hover:text-black"
            }`}
          >
            <span
              className={`text-[10px] font-black px-1.5 py-0.5 rounded ${
                country === "India" ? "bg-white/25 text-white" : "text-neutral-400"
              }`}
            >
              IN
            </span>
            India
          </button>

          <button
            onClick={() => setCountry("USA")}
            className={`px-5 py-1.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
              country === "USA"
                ? "bg-black text-white shadow-sm"
                : "text-neutral-500 hover:text-black"
            }`}
          >
            <span
              className={`text-[10px] font-black px-1.5 py-0.5 rounded ${
                country === "USA" ? "bg-white/25 text-white" : "text-neutral-400"
              }`}
            >
              US
            </span>
            USA
          </button>
        </div>

        {/* Category Toggle */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCategory("College")}
            className={`px-5 py-2 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
              category === "College"
                ? "bg-black text-white shadow-md"
                : "bg-white/70 backdrop-blur-md text-neutral-600 hover:bg-white hover:text-black border border-black/[0.06]"
            }`}
          >
            College Venture Club
          </button>
          <button
            onClick={() => setCategory("HighSchool")}
            className={`px-5 py-2 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
              category === "HighSchool"
                ? "bg-black text-white shadow-md"
                : "bg-white/70 backdrop-blur-md text-neutral-600 hover:bg-white hover:text-black border border-black/[0.06]"
            }`}
          >
            Aspiring · High School
          </button>
        </div>

        {/* Search Field */}
        <div className="w-full max-w-sm px-2">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/75 backdrop-blur-md border border-black/[0.08] shadow-xs">
            <svg className="w-3.5 h-3.5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search campus or city..."
              className="w-full bg-transparent border-none outline-none text-xs sm:text-sm text-black placeholder:text-neutral-400"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="text-neutral-400 hover:text-black text-xs font-bold"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 5. Column Headers */}
      <div className="flex items-center justify-between px-5 sm:px-6 mb-3">
        <div className="text-[11px] font-bold tracking-widest text-neutral-400 uppercase">
          INSTITUTION
        </div>
        <div className="flex items-center gap-3 sm:gap-4 shrink-0 text-[11px] font-bold tracking-widest text-neutral-400 uppercase">
          <span className="w-10 sm:w-12 text-center">LIVE</span>
          <span className="w-10 sm:w-12 text-center">REV</span>
          <span className="w-12 sm:w-14 text-center">PTS</span>
        </div>
      </div>

      {/* 6. Campus Rows */}
      <div className="flex flex-col gap-3 mb-10">
        {filtered.length > 0 ? (
          filtered.map((inst, index) => {
            const rank = String(index + 1).padStart(2, "0");
            return (
              <div
                key={inst.id}
                className="bg-white rounded-[22px] px-4 sm:px-6 py-4 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-black/[0.04] flex items-center justify-between gap-3 sm:gap-4 transition-all hover:shadow-[0_8px_28px_rgba(0,0,0,0.06)] hover:-translate-y-0.5"
              >
                {/* Left: Rank, Logo, Details */}
                <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                  <span className="text-base sm:text-lg font-bold text-neutral-400 tabular-nums w-6 sm:w-7 shrink-0 text-center">
                    {rank}
                  </span>
                  <CampusLogo domain={inst.domain} name={inst.name} />
                  <div className="min-w-0">
                    <h3 className="text-xs sm:text-sm font-bold text-black truncate">
                      {inst.name}
                    </h3>
                    <div className="flex items-center gap-2 text-[11px] text-neutral-500 mt-0.5">
                      <span>{inst.city}</span>
                      <span>·</span>
                      <span>{inst.directors} Directors</span>
                      {inst.openSlots > 0 && (
                        <span className="bg-neutral-100 text-neutral-600 font-semibold px-2 py-0.5 rounded-full text-[10px]">
                          {inst.openSlots} {inst.openSlots === 1 ? "slot" : "slots"} open
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right: Stat Badges */}
                <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                  <div className="w-10 sm:w-12 py-1.5 rounded-xl bg-neutral-100 flex flex-col items-center justify-center">
                    <span className="text-xs sm:text-sm font-extrabold text-black tabular-nums">
                      {inst.liveVentures}
                    </span>
                    <span className="text-[8px] font-bold text-neutral-400 uppercase tracking-wider">
                      LIVE
                    </span>
                  </div>

                  <div className="w-10 sm:w-12 py-1.5 rounded-xl bg-neutral-100 flex flex-col items-center justify-center">
                    <span className="text-xs sm:text-sm font-extrabold text-black tabular-nums">
                      {inst.reachedRevenue}
                    </span>
                    <span className="text-[8px] font-bold text-neutral-400 uppercase tracking-wider">
                      REV
                    </span>
                  </div>

                  <div className="w-12 sm:w-14 py-1.5 rounded-xl bg-black text-white flex flex-col items-center justify-center shadow-xs">
                    <span className="text-xs sm:text-sm font-extrabold tabular-nums">
                      {inst.points}
                    </span>
                    <span className="text-[8px] font-bold text-neutral-300 uppercase tracking-wider">
                      PTS
                    </span>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="bg-white rounded-2xl p-8 text-center border border-black/[0.04]">
            <p className="text-neutral-500 text-sm">
              No institutions found matching "{searchQuery}" in {country} ({category}).
            </p>
          </div>
        )}
      </div>

      {/* 7. Points Explanation Card */}
      <div className="bg-white/80 backdrop-blur-md rounded-2xl p-4 sm:p-5 text-xs text-neutral-500 text-center leading-relaxed border border-black/[0.04] mb-10 shadow-xs">
        <strong className="text-black">Verified Stage Points:</strong> Stage 1 = 1pt · Stage 3 = 5pts · Stage 5 (Revenue) = 25pts · Stage 8 (Graduation) = 100pts. All milestones verified by human review.
      </div>

      {/* 8. Bottom CTA Card */}
      <div className="rounded-[28px] sm:rounded-[36px] bg-neutral-900 text-white p-8 sm:p-12 text-center relative overflow-hidden shadow-2xl">
        <p className="text-neutral-400 text-xs sm:text-sm font-medium tracking-wide uppercase mb-2">
          Your campus isn't on the board yet?
        </p>
        <h2 className="font-serif text-2xl sm:text-4xl text-white mb-6">
          Apply as Campus Director <br className="hidden sm:inline" />
          <span className="italic font-normal text-neutral-300">or submit your venture idea.</span>
        </h2>
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center max-w-md mx-auto">
          <a
            href="applydirectorintern.html"
            className="w-full sm:w-auto px-7 py-3 rounded-full bg-white text-black font-bold text-xs sm:text-sm hover:bg-neutral-100 transition-all text-decoration-none shadow-md"
          >
            Become Campus Director
          </a>
          <a
            href="venture_club.html"
            className="w-full sm:w-auto px-7 py-3 rounded-full bg-white/10 text-white font-semibold text-xs sm:text-sm hover:bg-white/20 transition-all text-decoration-none border border-white/20"
          >
            Submit your idea
          </a>
        </div>
      </div>
    </div>
  );
}
