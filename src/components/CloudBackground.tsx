import React from "react";

export default function CloudBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Soft atmospheric gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 90% 65% at 50% -5%, #dbeafe 0%, #edf3f8 45%, #f6f8fb 100%)",
        }}
      />

      {/* Cloud 1 — Top Left */}
      <div
        className="cloud-drift absolute -top-16 -left-20 w-[420px] sm:w-[580px] h-[260px] opacity-45 blur-[1px]"
        style={{ willChange: "transform" }}
      >
        <svg viewBox="0 0 520 240" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <ellipse cx="260" cy="160" rx="200" ry="75" fill="white" fillOpacity="0.9" />
          <circle cx="210" cy="115" r="95" fill="white" fillOpacity="0.95" />
          <circle cx="320" cy="125" r="80" fill="white" fillOpacity="0.92" />
          <circle cx="130" cy="150" r="70" fill="white" fillOpacity="0.85" />
          <circle cx="390" cy="155" r="65" fill="white" fillOpacity="0.88" />
        </svg>
      </div>

      {/* Cloud 2 — Top Right */}
      <div
        className="cloud-drift-slow absolute -top-10 -right-24 w-[480px] sm:w-[680px] h-[300px] opacity-40 blur-[1px]"
        style={{ willChange: "transform" }}
      >
        <svg viewBox="0 0 600 270" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <ellipse cx="300" cy="180" rx="240" ry="85" fill="white" fillOpacity="0.9" />
          <circle cx="240" cy="130" r="105" fill="white" fillOpacity="0.94" />
          <circle cx="370" cy="135" r="95" fill="white" fillOpacity="0.9" />
          <circle cx="150" cy="165" r="80" fill="white" fillOpacity="0.82" />
          <circle cx="460" cy="170" r="75" fill="white" fillOpacity="0.85" />
        </svg>
      </div>

      {/* Cloud 3 — Mid Left subtle */}
      <div
        className="cloud-drift-med absolute top-[36%] -left-36 w-[450px] sm:w-[600px] h-[250px] opacity-35 blur-[2px]"
        style={{ willChange: "transform" }}
      >
        <svg viewBox="0 0 540 230" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <ellipse cx="270" cy="150" rx="210" ry="70" fill="white" fillOpacity="0.85" />
          <circle cx="220" cy="110" r="85" fill="white" fillOpacity="0.9" />
          <circle cx="330" cy="115" r="75" fill="white" fillOpacity="0.88" />
        </svg>
      </div>

      {/* Cloud 4 — Mid Right subtle */}
      <div
        className="cloud-drift absolute top-[52%] -right-32 w-[420px] sm:w-[560px] h-[240px] opacity-30 blur-[2px]"
        style={{ willChange: "transform" }}
      >
        <svg viewBox="0 0 500 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <ellipse cx="250" cy="145" rx="190" ry="65" fill="white" fillOpacity="0.8" />
          <circle cx="205" cy="105" r="80" fill="white" fillOpacity="0.88" />
          <circle cx="305" cy="110" r="70" fill="white" fillOpacity="0.85" />
        </svg>
      </div>
    </div>
  );
}
