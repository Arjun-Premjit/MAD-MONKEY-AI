import React, { useState } from "react";

export default function HelpButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setOpen(true)}
          className="w-11 h-11 rounded-full bg-black text-white flex items-center justify-center font-bold text-base shadow-[0_8px_24px_rgba(0,0,0,0.3)] hover:scale-105 transition-transform cursor-pointer"
          aria-label="Information & FAQ"
        >
          ?
        </button>
      </div>

      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-white rounded-[28px] p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-black/[0.08] relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center text-black font-bold text-xs hover:bg-neutral-200 transition-colors cursor-pointer"
            >
              ✕
            </button>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/5 text-xs font-bold text-neutral-600 mb-3">
              ● Mad Monkey AI Verified Directory
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl text-black mb-3">
              How the Network Works
            </h3>

            <div className="space-y-3 text-xs sm:text-sm text-neutral-600 leading-relaxed">
              <p>
                <strong>No placeholders:</strong> Every student venture on the leaderboard is real and verified by human review before stage advancement.
              </p>
              <p>
                <strong>Stage Points:</strong> Stage 1 = 1pt · Stage 3 = 5pts · Stage 5 (First Revenue) = 25pts · Stage 8 (Graduation) = 100pts.
              </p>
              <p>
                <strong>Campus Directors:</strong> Lead and verify founders on their college campus. City Directors coordinate cross-campus corridor activities.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-black/[0.08] flex flex-col sm:flex-row gap-2.5">
              <a
                href="applydirectorintern.html"
                className="flex-1 py-2.5 text-center rounded-xl bg-black text-white text-xs font-bold text-decoration-none hover:bg-neutral-800 transition-colors"
              >
                Apply as Director
              </a>
              <a
                href="venture_club.html"
                className="flex-1 py-2.5 text-center rounded-xl bg-neutral-100 text-black text-xs font-bold text-decoration-none hover:bg-neutral-200 transition-colors"
              >
                Submit Venture
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
