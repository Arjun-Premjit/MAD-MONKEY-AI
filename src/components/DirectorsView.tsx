import { useState } from "react";
import { DIRECTORS_DATA } from "../data";

interface Props {
  glass: {
    card: React.CSSProperties;
    cardStrong: React.CSSProperties;
    thin: React.CSSProperties;
    dark: React.CSSProperties;
  };
  StatCard: React.ComponentType<{ value: number; label: React.ReactNode; delay: number }>;
}

export default function DirectorsView({ glass, StatCard }: Props) {
  const [country, setCountry] = useState<"India" | "USA">("India");
  const [role, setRole] = useState<"campus" | "city">("campus");
  const [selectedCity, setSelectedCity] = useState("All");

  const countryData = DIRECTORS_DATA[country];
  const roleData = countryData[role];

  const cities = role === "campus" && "cities" in roleData ? (roleData as { cities: string[] }).cities : [];

  const items = roleData.items.filter((item) => {
    if (role === "city" || selectedCity === "All") return true;
    return item.city.toLowerCase() === selectedCity.toLowerCase();
  });

  return (
    <div className="w-full flex flex-col items-center">
      {/* Live status badge with suitable gap from header */}
      <div className="flex justify-center mt-2 sm:mt-4 px-4 w-full">
        <div
          className="inline-flex items-center justify-center gap-2 rounded-full px-4 text-[13px] font-medium text-black/75 select-none"
          style={{
            width: "min(360px, calc(100vw - 32px))",
            height: "38px",
            background: "rgba(255, 255, 255, 0.82)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            border: "1px solid rgba(255, 255, 255, 0.95)",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.03), inset 0 1px 0 rgba(255,255,255,1)",
          }}
        >
          <span className="w-2 h-2 rounded-full bg-black inline-block shrink-0" />
          <span>Verified Network · Direct Campus Access</span>
        </div>
      </div>

      {/* Hero headline */}
      <div className="text-center mt-7 sm:mt-8 px-4 w-full" style={{ animation: "fadeInUp 0.5s ease-out both" }}>
        <h1 className="font-serif text-[42px] sm:text-[54px] md:text-[66px] text-black leading-[0.98] font-normal tracking-[-0.015em] max-w-[500px] mx-auto">
          The campus leaders<br />
          <span className="italic">driving the network.</span>
        </h1>
      </div>

      {/* Hero subheading */}
      <div className="text-center mt-6 sm:mt-8 px-4 w-full">
        <p className="text-black font-bold font-sans text-[21px] sm:text-[23px] md:text-[24px] tracking-tight leading-none">
          Leading real founders on the ground.
        </p>
      </div>

      {/* Description */}
      <div className="text-center mt-4 px-4 w-full">
        <p className="text-[#6b7280] text-[15px] sm:text-[16.5px] md:text-[17.5px] font-normal max-w-[480px] mx-auto leading-[1.65]">
          Campus and City Directors build the student venture ecosystem, coordinate local merchant partners, and anchor campus founder clubs.
        </p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-[15px] w-full max-w-[800px] px-2 sm:px-4 md:px-0 mx-auto mt-10 sm:mt-12 mb-8 sm:mb-10">
        <StatCard
          value={country === "India" ? 47 : 8}
          label={
            <>
              Campuses<br />Active
            </>
          }
          delay={0}
        />
        <StatCard
          value={country === "India" ? 18 : 4}
          label={
            <>
              Active<br />Directors
            </>
          }
          delay={100}
        />
        <StatCard
          value={country === "India" ? 128 : 24}
          label={
            <>
              Student<br />Founders
            </>
          }
          delay={200}
        />
        <StatCard
          value={country === "India" ? 12 : 3}
          label={
            <>
              Cities<br />Covered
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
              setSelectedCity("All");
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
              setSelectedCity("All");
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

      {/* Role filter tabs (Liquid Glass) */}
      <div className="flex justify-center items-center gap-2.5 sm:gap-3 mb-5 sm:mb-6 px-2">
        {([
          ["campus", "Campus Directors"],
          ["city", "City Directors"],
        ] as const).map(([key, label]) => (
          <button
            key={key}
            type="button"
            onClick={() => {
              setRole(key);
              setSelectedCity("All");
            }}
            className={`px-5 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
              role === key
                ? "bg-black text-white shadow-[0_4px_16px_rgba(0,0,0,0.18)]"
                : "text-black/70 hover:text-black"
            }`}
            style={
              role !== key
                ? {
                    background: "rgba(255, 255, 255, 0.75)",
                    backdropFilter: "blur(20px)",
                    WebkitBackdropFilter: "blur(20px)",
                    border: "1px solid rgba(255, 255, 255, 0.95)",
                    boxShadow: "0 2px 10px rgba(0,0,0,0.03)",
                  }
                : {}
            }
          >
            {label}
          </button>
        ))}
      </div>

      {/* City filter pills */}
      {role === "campus" && cities.length > 0 && (
        <div className="flex flex-wrap justify-center gap-1 sm:gap-1.5 mb-6 sm:mb-8 px-1">
          {cities.map((city) => (
            <button
              key={city}
              type="button"
              onClick={() => setSelectedCity(city)}
              className="px-3 sm:px-3.5 py-1 rounded-full text-[11px] sm:text-xs font-semibold transition-all duration-150 cursor-pointer"
              style={
                selectedCity === city
                  ? { background: "#000000", color: "#ffffff", boxShadow: "0 2px 8px rgba(0,0,0,0.18)" }
                  : {
                      background: "rgba(255, 255, 255, 0.7)",
                      backdropFilter: "blur(16px)",
                      WebkitBackdropFilter: "blur(16px)",
                      border: "1px solid rgba(255, 255, 255, 0.9)",
                      color: "rgba(0,0,0,0.6)",
                    }
              }
            >
              {city}
            </button>
          ))}
        </div>
      )}

      {/* Info notice banner (Liquid Glass) */}
      <div
        className="w-full max-w-[800px] rounded-2xl sm:rounded-3xl p-4 sm:p-5 mb-6 sm:mb-8 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4"
        style={glass.card}
      >
        <div className="flex items-center gap-3 text-xs sm:text-sm text-black/80 text-center sm:text-left">
          <span className="text-lg sm:text-xl">📍</span>
          <span>{roleData.banner}</span>
        </div>
        <a
          href="/applydirectorintern.html"
          className="w-full sm:w-auto shrink-0 px-5 py-2.5 rounded-full bg-black text-white text-xs font-bold text-center transition-all duration-200 hover:bg-black/85 shadow-sm"
        >
          {roleData.ctaText} →
        </a>
      </div>

      {/* Directors grid (Liquid Glass Cards) */}
      <div className="w-full max-w-[800px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4 mb-8 sm:mb-10">
        {items.map((m, idx) => {
          if (m.isOpen) {
            return (
              <div
                key={idx}
                className="rounded-2xl sm:rounded-3xl p-4 sm:p-6 flex flex-col justify-between transition-all duration-200 hover:scale-[1.01]"
                style={{
                  ...glass.card,
                  border: "1.5px dashed rgba(0,0,0,0.16)",
                  background: "rgba(255,255,255,0.5)",
                }}
              >
                <div>
                  <div className="flex items-center gap-3 mb-3 sm:mb-4">
                    <div
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center text-sm sm:text-base font-bold shrink-0 text-black/60"
                      style={{ background: "rgba(0,0,0,0.05)", border: "1px solid rgba(0,0,0,0.08)" }}
                    >
                      {m.initials}
                    </div>
                    <div className="min-w-0 pr-1">
                      <div className="font-bold text-black text-xs sm:text-sm truncate">{m.name}</div>
                      <div className="text-[11px] sm:text-xs text-black/45 truncate">{m.subtitle}</div>
                    </div>
                  </div>
                  <span className="inline-block px-2.5 py-0.5 rounded-full text-[9px] sm:text-[10px] font-bold tracking-wider uppercase bg-black/5 text-black border border-black/10 mb-2.5 sm:mb-3">
                    Open Territory
                  </span>
                  <p className="text-xs text-black/65 leading-relaxed mb-4">{m.turf}</p>
                </div>
                <a
                  href="/applydirectorintern.html"
                  className="w-full py-2.5 rounded-full text-xs font-bold text-center block transition-all duration-200 text-black hover:bg-black hover:text-white"
                  style={{
                    border: "1px solid rgba(0,0,0,0.2)",
                    background: "rgba(255,255,255,0.75)",
                  }}
                >
                  {m.claimText || "Claim this slot"} →
                </a>
              </div>
            );
          }

          return (
            <div
              key={idx}
              className="rounded-2xl sm:rounded-3xl p-4 sm:p-6 flex flex-col justify-between transition-all duration-200 hover:scale-[1.01]"
              style={{
                ...glass.card,
                boxShadow: "0 4px 24px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,1)",
              }}
            >
              <div>
                <div className="flex items-center gap-3 mb-3">
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
                  <div className="overflow-hidden min-w-0 pr-1">
                    <div className="font-bold text-black text-xs sm:text-sm truncate flex items-center gap-1.5">
                      <span className="truncate">{m.name}</span>
                      <span className="text-[10px] text-black shrink-0 font-bold" title="Verified Director">●</span>
                    </div>
                    <div className="text-[11px] sm:text-xs text-black/45 truncate">{m.subtitle}</div>
                  </div>
                </div>

                <div className="mb-2.5 sm:mb-3">
                  <span className="inline-block px-2.5 py-0.5 rounded-full text-[9px] sm:text-[10px] font-bold tracking-wider uppercase bg-black/5 text-black border border-black/10">
                    {m.role}
                  </span>
                </div>

                <p className="text-xs text-black/65 leading-relaxed mb-4">{m.turf}</p>
              </div>

              {/* Metrics row */}
              <div
                className="grid grid-cols-3 gap-1 sm:gap-2 p-2 sm:p-2.5 rounded-xl sm:rounded-2xl text-center"
                style={{ background: "rgba(0,0,0,0.03)", border: "1px solid rgba(0,0,0,0.05)" }}
              >
                <div>
                  <div className="text-xs sm:text-sm font-bold text-black">{m.ventures ?? "—"}</div>
                  <div className="text-[9px] sm:text-[10px] font-semibold text-black/40 uppercase">Ventures</div>
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-bold text-black">{m.revenue ?? "—"}</div>
                  <div className="text-[9px] sm:text-[10px] font-semibold text-black/40 uppercase">Revenue</div>
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-bold text-black">{m.walkIns ?? "—"}</div>
                  <div className="text-[9px] sm:text-[10px] font-semibold text-black/40 uppercase">
                    {role === "city" ? "Campuses" : "Walk-ins"}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* CTA section (Glass Dark Card) */}
      <div className="w-full max-w-[800px] rounded-2xl sm:rounded-[28px] p-6 sm:px-8 sm:py-10 text-center relative overflow-hidden" style={glass.dark}>
        <p className="text-white/50 text-xs sm:text-sm mb-1">Want to lead your college ecosystem?</p>
        <p className="text-white font-semibold text-base sm:text-lg mb-6 leading-snug">
          <span className="font-bold">Apply as Campus Director</span> or City Director.
        </p>
        <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 justify-center items-stretch sm:items-center">
          <a
            href="/applydirectorintern.html"
            className="px-6 sm:px-7 py-3 rounded-full bg-white text-black font-semibold text-xs sm:text-sm transition-all duration-200 hover:bg-white/90 text-center"
            style={{ boxShadow: "0 2px 20px rgba(255,255,255,0.15)" }}
          >
            Apply as Campus Director
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
            View Campus Leaderboard
          </a>
        </div>
      </div>
    </div>
  );
}
