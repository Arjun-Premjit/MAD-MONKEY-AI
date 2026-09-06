import { useState, useEffect, useRef } from "react";

interface GlassHeaderProps {
  currentView: "leaderboard" | "directors" | "foundingmembers";
  onNavigate: (view: "leaderboard" | "directors" | "foundingmembers") => void;
}

export default function GlassHeader({ currentView, onNavigate }: GlassHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [clubsDropdownOpen, setClubsDropdownOpen] = useState(false);
  const [mobileClubsOpen, setMobileClubsOpen] = useState(true);
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
            <li
              className="relative"
              ref={dropdownRef}
              onMouseEnter={() => setClubsDropdownOpen(true)}
              onMouseLeave={() => setClubsDropdownOpen(false)}
            >
              <button
                type="button"
                onClick={() => setClubsDropdownOpen(!clubsDropdownOpen)}
                className="px-2.5 lg:px-3.5 py-1.5 rounded-full text-black/80 hover:text-black hover:bg-black/[0.04] transition-all duration-200 flex items-center gap-1.5 font-semibold whitespace-nowrap cursor-pointer"
              >
                Clubs
                <i className={`bi bi-chevron-down text-[10px] transition-transform duration-200 ${clubsDropdownOpen ? "rotate-180" : "opacity-60"}`} />
              </button>

              {clubsDropdownOpen && (
                <div
                  className="absolute top-full left-1/2 -translate-x-1/2 pt-1.5 z-50 pointer-events-auto"
                >
                  <div
                    className="w-72 p-2 rounded-2xl flex flex-col gap-1 shadow-[0_16px_44px_rgba(12,30,61,0.12),inset_0_1px_1px_rgba(255,255,255,0.9)] transition-all duration-200"
                    style={{
                      background: "rgba(255, 255, 255, 0.82)",
                      backdropFilter: "blur(36px) saturate(190%)",
                      WebkitBackdropFilter: "blur(36px) saturate(190%)",
                      border: "1px solid rgba(255, 255, 255, 0.88)",
                    }}
                  >
                    <a
                      href="/venture_club.html"
                      className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/80 text-left transition-colors duration-150 group/item"
                    >
                      <div className="w-8 h-8 rounded-lg bg-[#eaf2fc]/90 border border-white/60 text-[#1d4ed8] group-hover/item:bg-[#1d4ed8] group-hover/item:text-white flex items-center justify-center shrink-0 transition-colors">
                        <i className="bi bi-rocket-takeoff text-sm" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[13px] font-bold text-[#0c1e3d] group-hover/item:text-[#1d4ed8] leading-tight">
                          Venture Club
                        </span>
                        <span className="text-[11px] font-medium text-[#627896] leading-tight mt-0.5">
                          College & student startups
                        </span>
                      </div>
                    </a>

                    <a
                      href="/junior_founder.html"
                      className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/80 text-left transition-colors duration-150 group/item"
                    >
                      <div className="w-8 h-8 rounded-lg bg-[#eaf2fc]/90 border border-white/60 text-[#1d4ed8] group-hover/item:bg-[#1d4ed8] group-hover/item:text-white flex items-center justify-center shrink-0 transition-colors">
                        <i className="bi bi-backpack text-sm" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[13px] font-bold text-[#0c1e3d] group-hover/item:text-[#1d4ed8] leading-tight">
                          High School-Junior
                        </span>
                        <span className="text-[11px] font-medium text-[#627896] leading-tight mt-0.5">
                          Grades 9 to 12 track
                        </span>
                      </div>
                    </a>
                  </div>
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

        {/* Mobile Menu Button (Placed next to logo on left) */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden pointer-events-auto flex items-center gap-1.5 h-9 px-3.5 rounded-full border border-black/10 transition-all duration-200 cursor-pointer text-[#0c1e3d] font-bold text-[13px]"
          style={{
            background: "rgba(255, 255, 255, 0.85)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.05)",
          }}
          aria-label="Toggle navigation menu"
        >
          <i className={`bi ${mobileMenuOpen ? "bi-x-lg" : "bi-list"} text-base`} />
          <span>Menu</span>
        </button>

        {/* Mobile Download CTA button (Right side) */}
        <div className="md:hidden flex items-center ml-auto pointer-events-auto">
          <a
            href="/index.html#download"
            className="inline-flex items-center justify-center px-3.5 py-1.5 rounded-full font-bold text-[12px] text-black transition-all"
            style={{
              background: "rgba(255, 255, 255, 0.9)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255, 255, 255, 0.95)",
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
            }}
          >
            Download App
          </a>
        </div>
      </div>

      {/* Mobile Vertical Header (Aligned to leftmost with vertical Clubs dropdown just right of clubs on hover) */}
      {mobileMenuOpen && (
        <div className="md:hidden pointer-events-auto mt-2 ml-0 mr-auto flex items-start gap-2 animate-in fade-in duration-200">
          {/* Main Navigation Glass Options (Column 1: Vertically stacked in glassmorphism) */}
          <div
            className="w-[160px] rounded-3xl p-2 flex flex-col gap-1.5 shadow-[0_24px_60px_rgba(12,30,61,0.16),0_4px_16px_rgba(12,30,61,0.05),inset_0_1px_2px_rgba(255,255,255,0.95)]"
            style={{
              background: "rgba(255, 255, 255, 0.82)",
              backdropFilter: "blur(40px) saturate(200%)",
              WebkitBackdropFilter: "blur(40px) saturate(200%)",
              border: "1px solid rgba(255, 255, 255, 0.95)",
            }}
          >
            <a
              href="/index.html"
              className="px-3 py-1.5 rounded-xl text-[13px] font-medium text-[#0c1e3d] flex items-center justify-between transition-all hover:bg-white/90 active:scale-[0.99]"
              style={{
                background: "rgba(255, 255, 255, 0.72)",
                backdropFilter: "blur(20px) saturate(180%)",
                WebkitBackdropFilter: "blur(20px) saturate(180%)",
                border: "1px solid rgba(255, 255, 255, 0.9)",
                boxShadow: "0 2px 8px rgba(12, 30, 61, 0.03), inset 0 1px 0 rgba(255, 255, 255, 0.95)",
              }}
            >
              <span>Home</span>
              <i className="bi bi-chevron-right text-[10px] opacity-40" />
            </a>

            <a
              href="/index.html#how-spark-works"
              className="px-3 py-1.5 rounded-xl text-[13px] font-medium text-[#0c1e3d] flex items-center justify-between transition-all hover:bg-white/90 active:scale-[0.99]"
              style={{
                background: "rgba(255, 255, 255, 0.72)",
                backdropFilter: "blur(20px) saturate(180%)",
                WebkitBackdropFilter: "blur(20px) saturate(180%)",
                border: "1px solid rgba(255, 255, 255, 0.9)",
                boxShadow: "0 2px 8px rgba(12, 30, 61, 0.03), inset 0 1px 0 rgba(255, 255, 255, 0.95)",
              }}
            >
              <span>How Spark Works</span>
              <i className="bi bi-chevron-right text-[10px] opacity-40" />
            </a>

            <a
              href="/index.html#features"
              className="px-3 py-1.5 rounded-xl text-[13px] font-medium text-[#0c1e3d] flex items-center justify-between transition-all hover:bg-white/90 active:scale-[0.99]"
              style={{
                background: "rgba(255, 255, 255, 0.72)",
                backdropFilter: "blur(20px) saturate(180%)",
                WebkitBackdropFilter: "blur(20px) saturate(180%)",
                border: "1px solid rgba(255, 255, 255, 0.9)",
                boxShadow: "0 2px 8px rgba(12, 30, 61, 0.03), inset 0 1px 0 rgba(255, 255, 255, 0.95)",
              }}
            >
              <span>Features</span>
              <i className="bi bi-chevron-right text-[10px] opacity-40" />
            </a>

            <a
              href="/index.html#about"
              className="px-3 py-1.5 rounded-xl text-[13px] font-medium text-[#0c1e3d] flex items-center justify-between transition-all hover:bg-white/90 active:scale-[0.99]"
              style={{
                background: "rgba(255, 255, 255, 0.72)",
                backdropFilter: "blur(20px) saturate(180%)",
                WebkitBackdropFilter: "blur(20px) saturate(180%)",
                border: "1px solid rgba(255, 255, 255, 0.9)",
                boxShadow: "0 2px 8px rgba(12, 30, 61, 0.03), inset 0 1px 0 rgba(255, 255, 255, 0.95)",
              }}
            >
              <span>About</span>
              <i className="bi bi-chevron-right text-[10px] opacity-40" />
            </a>

            {/* Vertical Clubs Option in Main Dropdown with Hover Trigger */}
            <div
              className="relative w-full"
              onMouseEnter={() => setMobileClubsOpen(true)}
              onMouseLeave={() => setMobileClubsOpen(false)}
            >
              <button
                type="button"
                onClick={() => setMobileClubsOpen((prev) => !prev)}
                className={`px-3 py-1.5 rounded-xl text-[13px] font-semibold flex items-center justify-between w-full transition-all active:scale-[0.99] cursor-pointer ${
                  mobileClubsOpen ? "text-[#1d4ed8] bg-white shadow-sm" : "text-[#0c1e3d] hover:bg-white/90"
                }`}
                style={{
                  background: mobileClubsOpen ? "rgba(255, 255, 255, 0.96)" : "rgba(255, 255, 255, 0.72)",
                  backdropFilter: "blur(20px) saturate(180%)",
                  WebkitBackdropFilter: "blur(20px) saturate(180%)",
                  border: mobileClubsOpen ? "1px solid rgba(186, 214, 245, 0.95)" : "1px solid rgba(255, 255, 255, 0.9)",
                  boxShadow: "0 2px 8px rgba(12, 30, 61, 0.03), inset 0 1px 0 rgba(255, 255, 255, 0.95)",
                }}
              >
                <span className="flex items-center gap-1.5">
                  <i className="bi bi-diagram-3 text-[#1d4ed8]" />
                  <span>Clubs</span>
                </span>
                <i className="bi bi-chevron-right text-[10px] opacity-70" />
              </button>

              {/* Hover bridge to keep dropdown open during mouse glide */}
              <div className="absolute top-0 bottom-0 -right-3 w-4 pointer-events-auto" />

              {/* Clubs Vertical Dropdown APPEARS JUST RIGHT TO CLUBS OPTION ONLY ON HOVER */}
              {mobileClubsOpen && (
                <div
                  className="absolute left-[calc(100%+8px)] top-0 w-[175px] rounded-3xl p-2 flex flex-col gap-1.5 shadow-[0_20px_50px_rgba(12,30,61,0.14),inset_0_1px_2px_rgba(255,255,255,0.95)] animate-in fade-in duration-150 z-50 pointer-events-auto"
                  style={{
                    background: "rgba(234, 243, 254, 0.9)",
                    backdropFilter: "blur(36px) saturate(190%)",
                    WebkitBackdropFilter: "blur(36px) saturate(190%)",
                    border: "1px solid rgba(255, 255, 255, 0.95)",
                  }}
                >
                  <a
                    href="/venture_club.html"
                    className="p-2 rounded-xl text-[12.5px] font-medium text-[#0c1e3d] hover:text-[#1d4ed8] flex items-center gap-2 transition-all active:scale-[0.99]"
                    style={{
                      background: "rgba(255, 255, 255, 0.86)",
                      backdropFilter: "blur(16px)",
                      WebkitBackdropFilter: "blur(16px)",
                      border: "1px solid rgba(255, 255, 255, 0.95)",
                      boxShadow: "0 2px 8px rgba(12, 30, 61, 0.03), inset 0 1px 0 rgba(255, 255, 255, 0.95)",
                    }}
                  >
                    <span
                      className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                      style={{
                        background: "rgba(234, 242, 252, 0.92)",
                        border: "1px solid rgba(255, 255, 255, 0.85)",
                        color: "#1d4ed8",
                      }}
                    >
                      <i className="bi bi-rocket-takeoff text-[13px]" />
                    </span>
                    <div className="flex flex-col min-w-0">
                      <span className="font-semibold leading-tight text-[12px]">Venture Club</span>
                      <span className="text-[10px] text-[#627896] leading-tight">College & student startups</span>
                    </div>
                  </a>

                  <a
                    href="/junior_founder.html"
                    className="p-2 rounded-xl text-[12.5px] font-medium text-[#0c1e3d] hover:text-[#1d4ed8] flex items-center gap-2 transition-all active:scale-[0.99]"
                    style={{
                      background: "rgba(255, 255, 255, 0.86)",
                      backdropFilter: "blur(16px)",
                      WebkitBackdropFilter: "blur(16px)",
                      border: "1px solid rgba(255, 255, 255, 0.95)",
                      boxShadow: "0 2px 8px rgba(12, 30, 61, 0.03), inset 0 1px 0 rgba(255, 255, 255, 0.95)",
                    }}
                  >
                    <span
                      className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                      style={{
                        background: "rgba(234, 242, 252, 0.92)",
                        border: "1px solid rgba(255, 255, 255, 0.85)",
                        color: "#1d4ed8",
                      }}
                    >
                      <i className="bi bi-backpack text-[13px]" />
                    </span>
                    <div className="flex flex-col min-w-0">
                      <span className="font-semibold leading-tight text-[12px]">High School-Junior Founders</span>
                      <span className="text-[10px] text-[#627896] leading-tight">Grades 9 to 12 track</span>
                    </div>
                  </a>
                </div>
              )}
            </div>

            {/* Interactive Views in Glassmorphism */}
            <button
              type="button"
              onClick={(e) => handleNavClick("leaderboard", e)}
              className={`px-3 py-1.5 rounded-xl text-[13px] font-medium flex items-center justify-between transition-all active:scale-[0.99] ${
                currentView === "leaderboard" ? "text-[#1d4ed8] font-bold" : "text-[#0c1e3d]"
              }`}
              style={{
                background: currentView === "leaderboard" ? "rgba(255, 255, 255, 0.96)" : "rgba(255, 255, 255, 0.72)",
                backdropFilter: "blur(20px) saturate(180%)",
                WebkitBackdropFilter: "blur(20px) saturate(180%)",
                border: currentView === "leaderboard" ? "1px solid rgba(186, 214, 245, 0.95)" : "1px solid rgba(255, 255, 255, 0.9)",
                boxShadow: currentView === "leaderboard" ? "0 4px 16px rgba(29, 78, 216, 0.1), inset 0 1px 1px #fff" : "0 2px 8px rgba(12, 30, 61, 0.03), inset 0 1px 0 rgba(255, 255, 255, 0.95)",
              }}
            >
              <span>Leaderboard</span>
              <i className="bi bi-trophy text-[11px] opacity-60" />
            </button>

            <button
              type="button"
              onClick={(e) => handleNavClick("foundingmembers", e)}
              className={`px-3 py-1.5 rounded-xl text-[13px] font-medium flex items-center justify-between transition-all active:scale-[0.99] ${
                currentView === "foundingmembers" ? "text-[#1d4ed8] font-bold" : "text-[#0c1e3d]"
              }`}
              style={{
                background: currentView === "foundingmembers" ? "rgba(255, 255, 255, 0.96)" : "rgba(255, 255, 255, 0.72)",
                backdropFilter: "blur(20px) saturate(180%)",
                WebkitBackdropFilter: "blur(20px) saturate(180%)",
                border: currentView === "foundingmembers" ? "1px solid rgba(186, 214, 245, 0.95)" : "1px solid rgba(255, 255, 255, 0.9)",
                boxShadow: currentView === "foundingmembers" ? "0 4px 16px rgba(29, 78, 216, 0.1), inset 0 1px 1px #fff" : "0 2px 8px rgba(12, 30, 61, 0.03), inset 0 1px 0 rgba(255, 255, 255, 0.95)",
              }}
            >
              <span>Founding Members</span>
              <i className="bi bi-people text-[11px] opacity-60" />
            </button>

            <button
              type="button"
              onClick={(e) => handleNavClick("directors", e)}
              className={`px-3 py-1.5 rounded-xl text-[13px] font-medium flex items-center justify-between transition-all active:scale-[0.99] ${
                currentView === "directors" ? "text-[#1d4ed8] font-bold" : "text-[#0c1e3d]"
              }`}
              style={{
                background: currentView === "directors" ? "rgba(255, 255, 255, 0.96)" : "rgba(255, 255, 255, 0.72)",
                backdropFilter: "blur(20px) saturate(180%)",
                WebkitBackdropFilter: "blur(20px) saturate(180%)",
                border: currentView === "directors" ? "1px solid rgba(186, 214, 245, 0.95)" : "1px solid rgba(255, 255, 255, 0.9)",
                boxShadow: currentView === "directors" ? "0 4px 16px rgba(29, 78, 216, 0.1), inset 0 1px 1px #fff" : "0 2px 8px rgba(12, 30, 61, 0.03), inset 0 1px 0 rgba(255, 255, 255, 0.95)",
              }}
            >
              <span>Directors</span>
              <i className="bi bi-briefcase text-[11px] opacity-60" />
            </button>

            {/* Download App CTA */}
            <a
              href="/index.html#download"
              className="mt-1 text-center py-2 px-3 rounded-xl font-bold text-[12.5px] text-[#0c1e3d] flex items-center justify-center gap-1.5 transition-all active:scale-[0.99]"
              style={{
                background: "linear-gradient(135deg, rgba(255, 255, 255, 0.94), rgba(234, 242, 252, 0.94))",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border: "1px solid rgba(255, 255, 255, 1)",
                boxShadow: "0 4px 12px rgba(12, 30, 61, 0.06), inset 0 1px 0 #fff",
              }}
            >
              <i className="bi bi-cloud-arrow-down text-[#1d4ed8]" />
              <span>Download App</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
