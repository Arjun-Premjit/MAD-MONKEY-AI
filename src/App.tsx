import React, { useState, useEffect } from "react";
import CloudBackground from "./components/CloudBackground";
import Navigation from "./components/Navigation";
import LeaderboardView from "./components/LeaderboardView";
import DirectorsView from "./components/DirectorsView";
import FoundingMembersView from "./components/FoundingMembersView";
import HelpButton from "./components/HelpButton";

export type PageView = "leaderboard" | "foundingmembers" | "directors";

function detectInitialPage(): PageView {
  if (typeof window === "undefined") return "leaderboard";
  const path = window.location.pathname.toLowerCase();
  const search = window.location.search.toLowerCase();

  if (path.includes("directors") || search.includes("page=directors")) {
    return "directors";
  }
  if (path.includes("foundingmembers") || search.includes("page=foundingmembers")) {
    return "foundingmembers";
  }
  return "leaderboard";
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageView>(detectInitialPage);

  useEffect(() => {
    // Keep tab title strictly as Mad Monkey App across all views
    document.title = "Mad Monkey App";

    const handlePopState = () => {
      setCurrentPage(detectInitialPage());
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const handleNavigate = (page: PageView) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (typeof window !== "undefined" && window.history) {
      window.history.pushState(null, "", `${page}.html`);
    }
  };

  return (
    <div className="min-h-screen text-black bg-[#f4f6fa] relative overflow-x-hidden selection:bg-black selection:text-white">
      {/* Soft atmospheric celestial cloud background */}
      <CloudBackground />

      {/* Top Header & Capsule Navigation */}
      <Navigation currentPage={currentPage} onNavigate={handleNavigate} />

      {/* Main View Router */}
      <main className="relative z-10">
        {currentPage === "leaderboard" && <LeaderboardView />}
        {currentPage === "foundingmembers" && <FoundingMembersView />}
        {currentPage === "directors" && <DirectorsView />}
      </main>

      {/* Floating Bottom-Right Information & Help Action Button */}
      <HelpButton />
    </div>
  );
}
