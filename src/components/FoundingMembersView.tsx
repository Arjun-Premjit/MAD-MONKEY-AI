import React, { useState } from "react";
import StatCard from "./StatCard";
import { FOUNDING_MEMBERS_DATA, FoundingMember } from "../data";

export default function FoundingMembersView() {
  const [country, setCountry] = useState<"in" | "us">("in");
  const [category, setCategory] = useState<string>("All");

  const currentDataset = FOUNDING_MEMBERS_DATA[country];
  const stats = currentDataset.stats;

  const categories = [
    "All",
    "Security",
    "Design",
    "Bug Fix",
    "UX Suggestion",
    "Community",
    "Development",
  ];

  const filteredMembers = currentDataset.members.filter((m) => {
    if (category === "All") return true;
    return m.category === category;
  });

  const getBadgeColor = (cat: FoundingMember["category"]) => {
    switch (cat) {
      case "Security":
        return "bg-red-50 text-red-700 border-red-200";
      case "Design":
        return "bg-purple-50 text-purple-700 border-purple-200";
      case "Bug Fix":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "UX Suggestion":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "Community":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "Development":
        return "bg-indigo-50 text-indigo-700 border-indigo-200";
      default:
        return "bg-neutral-100 text-neutral-800 border-neutral-200";
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 pb-24 pt-24 sm:pt-32">
      {/* 1. Pill Badge */}
      <div className="flex justify-center mb-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-black/[0.06] shadow-xs text-xs font-semibold text-neutral-700">
          <span className="w-2 h-2 rounded-full bg-black inline-block" />
          Verified Community · Founding Members
        </div>
      </div>

      {/* 2. Hero Typography */}
      <div className="text-center mb-10">
        <h1 className="font-serif text-4xl sm:text-6xl lg:text-[70px] text-neutral-900 leading-[1.05] mb-3 tracking-tight">
          The early builders<br />
          <span className="font-normal italic">of the network.</span>
        </h1>
        <p className="font-sans font-extrabold text-xl sm:text-2xl text-black tracking-tight mb-3">
          Before day one.
        </p>
        <p className="text-sm sm:text-base text-neutral-500 max-w-xl mx-auto leading-relaxed">
          The designers, engineers, and campus leads who stress-tested early builds, surfaced critical vulnerabilities, and shaped the Mad Monkey foundation.
        </p>
      </div>

      {/* 3. Four Metric Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-10">
        <StatCard value={stats.members} label={`FOUNDING\nMEMBERS`} delay={0} />
        <StatCard value={stats.bugs} label={`BUGS\nRESOLVED`} delay={100} />
        <StatCard value={stats.vulns} label={`SECURITY\nVULNS`} delay={200} />
        <StatCard value={stats.design} label={`DESIGN\nIMPACT`} delay={300} />
      </div>

      {/* 4. Controls: Country & Category Filter Pills */}
      <div className="flex flex-col items-center gap-3.5 mb-10">
        {/* Country Switcher */}
        <div className="flex p-1 rounded-full bg-white/85 backdrop-blur-md border border-black/[0.08] shadow-xs">
          <button
            onClick={() => {
              setCountry("in");
              setCategory("All");
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
              setCategory("All");
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

        {/* Category Filter Pills */}
        <div className="flex flex-wrap justify-center gap-1.5 pt-1 max-w-xl">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
                category === cat
                  ? "bg-black text-white shadow-sm"
                  : "bg-white/70 backdrop-blur-md text-neutral-600 hover:bg-white hover:text-black border border-black/[0.06]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* 5. Members Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
        {filteredMembers.map((member) => (
          <div
            key={member.id}
            className="bg-white rounded-[22px] p-5 sm:p-6 shadow-[0_4px_24px_rgba(0,0,0,0.03)] border border-black/[0.04] transition-all hover:shadow-[0_8px_28px_rgba(0,0,0,0.06)] hover:-translate-y-0.5 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-black text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-xs">
                    {member.initials}
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-black leading-snug">
                      {member.name}
                    </h3>
                    <p className="text-xs text-neutral-500">{member.location}</p>
                  </div>
                </div>

                <span
                  className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider border ${getBadgeColor(
                    member.category
                  )}`}
                >
                  {member.category}
                </span>
              </div>

              <p className="text-xs sm:text-[13px] text-neutral-600 leading-relaxed bg-neutral-50/70 p-3 rounded-xl border border-black/[0.03] mb-4">
                "{member.description}"
              </p>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-black/[0.04] text-[11px] text-neutral-400">
              <span>Verified Contributor</span>
              <span>{member.joined}</span>
            </div>
          </div>
        ))}
      </div>

      {/* 6. Bottom CTA */}
      <div className="rounded-[28px] sm:rounded-[36px] bg-neutral-900 text-white p-8 sm:p-12 text-center relative overflow-hidden shadow-2xl">
        <p className="text-neutral-400 text-xs sm:text-sm font-medium tracking-wide uppercase mb-2">
          Want to contribute to the core platform?
        </p>
        <h2 className="font-serif text-2xl sm:text-4xl text-white mb-6">
          Report bugs, test features, <br className="hidden sm:inline" />
          <span className="italic font-normal text-neutral-300">and join our Founding Circle.</span>
        </h2>
        <a
          href="mailto:founders@madmonkey.ai"
          className="inline-block px-8 py-3.5 rounded-full bg-white text-black font-bold text-xs sm:text-sm hover:bg-neutral-100 transition-all text-decoration-none shadow-md"
        >
          Submit Contribution or Bug
        </a>
      </div>
    </div>
  );
}
