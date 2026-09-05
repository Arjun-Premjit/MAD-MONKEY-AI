import React, { useState } from "react";
import StatCard from "./StatCard";
import { DIRECTORS_DATA, DirectorItem } from "../data";

export default function DirectorsView() {
  const [country, setCountry] = useState<"in" | "us">("in");
  const [roleType, setRoleType] = useState<"campus" | "city">("campus");
  const [selectedCity, setSelectedCity] = useState("All");

  const currentDataset = DIRECTORS_DATA[country][roleType];
  const cities: string[] = roleType === "campus" && "cities" in currentDataset ? (currentDataset.cities as string[]) : [];

  const items = currentDataset.items.filter((item: DirectorItem) => {
    if (roleType === "campus" && selectedCity !== "All") {
      return item.city.toLowerCase() === selectedCity.toLowerCase();
    }
    return true;
  });

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 pb-24 pt-24 sm:pt-32">
      {/* 1. Pill Badge */}
      <div className="flex justify-center mb-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-black/[0.06] shadow-xs text-xs font-semibold text-neutral-700">
          <span className="w-2 h-2 rounded-full bg-black inline-block" />
          Ground Team · On-Campus Leadership
        </div>
      </div>

      {/* 2. Hero Typography */}
      <div className="text-center mb-10">
        <h1 className="font-serif text-4xl sm:text-6xl lg:text-[70px] text-neutral-900 leading-[1.05] mb-3 tracking-tight">
          The campus directors<br />
          <span className="font-normal italic">running the corridors.</span>
        </h1>
        <p className="font-sans font-extrabold text-xl sm:text-2xl text-black tracking-tight mb-3">
          In real life.
        </p>
        <p className="text-sm sm:text-base text-neutral-500 max-w-xl mx-auto leading-relaxed">
          Campus Directors own their college corridor. City Directors coordinate multiple campuses across the metro. Together they power the network on the ground.
        </p>
      </div>

      {/* 3. Four Metric Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-10">
        <StatCard value={country === "in" ? 42 : 12} label={`CAMPUS\nDIRECTORS`} delay={0} />
        <StatCard value={country === "in" ? 16 : 8} label={`OPEN\nCORRIDORS`} delay={100} />
        <StatCard value={country === "in" ? 8 : 4} label={`METRO\nCITIES`} delay={200} />
        <StatCard value={country === "in" ? 1240 : 320} label={`VENTURE\nVISITS`} delay={300} />
      </div>

      {/* 4. Controls: Country & Role Switchers */}
      <div className="flex flex-col items-center gap-3.5 mb-10">
        {/* Country Switcher */}
        <div className="flex p-1 rounded-full bg-white/85 backdrop-blur-md border border-black/[0.08] shadow-xs">
          <button
            onClick={() => {
              setCountry("in");
              setSelectedCity("All");
            }}
            className={`px-5 py-1.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
              country === "in"
                ? "bg-black text-white shadow-sm"
                : "text-neutral-500 hover:text-black"
            }`}
          >
            <span
              className={`text-[10px] font-black px-1.5 py-0.5 rounded ${
                country === "in" ? "bg-white/25 text-white" : "text-neutral-400"
              }`}
            >
              IN
            </span>
            India
          </button>

          <button
            onClick={() => {
              setCountry("us");
              setSelectedCity("All");
            }}
            className={`px-5 py-1.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
              country === "us"
                ? "bg-black text-white shadow-sm"
                : "text-neutral-500 hover:text-black"
            }`}
          >
            <span
              className={`text-[10px] font-black px-1.5 py-0.5 rounded ${
                country === "us" ? "bg-white/25 text-white" : "text-neutral-400"
              }`}
            >
              US
            </span>
            USA
          </button>
        </div>

        {/* Role Switcher */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setRoleType("campus");
              setSelectedCity("All");
            }}
            className={`px-5 py-2 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
              roleType === "campus"
                ? "bg-black text-white shadow-md"
                : "bg-white/70 backdrop-blur-md text-neutral-600 hover:bg-white hover:text-black border border-black/[0.06]"
            }`}
          >
            Campus Directors
          </button>

          <button
            onClick={() => {
              setRoleType("city");
              setSelectedCity("All");
            }}
            className={`px-5 py-2 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
              roleType === "city"
                ? "bg-black text-white shadow-md"
                : "bg-white/70 backdrop-blur-md text-neutral-600 hover:bg-white hover:text-black border border-black/[0.06]"
            }`}
          >
            City Directors
          </button>
        </div>

        {/* City Filter Pills */}
        {cities.length > 0 && (
          <div className="flex flex-wrap justify-center gap-1.5 pt-1">
            {cities.map((city: string) => (
              <button
                key={city}
                onClick={() => setSelectedCity(city)}
                className={`px-3.5 py-1 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
                  selectedCity === city
                    ? "bg-black text-white"
                    : "bg-white/60 text-neutral-600 hover:bg-white hover:text-black border border-black/[0.06]"
                }`}
              >
                {city === "All" ? "All Cities" : city}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* 5. Dataset Banner Callout */}
      <div className="bg-white/85 backdrop-blur-md rounded-2xl p-4 sm:p-5 text-xs sm:text-sm text-neutral-700 leading-relaxed border border-black/[0.06] mb-8 shadow-xs flex items-center justify-between gap-4">
        <div>
          <span className="font-bold text-black">
            {roleType === "campus" ? "📍 Single-Campus Leadership:" : "🌆 Metro Territory:"}
          </span>{" "}
          {currentDataset.banner}
        </div>
        <a
          href="applydirectorintern.html"
          className="shrink-0 px-4 py-2 rounded-full bg-black text-white text-xs font-bold hover:bg-neutral-800 transition-colors text-decoration-none shadow-xs"
        >
          {currentDataset.ctaText}
        </a>
      </div>

      {/* 6. Directors Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
        {items.map((dir) => (
          <div
            key={dir.id}
            className={`bg-white rounded-[22px] p-5 sm:p-6 shadow-[0_4px_24px_rgba(0,0,0,0.03)] border transition-all ${
              dir.isOpen
                ? "border-dashed border-neutral-300 bg-neutral-50/50"
                : "border-black/[0.04] hover:shadow-[0_8px_28px_rgba(0,0,0,0.06)] hover:-translate-y-0.5"
            }`}
          >
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex items-center gap-3">
                <div
                  className={`w-11 h-11 rounded-2xl flex items-center justify-center font-bold text-sm shrink-0 ${
                    dir.isOpen
                      ? "bg-neutral-200 text-neutral-600"
                      : "bg-black text-white shadow-xs"
                  }`}
                >
                  {dir.initials}
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-black leading-snug">
                    {dir.name}
                  </h3>
                  <p className="text-xs text-neutral-500">{dir.subtitle}</p>
                </div>
              </div>

              <span
                className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                  dir.isOpen
                    ? "bg-neutral-200 text-neutral-700"
                    : dir.role === "CITY DIRECTOR"
                    ? "bg-purple-100 text-purple-800"
                    : "bg-neutral-100 text-neutral-800"
                }`}
              >
                {dir.role}
              </span>
            </div>

            <p className="text-xs text-neutral-600 mb-4 leading-relaxed bg-neutral-50/80 p-3 rounded-xl border border-black/[0.03]">
              {dir.turf}
            </p>

            {dir.isOpen ? (
              <a
                href="applydirectorintern.html"
                className="w-full py-2.5 rounded-xl bg-black text-white text-center text-xs font-bold block text-decoration-none hover:bg-neutral-800 transition-colors shadow-xs"
              >
                {dir.claimText || "Claim this slot"}
              </a>
            ) : (
              <div className="grid grid-cols-3 gap-2 pt-1 border-t border-black/[0.04]">
                <div className="text-center py-1 bg-neutral-50 rounded-lg">
                  <div className="text-xs sm:text-sm font-extrabold text-black tabular-nums">
                    {(dir as DirectorItem).ventures || "0"}
                  </div>
                  <div className="text-[9px] font-bold text-neutral-400 uppercase tracking-wider">
                    Ventures
                  </div>
                </div>
                <div className="text-center py-1 bg-neutral-50 rounded-lg">
                  <div className="text-xs sm:text-sm font-extrabold text-black tabular-nums">
                    {(dir as DirectorItem).revenue || "0"}
                  </div>
                  <div className="text-[9px] font-bold text-neutral-400 uppercase tracking-wider">
                    Revenue
                  </div>
                </div>
                <div className="text-center py-1 bg-neutral-50 rounded-lg">
                  <div className="text-xs sm:text-sm font-extrabold text-black tabular-nums">
                    {(dir as DirectorItem).walkIns || "0"}
                  </div>
                  <div className="text-[9px] font-bold text-neutral-400 uppercase tracking-wider">
                    Walk-Ins
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* 7. Bottom CTA */}
      <div className="rounded-[28px] sm:rounded-[36px] bg-neutral-900 text-white p-8 sm:p-12 text-center relative overflow-hidden shadow-2xl">
        <p className="text-neutral-400 text-xs sm:text-sm font-medium tracking-wide uppercase mb-2">
          Want to lead your college corridor?
        </p>
        <h2 className="font-serif text-2xl sm:text-4xl text-white mb-6">
          Apply as Campus Director <br className="hidden sm:inline" />
          <span className="italic font-normal text-neutral-300">and own your turf.</span>
        </h2>
        <a
          href="applydirectorintern.html"
          className="inline-block px-8 py-3.5 rounded-full bg-white text-black font-bold text-xs sm:text-sm hover:bg-neutral-100 transition-all text-decoration-none shadow-md"
        >
          Submit Director Application
        </a>
      </div>
    </div>
  );
}
