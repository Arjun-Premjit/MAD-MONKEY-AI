import { useState, useEffect } from "react";

const INSTITUTIONS_INDIA_COLLEGE = [
  { id: 1, name: "Christ University", location: "Bangalore", directors: 2, live: 17, rev: 4, pts: 248, slots: null, domain: "christuniversity.in" },
  { id: 2, name: "Chennai Inst. of Technology", location: "Chennai", directors: 2, live: 14, rev: 3, pts: 201, slots: null, domain: "citchennai.net" },
  { id: 3, name: "Symbiosis", location: "Pune", directors: 2, live: 11, rev: 2, pts: 176, slots: null, domain: "symbiosis.ac.in" },
  { id: 4, name: "IIT Bombay", location: "Mumbai", directors: 2, live: 9, rev: 2, pts: 152, slots: null, domain: "iitb.ac.in" },
  { id: 5, name: "RV College of Engineering", location: "Bangalore", directors: 1, live: 7, rev: 1, pts: 108, slots: "1 slot open", domain: "rvce.edu.in" },
  { id: 6, name: "PES University", location: "Bangalore", directors: 0, live: 4, rev: 0, pts: 52, slots: "Both slots open", domain: "pes.edu" },
];

const INSTITUTIONS_USA_COLLEGE = [
  { id: 1, name: "Stanford University", location: "Palo Alto, CA", directors: 2, live: 21, rev: 6, pts: 312, slots: null, domain: "stanford.edu" },
  { id: 2, name: "MIT", location: "Cambridge, MA", directors: 2, live: 18, rev: 5, pts: 274, slots: null, domain: "mit.edu" },
  { id: 3, name: "UC Berkeley", location: "Berkeley, CA", directors: 2, live: 13, rev: 3, pts: 198, slots: null, domain: "berkeley.edu" },
  { id: 4, name: "NYU Stern", location: "New York, NY", directors: 2, live: 10, rev: 2, pts: 161, slots: null, domain: "nyu.edu" },
  { id: 5, name: "University of Michigan", location: "Ann Arbor, MI", directors: 1, live: 6, rev: 1, pts: 94, slots: "1 slot open", domain: "umich.edu" },
];

const INSTITUTIONS_INDIA_HS = [
  { id: 1, name: "Delhi Public School", location: "New Delhi", directors: 2, live: 8, rev: 2, pts: 118, slots: null, domain: "dpsrkp.net" },
  { id: 2, name: "Jain Heritage School", location: "Bangalore", directors: 2, live: 6, rev: 1, pts: 91, slots: null, domain: "jainheritagegroup.com" },
  { id: 3, name: "Oberoi International", location: "Mumbai", directors: 1, live: 4, rev: 1, pts: 64, slots: "1 slot open", domain: "oberoi-international.org" },
];

// iOS glass style presets
const glass = {
  // Standard frosted card — widget-level
  card: {
    background: "rgba(255,255,255,0.72)",
    backdropFilter: "blur(28px) saturate(1.8)",
    WebkitBackdropFilter: "blur(28px) saturate(1.8)",
    border: "1px solid rgba(255,255,255,0.9)",
    boxShadow: "0 2px 24px rgba(0,0,0,0.07), 0 1px 2px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.95)",
  },
  // Slightly more opaque for top row
  cardStrong: {
    background: "rgba(255,255,255,0.82)",
    backdropFilter: "blur(32px) saturate(2)",
    WebkitBackdropFilter: "blur(32px) saturate(2)",
    border: "1px solid rgba(255,255,255,0.95)",
    boxShadow: "0 4px 32px rgba(0,0,0,0.1), 0 1px 3px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,1)",
  },
  // Thinner/lighter — for nav bar, pills, toggles
  thin: {
    background: "rgba(255,255,255,0.55)",
    backdropFilter: "blur(20px) saturate(1.6)",
    WebkitBackdropFilter: "blur(20px) saturate(1.6)",
    border: "1px solid rgba(255,255,255,0.8)",
    boxShadow: "0 1px 12px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.9)",
  },
  // Dark — for CTA block
  dark: {
    background: "rgba(10,10,10,0.88)",
    backdropFilter: "blur(40px) saturate(1.5)",
    WebkitBackdropFilter: "blur(40px) saturate(1.5)",
    border: "1px solid rgba(255,255,255,0.08)",
    boxShadow: "0 24px 64px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.06)",
  },
};

function useCountUp(target: number, delay = 0) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let raf: number;
    const timeout = setTimeout(() => {
      const start = performance.now();
      const duration = 1300;
      const step = (now: number) => {
        const p = Math.min((now - start) / duration, 1);
        const ease = 1 - Math.pow(1 - p, 3);
        setCount(Math.round(ease * target));
        if (p < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    }, delay);
    return () => { clearTimeout(timeout); cancelAnimationFrame(raf); };
  }, [target, delay]);
  return count;
}

function StatCard({ value, label, delay }: { value: number; label: string; delay: number }) {
  const count = useCountUp(value, delay);
  return (
    <div
      className="rounded-3xl px-5 py-5 flex flex-col items-center gap-1.5"
      style={{ ...glass.card, animation: "fadeInUp 0.5s ease-out both", animationDelay: `${delay}ms` }}
    >
      <span className="text-3xl font-bold text-black" style={{ fontVariantNumeric: "tabular-nums", letterSpacing: "-0.02em" }}>
        {count}
      </span>
      <span className="text-xs font-semibold tracking-widest text-black/35 uppercase">{label}</span>
    </div>
  );
}

type Institution = {
  id: number; name: string; location: string; directors: number;
  live: number; rev: number; pts: number; slots: string | null; domain: string;
};

function CollegeLogo({ domain, name }: { domain: string; name: string }) {
  const [failed, setFailed] = useState(false);
  const initials = name.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase();
  const src = `https://logo.clearbit.com/${domain}`;

  if (failed) {
    return (
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-xs font-bold text-black/60"
        style={{
          background: "rgba(0,0,0,0.06)",
          border: "1px solid rgba(0,0,0,0.08)",
        }}
      >
        {initials}
      </div>
    );
  }

  return (
    <div
      className="w-10 h-10 rounded-xl overflow-hidden shrink-0 flex items-center justify-center"
      style={{
        background: "rgba(255,255,255,0.9)",
        border: "1px solid rgba(0,0,0,0.07)",
        boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
      }}
    >
      <img
        src={src}
        alt={name}
        className="w-8 h-8 object-contain"
        onError={() => setFailed(true)}
      />
    </div>
  );
}

function LeaderboardRow({ inst, index }: { inst: Institution; index: number }) {
  const rank = inst.id;
  const [hovered, setHovered] = useState(false);

  const rowStyle = rank === 1
    ? {
        ...glass.cardStrong,
        boxShadow: "0 6px 36px rgba(0,0,0,0.12), 0 1px 3px rgba(0,0,0,0.07), inset 0 1px 0 rgba(255,255,255,1)",
      }
    : {
        ...glass.card,
        ...(hovered ? {
          background: "rgba(255,255,255,0.88)",
          boxShadow: "0 8px 40px rgba(0,0,0,0.11), 0 2px 6px rgba(0,0,0,0.07), inset 0 1px 0 rgba(255,255,255,1)",
        } : {}),
      };

  return (
    <div
      className="relative flex items-center gap-4 px-5 py-4 rounded-[22px] cursor-default"
      style={{
        ...rowStyle,
        animation: "fadeInUp 0.45s ease-out both",
        animationDelay: `${280 + index * 70}ms`,
        transition: "all 0.2s ease",
        transform: hovered ? "translateY(-1px)" : "translateY(0)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Rank number */}
      <div className="w-9 flex items-center justify-center shrink-0">
        {rank === 1 && <span className="text-base font-black text-black tracking-tight">01</span>}
        {rank === 2 && <span className="text-base font-bold text-black/60 tracking-tight">02</span>}
        {rank === 3 && <span className="text-base font-bold text-black/45 tracking-tight">03</span>}
        {rank > 3  && <span className="text-sm font-semibold text-black/28 tracking-tight">{String(rank).padStart(2,"0")}</span>}
      </div>

      {/* Hairline divider */}
      <div className="w-px self-stretch bg-black/[0.07] shrink-0" />

      {/* Logo */}
      <CollegeLogo domain={inst.domain} name={inst.name} />

      {/* Institution info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className={`font-semibold text-black ${rank === 1 ? "text-[15px]" : "text-sm"}`}>
            {inst.name}
          </span>
          {inst.slots && (
            <span
              className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full"
              style={{
                background: "rgba(0,0,0,0.06)",
                color: "rgba(0,0,0,0.45)",
                border: "1px solid rgba(0,0,0,0.09)",
              }}
            >
              {inst.slots}
            </span>
          )}
        </div>
        <div className="text-xs text-black/32 mt-0.5 flex items-center gap-1.5">
          <span>{inst.location}</span>
          {inst.directors > 0 && <span className="text-black/20">·</span>}
          {inst.directors > 0 && <span>{inst.directors} {inst.directors === 1 ? "Director" : "Directors"}</span>}
        </div>
      </div>

      {/* Stat pills */}
      <div className="flex items-center gap-3 shrink-0">
        {/* Live */}
        <div
          className="flex flex-col items-center justify-center w-12 h-12 rounded-2xl"
          style={{
            background: "rgba(0,0,0,0.04)",
            border: "1px solid rgba(0,0,0,0.06)",
          }}
        >
          <span className="text-sm font-bold text-black leading-tight">{inst.live}</span>
          <span className="text-[10px] font-semibold text-black/30 uppercase tracking-wide hidden sm:block">Live</span>
        </div>
        {/* Rev */}
        <div
          className="flex flex-col items-center justify-center w-12 h-12 rounded-2xl"
          style={{
            background: inst.rev > 0 ? "rgba(0,0,0,0.06)" : "rgba(0,0,0,0.025)",
            border: "1px solid rgba(0,0,0,0.06)",
          }}
        >
          <span className={`text-sm font-bold leading-tight ${inst.rev > 0 ? "text-black" : "text-black/18"}`}>{inst.rev}</span>
          <span className="text-[10px] font-semibold text-black/30 uppercase tracking-wide hidden sm:block">Rev</span>
        </div>
        {/* Pts */}
        <div
          className="flex flex-col items-center justify-center w-14 h-12 rounded-2xl"
          style={{
            background: rank === 1 ? "rgba(0,0,0,0.09)" : "rgba(0,0,0,0.04)",
            border: rank <= 3 ? "1px solid rgba(0,0,0,0.1)" : "1px solid rgba(0,0,0,0.06)",
          }}
        >
          <span className={`font-black leading-tight ${rank === 1 ? "text-base text-black" : "text-sm text-black/65"}`}>{inst.pts}</span>
          <span className="text-[10px] font-semibold text-black/30 uppercase tracking-wide hidden sm:block">Pts</span>
        </div>
      </div>
    </div>
  );
}

function CloudSVG({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <div className={`absolute pointer-events-none select-none ${className ?? ""}`} style={style}>
      <svg viewBox="0 0 400 160" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <ellipse cx="200" cy="110" rx="185" ry="55" fill="white" opacity="0.9" />
        <ellipse cx="130" cy="88" rx="90" ry="65" fill="white" opacity="0.9" />
        <ellipse cx="260" cy="82" rx="100" ry="68" fill="white" opacity="0.85" />
        <ellipse cx="195" cy="68" rx="75" ry="62" fill="white" opacity="0.95" />
        <ellipse cx="310" cy="100" rx="65" ry="45" fill="white" opacity="0.8" />
      </svg>
    </div>
  );
}

export default function App() {
  const [country, setCountry] = useState<"India" | "USA">("India");
  const [category, setCategory] = useState<"College" | "HighSchool">("College");

  const data =
    category === "College"
      ? country === "India" ? INSTITUTIONS_INDIA_COLLEGE : INSTITUTIONS_USA_COLLEGE
      : INSTITUTIONS_INDIA_HS;

  return (
    <div className="min-h-full w-full relative overflow-x-hidden" style={{ background: "#ebebeb" }}>

      {/* Floating clouds */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <CloudSVG className="w-96 cloud-drift-slow" style={{ top: "-2%", left: "-5%", opacity: 0.85 }} />
        <CloudSVG className="w-80 cloud-drift"      style={{ top: "6%", right: "-4%", opacity: 0.7 }} />
        <CloudSVG className="w-72 cloud-drift-med"  style={{ top: "38%", left: "2%", opacity: 0.45 }} />
        <CloudSVG className="w-64 cloud-drift-slow" style={{ top: "55%", right: "0%", opacity: 0.35 }} />
        <CloudSVG className="w-56 cloud-drift"      style={{ bottom: "12%", left: "10%", opacity: 0.3 }} />
        <CloudSVG className="w-80 cloud-drift-med"  style={{ bottom: "-4%", right: "8%", opacity: 0.25 }} />
      </div>

      {/* Main */}
      <main className="relative z-10 w-full max-w-5xl mx-auto px-4 pb-24 pt-6">

        {/* Live pill */}
        <div className="flex justify-center mb-6">
          <div
            className="flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold text-black/55"
            style={glass.thin}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-black animate-pulse inline-block" />
            Live · Updated daily · No login needed
          </div>
        </div>

        {/* Hero */}
        <div className="text-center mb-10" style={{ animation: "fadeInUp 0.5s ease-out both" }}>
          <h1 className="font-serif text-4xl md:text-[52px] text-black leading-[1.12] mb-3">
            The next generation<br />
            <em>of founders.</em>
          </h1>
          <p className="text-black font-bold text-lg">All in one place.</p>
          <p className="text-black/38 text-sm mt-2 max-w-xs mx-auto leading-relaxed">
            Every venture is real and verified by a human before a stage advances. No placeholders.
          </p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
          <StatCard value={128} label="Ventures Live"    delay={0} />
          <StatCard value={14}  label="Reached Revenue"  delay={100} />
          <StatCard value={47}  label="Colleges & Schools" delay={200} />
          <StatCard value={3}   label="Graduated"        delay={300} />
        </div>

        {/* Country toggle */}
        <div className="flex justify-center mb-4">
          <div className="flex p-1 rounded-full gap-1" style={glass.thin}>
            {(["India", "USA"] as const).map((c) => (
              <button
                key={c}
                onClick={() => setCountry(c)}
                className="px-5 py-1.5 rounded-full text-sm font-semibold transition-all duration-200"
                style={
                  country === c
                    ? { background: "#000", color: "#fff", boxShadow: "0 2px 10px rgba(0,0,0,0.22)" }
                    : { color: "rgba(0,0,0,0.4)" }
                }
              >
                {c === "India" ? "🇮🇳 " : "🇺🇸 "}{c}
              </button>
            ))}
          </div>
        </div>

        {/* Category tabs */}
        <div className="flex justify-center gap-2 mb-8">
          {([["College", "College Venture Club"], ["HighSchool", "Aspiring · High School"]] as const).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setCategory(key)}
              className="px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200"
              style={
                category === key
                  ? { background: "#000", color: "#fff", boxShadow: "0 4px 16px rgba(0,0,0,0.22)" }
                  : { ...glass.thin, color: "rgba(0,0,0,0.4)" }
              }
            >
              {label}
            </button>
          ))}
        </div>

        {/* Column header labels */}
        <div className="flex items-center gap-4 px-5 mb-2">
          <div className="w-9" />
          <div className="w-px" />
          <div className="flex-1 text-xs font-semibold tracking-widest text-black/28 uppercase">Institution</div>
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-12 text-center text-xs font-semibold tracking-widest text-black/28 uppercase">Live</div>
            <div className="w-12 text-center text-xs font-semibold tracking-widest text-black/28 uppercase">Rev</div>
            <div className="w-14 text-center text-xs font-semibold tracking-widest text-black/40 uppercase">Pts</div>
          </div>
        </div>

        {/* Leaderboard rows */}
        <div className="flex flex-col gap-2.5 mb-6">
          {data.map((inst, i) => (
            <LeaderboardRow key={`${country}-${category}-${inst.id}`} inst={inst} index={i} />
          ))}
        </div>

        {/* Points key */}
        <div
          className="rounded-3xl px-5 py-4 text-xs text-black/38 text-center leading-relaxed mb-10"
          style={glass.card}
        >
          <span className="font-semibold text-black/55">Points:</span>{" "}
          Stage 1 = <span className="font-semibold text-black/65">1pt</span> ·{" "}
          Stage 3 = <span className="font-semibold text-black/65">5pts</span> ·{" "}
          Stage 5 Revenue = <span className="font-semibold text-black">25pts</span> ·{" "}
          Stage 8 Graduate = <span className="font-bold text-black">100pts</span>.{" "}
          Every stage verified by a human.
        </div>

        {/* CTA */}
        <div className="rounded-[28px] px-8 py-10 text-center relative overflow-hidden" style={glass.dark}>
          {/* Inner glow edges */}
          <div className="absolute inset-0 pointer-events-none rounded-[28px]"
            style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.1), inset 0 -1px 0 rgba(255,255,255,0.03)" }} />

          <p className="text-white/42 text-sm mb-1">Your campus isn't on the board yet?</p>
          <p className="text-white font-semibold text-lg mb-6">
            <span className="font-bold">Apply as Campus Director</span>{" "}
            or submit your venture idea.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              className="px-7 py-3 rounded-full bg-white text-black font-semibold text-sm transition-all duration-200 hover:bg-white/90 hover:scale-105"
              style={{ boxShadow: "0 2px 20px rgba(255,255,255,0.15)" }}
            >
              Become Campus Director
            </button>
            <button
              className="px-7 py-3 rounded-full font-semibold text-sm text-white transition-all duration-200 hover:scale-105"
              style={{
                background: "rgba(255,255,255,0.1)",
                border: "1px solid rgba(255,255,255,0.18)",
                backdropFilter: "blur(10px)",
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.12)",
              }}
            >
              Submit your idea
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
