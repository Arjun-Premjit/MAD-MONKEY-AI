import React, { useState, useEffect, useRef } from "react";

interface NavigationProps {
  currentPage: "leaderboard" | "foundingmembers" | "directors";
  onNavigate: (page: "leaderboard" | "foundingmembers" | "directors") => void;
}

export default function Navigation({ currentPage, onNavigate }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [clubsOpen, setClubsOpen] = useState(false);
  const clubsRef = useRef<HTMLDivElement>(null);

  // Close clubs dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (clubsRef.current && !clubsRef.current.contains(event.target as Node)) {
        setClubsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handlePageClick = (page: "leaderboard" | "foundingmembers" | "directors") => {
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 px-3 sm:px-6 py-2.5 sm:py-3.5 flex items-center justify-between">
        {/* Left: Brand Logo */}
        <a
          href="index.html"
          id="nav-logo-link"
          className="brand-logo-outer inline-flex items-center shrink-0 cursor-pointer text-decoration-none"
        >
          <img
            src="mad-monkey-logo.png"
            onError={(e) => {
              // Fallback if filename encoding differs
              (e.currentTarget as HTMLImageElement).src = "MAD MONKEY LOGO.png";
            }}
            alt="Mad Monkey AI Logo"
            className="brand-logo-img-lg"
            style={{ height: "56px", width: "auto", objectFit: "contain" }}
          />
        </a>

        {/* Center: Desktop Capsule Navigation */}
        <nav
          aria-label="Main Navigation"
          className="hidden xl:flex items-center gap-0.5 px-3 py-1.5 rounded-full shadow-[0_4px_24px_rgba(0,0,0,0.06)] border border-black/[0.08]"
          style={{
            background: "rgba(255, 255, 255, 0.85)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
          }}
        >
          <a
            href="index.html"
            className="px-3.5 py-1.5 text-xs font-semibold text-neutral-600 hover:text-black transition-colors rounded-full text-decoration-none"
          >
            Home
          </a>
          <a
            href="index.html#how-spark-works"
            className="px-3.5 py-1.5 text-xs font-semibold text-neutral-600 hover:text-black transition-colors rounded-full text-decoration-none"
          >
            How Spark Works
          </a>
          <a
            href="index.html#features"
            className="px-3.5 py-1.5 text-xs font-semibold text-neutral-600 hover:text-black transition-colors rounded-full text-decoration-none"
          >
            Features
          </a>
          <a
            href="index.html#about"
            className="px-3.5 py-1.5 text-xs font-semibold text-neutral-600 hover:text-black transition-colors rounded-full text-decoration-none"
          >
            About
          </a>

          {/* Clubs Dropdown */}
          <div className="relative" ref={clubsRef}>
            <button
              onClick={() => setClubsOpen(!clubsOpen)}
              className="px-3.5 py-1.5 text-xs font-semibold text-neutral-600 hover:text-black transition-colors rounded-full flex items-center gap-1 cursor-pointer"
            >
              Clubs
              <svg
                className={`w-3 h-3 transition-transform ${clubsOpen ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {clubsOpen && (
              <div
                className="absolute top-full mt-2 left-1/2 -translate-x-1/2 w-56 rounded-2xl py-2 bg-white/95 backdrop-blur-xl shadow-xl border border-black/[0.08] z-50 flex flex-col"
              >
                <a
                  href="venture_club.html"
                  className="px-4 py-2 text-xs font-semibold text-neutral-700 hover:bg-black/5 hover:text-black transition-colors text-decoration-none flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-black"></span>
                  Venture Club
                </a>
                <a
                  href="junior_founder.html"
                  className="px-4 py-2 text-xs font-semibold text-neutral-700 hover:bg-black/5 hover:text-black transition-colors text-decoration-none flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-600"></span>
                  High School - Junior Founders
                </a>
              </div>
            )}
          </div>

          <button
            onClick={() => handlePageClick("leaderboard")}
            className={`px-3.5 py-1.5 text-xs font-bold transition-all duration-200 rounded-full cursor-pointer ${
              currentPage === "leaderboard"
                ? "bg-black text-white shadow-sm"
                : "text-neutral-600 hover:text-black"
            }`}
          >
            Leaderboard
          </button>

          <button
            onClick={() => handlePageClick("foundingmembers")}
            className={`px-3.5 py-1.5 text-xs font-bold transition-all duration-200 rounded-full cursor-pointer ${
              currentPage === "foundingmembers"
                ? "bg-black text-white shadow-sm"
                : "text-neutral-600 hover:text-black"
            }`}
          >
            Founding Members
          </button>

          <button
            onClick={() => handlePageClick("directors")}
            className={`px-3.5 py-1.5 text-xs font-bold transition-all duration-200 rounded-full cursor-pointer ${
              currentPage === "directors"
                ? "bg-black text-white shadow-sm"
                : "text-neutral-600 hover:text-black"
            }`}
          >
            Directors
          </button>
        </nav>

        {/* Right: Download App & Mobile Hamburger */}
        <div className="flex items-center gap-2.5">
          <a
            href="index.html#download"
            className="hidden sm:inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-white text-black text-xs font-bold shadow-[0_4px_16px_rgba(0,0,0,0.06)] border border-black/[0.08] hover:bg-neutral-50 hover:shadow-md transition-all text-decoration-none"
          >
            Download App
          </a>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden flex flex-col justify-center items-center w-10 h-10 rounded-full bg-white/70 backdrop-blur-md border border-black/[0.08] shadow-xs cursor-pointer"
            aria-label="Toggle navigation"
          >
            <span
              className={`block w-4 h-0.5 bg-black transition-transform duration-200 ${
                mobileMenuOpen ? "rotate-45 translate-y-1" : "-translate-y-0.5"
              }`}
            />
            <span
              className={`block w-4 h-0.5 bg-black my-0.5 transition-opacity duration-200 ${
                mobileMenuOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`block w-4 h-0.5 bg-black transition-transform duration-200 ${
                mobileMenuOpen ? "-rotate-45 -translate-y-1" : "translate-y-0.5"
              }`}
            />
          </button>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-md flex flex-col justify-end xl:hidden"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="bg-white rounded-t-3xl p-6 shadow-2xl flex flex-col gap-3 max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-black/[0.08]">
              <span className="font-bold text-sm text-neutral-800 tracking-wide uppercase">Navigation</span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center text-black font-bold text-xs cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="flex flex-col gap-1 py-1">
              <a
                href="index.html"
                className="px-4 py-2.5 rounded-xl text-sm font-semibold text-neutral-700 hover:bg-neutral-100 text-decoration-none"
              >
                Home
              </a>
              <a
                href="index.html#how-spark-works"
                className="px-4 py-2.5 rounded-xl text-sm font-semibold text-neutral-700 hover:bg-neutral-100 text-decoration-none"
              >
                How Spark Works
              </a>
              <a
                href="index.html#features"
                className="px-4 py-2.5 rounded-xl text-sm font-semibold text-neutral-700 hover:bg-neutral-100 text-decoration-none"
              >
                Features
              </a>
              <a
                href="index.html#about"
                className="px-4 py-2.5 rounded-xl text-sm font-semibold text-neutral-700 hover:bg-neutral-100 text-decoration-none"
              >
                About
              </a>

              <div className="my-1 border-t border-black/[0.06]" />

              <div className="px-4 py-1 text-[11px] font-bold text-neutral-400 uppercase tracking-wider">
                Programs & Clubs
              </div>
              <a
                href="venture_club.html"
                className="px-4 py-2 rounded-xl text-sm font-medium text-neutral-700 hover:bg-neutral-100 text-decoration-none flex items-center gap-2"
              >
                <span className="w-2 h-2 rounded-full bg-black"></span>
                College Venture Club
              </a>
              <a
                href="junior_founder.html"
                className="px-4 py-2 rounded-xl text-sm font-medium text-neutral-700 hover:bg-neutral-100 text-decoration-none flex items-center gap-2"
              >
                <span className="w-2 h-2 rounded-full bg-purple-600"></span>
                Junior Founders (High School)
              </a>

              <div className="my-1 border-t border-black/[0.06]" />

              <div className="px-4 py-1 text-[11px] font-bold text-neutral-400 uppercase tracking-wider">
                Network Directories
              </div>
              <button
                onClick={() => handlePageClick("leaderboard")}
                className={`px-4 py-2.5 rounded-xl text-sm font-bold text-left cursor-pointer ${
                  currentPage === "leaderboard"
                    ? "bg-black text-white"
                    : "text-neutral-700 hover:bg-neutral-100"
                }`}
              >
                Leaderboard
              </button>
              <button
                onClick={() => handlePageClick("foundingmembers")}
                className={`px-4 py-2.5 rounded-xl text-sm font-bold text-left cursor-pointer ${
                  currentPage === "foundingmembers"
                    ? "bg-black text-white"
                    : "text-neutral-700 hover:bg-neutral-100"
                }`}
              >
                Founding Members
              </button>
              <button
                onClick={() => handlePageClick("directors")}
                className={`px-4 py-2.5 rounded-xl text-sm font-bold text-left cursor-pointer ${
                  currentPage === "directors"
                    ? "bg-black text-white"
                    : "text-neutral-700 hover:bg-neutral-100"
                }`}
              >
                Directors
              </button>
            </div>

            <div className="pt-2">
              <a
                href="index.html#download"
                className="w-full py-3.5 rounded-2xl bg-black text-white text-center text-sm font-bold block text-decoration-none shadow-lg"
              >
                Download Mad Monkey App
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
