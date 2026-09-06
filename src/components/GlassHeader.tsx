import { useState, useEffect, useRef } from "react";

interface GlassHeaderProps {
  currentView: "leaderboard" | "directors" | "foundingmembers";
  onNavigate: (view: "leaderboard" | "directors" | "foundingmembers") => void;
}

export default function GlassHeader({ currentView, onNavigate }: GlassHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [clubsDropdownOpen, setClubsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLLIElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setClubsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleNavClick = (view: "leaderboard" | "directors" | "foundingmembers", e: React.MouseEvent) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    onNavigate(view);
    const newPath = `/${view}.html`;
    window.history.pushState({ view }, "", newPath);
  };

  return (
    <header className="fixed top-2.5 sm:top-4 left-1/2 -translate-x-1/2 z-50 w-[min(calc(100%-20px),1280px)] pointer-events-none transition-all duration-300">
      <div className="flex items-center justify-between gap-2 sm:gap-4 w-full">
        {/* Brand Logo Outer */}
        <a
          href="/index.html"
          className="pointer-events-auto flex items-center shrink-0 transition-transform duration-200 hover:scale-[1.02]"
          aria-label="Mad Monkey AI Home"
        >
          <img
            src="/MAD MONKEY LOGO.png"
            alt="Mad Monkey AI Logo"
            className="h-10 sm:h-14 md:h-16 lg:h-[72px] w-auto object-contain select-none"
            style={{
              mixBlendMode: "multiply",
              filter: "drop-shadow(0 2px 8px rgba(0, 0, 0, 0.08))",
            }}
          />
        </a>

        {/* Desktop Glass Capsule Header */}
        <nav
          className="hidden md:flex pointer-events-auto items-center justify-center flex-1 max-w-[820px] mx-auto h-[48px] lg:h-[54px] px-3 lg:px-6 rounded-full transition-all duration-300"
          style={{
            background: "rgba(255, 255, 255, 0.72)",
            backdropFilter: "blur(40px) saturate(180%) brightness(1.04)",
            WebkitBackdropFilter: "blur(40px) saturate(180%) brightness(1.04)",
            border: "1px solid rgba(255, 255, 255, 0.85)",
            boxShadow:
              "0 2px 20px rgba(0, 0, 0, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.95), inset 0 -1px 0 rgba(255, 255, 255, 0.2)",
          }}
        >
          <ul className="flex items-center gap-1 lg:gap-2 list-none m-0 p-0 text-[13px] lg:text-[13.5px] font-semibold">
            <li>
              <a
                href="/index.html"
                className="px-2.5 lg:px-3.5 py-1.5 rounded-full text-black/60 hover:text-black hover:bg-black/[0.04] transition-all duration-200 whitespace-nowrap"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="/index.html#how-spark-works"
                className="px-2.5 lg:px-3.5 py-1.5 rounded-full text-black/60 hover:text-black hover:bg-black/[0.04] transition-all duration-200 whitespace-nowrap"
              >
                How Spark Works
              </a>
            </li>
            <li>
              <a
                href="/index.html#features"
                className="px-2.5 lg:px-3.5 py-1.5 rounded-full text-black/60 hover:text-black hover:bg-black/[0.04] transition-all duration-200 whitespace-nowrap"
              >
                Features
              </a>
            </li>
            <li>
              <a
                href="/index.html#about"
                className="px-2.5 lg:px-3.5 py-1.5 rounded-full text-black/60 hover:text-black hover:bg-black/[0.04] transition-all duration-200 whitespace-nowrap"
              >
                About
              </a>
            </li>

            {/* Clubs Dropdown */}
            <li className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setClubsDropdownOpen(!clubsDropdownOpen)}
                onMouseEnter={() => setClubsDropdownOpen(true)}
                className="px-2.5 lg:px-3.5 py-1.5 rounded-full text-black/80 hover:text-black hover:bg-black/[0.04] transition-all duration-200 flex items-center gap-1 font-semibold whitespace-nowrap cursor-pointer"
              >
                Clubs
                <i className="bi bi-chevron-down text-[10px] opacity-60" />
              </button>

              {clubsDropdownOpen && (
                <div
                  onMouseLeave={() => setClubsDropdownOpen(false)}
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-56 p-1.5 rounded-2xl flex flex-col gap-1 shadow-[0_12px_36px_rgba(0,0,0,0.1)] transition-all duration-200"
                  style={{
                    background: "rgba(255, 255, 255, 0.92)",
                    backdropFilter: "blur(30px) saturate(180%)",
                    WebkitBackdropFilter: "blur(30px) saturate(180%)",
                    border: "1px solid rgba(255, 255, 255, 0.95)",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.9)",
                  }}
                >
                  <a
                    href="/venture_club.html"
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-[13px] font-semibold text-black/80 hover:text-black hover:bg-black/[0.05] transition-all duration-150"
                  >
                    <i className="bi bi-rocket-takeoff text-black" />
                    <span>Venture Club</span>
                  </a>
                  <a
                    href="/junior_founder.php"
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-[13px] font-semibold text-black/80 hover:text-black hover:bg-black/[0.05] transition-all duration-150"
                  >
                    <i className="bi bi-backpack text-black" />
                    <span>High School-Junior</span>
                  </a>
                </div>
              )}
            </li>

            {/* Leaderboard */}
            <li>
              <button
                type="button"
                onClick={(e) => handleNavClick("leaderboard", e)}
                className={`px-2.5 lg:px-3.5 py-1.5 rounded-full transition-all duration-200 whitespace-nowrap cursor-pointer ${
                  currentView === "leaderboard"
                    ? "bg-black text-white font-bold shadow-[0_2px_8px_rgba(0,0,0,0.15)]"
                    : "text-black/60 hover:text-black hover:bg-black/[0.04]"
                }`}
              >
                Leaderboard
              </button>
            </li>

            {/* Founding Members */}
            <li>
              <button
                type="button"
                onClick={(e) => handleNavClick("foundingmembers", e)}
                className={`px-2.5 lg:px-3.5 py-1.5 rounded-full transition-all duration-200 whitespace-nowrap cursor-pointer ${
                  currentView === "foundingmembers"
                    ? "bg-black text-white font-bold shadow-[0_2px_8px_rgba(0,0,0,0.15)]"
                    : "text-black/60 hover:text-black hover:bg-black/[0.04]"
                }`}
              >
                Founding Members
              </button>
            </li>

            {/* Directors */}
            <li>
              <button
                type="button"
                onClick={(e) => handleNavClick("directors", e)}
                className={`px-2.5 lg:px-3.5 py-1.5 rounded-full transition-all duration-200 whitespace-nowrap cursor-pointer ${
                  currentView === "directors"
                    ? "bg-black text-white font-bold shadow-[0_2px_8px_rgba(0,0,0,0.15)]"
                    : "text-black/60 hover:text-black hover:bg-black/[0.04]"
                }`}
              >
                Directors
              </button>
            </li>
          </ul>
        </nav>

        {/* Download App CTA button (Liquid White Glass) */}
        <div className="hidden md:flex items-center shrink-0 pointer-events-auto">
          <a
            href="/index.html#download"
            className="inline-flex items-center justify-center gap-2 px-4 lg:px-5 py-2 lg:py-2.5 rounded-full font-bold text-[13px] lg:text-[14px] text-black transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
            style={{
              background: "rgba(255, 255, 255, 0.9)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1px solid rgba(255, 255, 255, 0.95)",
              boxShadow: "0 4px 16px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 1)",
            }}
          >
            <i className="bi bi-cloud-arrow-down-fill text-[15px]" />
            <span>Download App</span>
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden pointer-events-auto flex items-center justify-center w-10 h-10 rounded-full border border-black/10 transition-all duration-200 cursor-pointer"
          style={{
            background: "rgba(255, 255, 255, 0.85)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.05)",
          }}
          aria-label="Toggle navigation menu"
        >
          <i className={`bi ${mobileMenuOpen ? "bi-x-lg" : "bi-list"} text-xl text-black`} />
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          className="md:hidden pointer-events-auto mt-2 w-full max-w-[340px] ml-auto rounded-3xl p-4 flex flex-col gap-1.5 shadow-[0_16px_48px_rgba(0,0,0,0.15)] animate-in fade-in duration-200"
          style={{
            background: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(36px) saturate(180%)",
            WebkitBackdropFilter: "blur(36px) saturate(180%)",
            border: "1px solid rgba(255, 255, 255, 0.9)",
          }}
        >
          <a
            href="/index.html"
            className="px-4 py-2.5 rounded-2xl text-[14px] font-semibold text-black/70 hover:text-black hover:bg-black/[0.04]"
          >
            Home
          </a>
          <a
            href="/index.html#how-spark-works"
            className="px-4 py-2.5 rounded-2xl text-[14px] font-semibold text-black/70 hover:text-black hover:bg-black/[0.04]"
          >
            How Spark Works
          </a>
          <a
            href="/index.html#features"
            className="px-4 py-2.5 rounded-2xl text-[14px] font-semibold text-black/70 hover:text-black hover:bg-black/[0.04]"
          >
            Features
          </a>
          <a
            href="/index.html#about"
            className="px-4 py-2.5 rounded-2xl text-[14px] font-semibold text-black/70 hover:text-black hover:bg-black/[0.04]"
          >
            About
          </a>

          <div className="border-t border-black/5 my-1" />

          <a
            href="/venture_club.html"
            className="px-4 py-2 rounded-2xl text-[14px] font-semibold text-black/70 hover:text-black flex items-center gap-2"
          >
            <i className="bi bi-rocket-takeoff" /> Venture Club
          </a>
          <a
            href="/junior_founder.php"
            className="px-4 py-2 rounded-2xl text-[14px] font-semibold text-black/70 hover:text-black flex items-center gap-2"
          >
            <i className="bi bi-backpack" /> High School-Junior Founders
          </a>

          <div className="border-t border-black/5 my-1" />

          <button
            type="button"
            onClick={(e) => handleNavClick("leaderboard", e)}
            className={`text-left px-4 py-2.5 rounded-2xl text-[14px] font-semibold transition-all ${
              currentView === "leaderboard" ? "bg-black text-white font-bold" : "text-black/70"
            }`}
          >
            Leaderboard
          </button>
          <button
            type="button"
            onClick={(e) => handleNavClick("foundingmembers", e)}
            className={`text-left px-4 py-2.5 rounded-2xl text-[14px] font-semibold transition-all ${
              currentView === "foundingmembers" ? "bg-black text-white font-bold" : "text-black/70"
            }`}
          >
            Founding Members
          </button>
          <button
            type="button"
            onClick={(e) => handleNavClick("directors", e)}
            className={`text-left px-4 py-2.5 rounded-2xl text-[14px] font-semibold transition-all ${
              currentView === "directors" ? "bg-black text-white font-bold" : "text-black/70"
            }`}
          >
            Directors
          </button>

          <a
            href="/index.html#download"
            className="mt-2 text-center py-2.5 px-4 rounded-full bg-black text-white font-bold text-[14px] shadow-sm flex items-center justify-center gap-2"
          >
            <i className="bi bi-cloud-arrow-down-fill" /> Download App
          </a>
        </div>
      )}
    </header>
  );
}
