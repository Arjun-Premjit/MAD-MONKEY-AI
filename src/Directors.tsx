import React from 'react';

const glass = {
  thin: {
    background: "rgba(255, 255, 255, 0.4)",
    backdropFilter: "blur(24px)",
    WebkitBackdropFilter: "blur(24px)",
    border: "1px solid rgba(0, 0, 0, 0.1)",
    boxShadow: "0 4px 24px rgba(0, 0, 0, 0.05)",
  },
  card: {
    background: "rgba(255, 255, 255, 0.6)",
    backdropFilter: "blur(30px)",
    WebkitBackdropFilter: "blur(30px)",
    border: "1px solid rgba(0, 0, 0, 0.15)",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.05)",
    borderRadius: "20px",
  }
};

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

export default function Directors() {
  return (
    <div className="min-h-screen w-full relative overflow-x-hidden" style={{ background: "#ffffff" }}>
      {/* Floating clouds */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <CloudSVG className="w-96 cloud-drift-slow" style={{ top: "-2%", left: "-5%", opacity: 0.85 }} />
        <CloudSVG className="w-80 cloud-drift"      style={{ top: "6%", right: "-4%", opacity: 0.7 }} />
        <CloudSVG className="w-72 cloud-drift-med"  style={{ top: "38%", left: "2%", opacity: 0.45 }} />
        <CloudSVG className="w-64 cloud-drift-slow" style={{ top: "55%", right: "0%", opacity: 0.35 }} />
        <CloudSVG className="w-56 cloud-drift"      style={{ bottom: "12%", left: "10%", opacity: 0.3 }} />
        <CloudSVG className="w-80 cloud-drift-med"  style={{ bottom: "-4%", right: "8%", opacity: 0.25 }} />
      </div>

      {/* Main Content */}
      <main className="relative z-10 w-full max-w-5xl mx-auto px-4 pb-24 pt-32 flex flex-col items-center">
        
        <div className="text-center mb-16" style={{ animation: "fadeInUp 0.5s ease-out both" }}>
          <h1 className="font-serif text-5xl md:text-[64px] text-black leading-[1.12] mb-4">
            Board of <br />
            <em>Directors.</em>
          </h1>
          <p className="text-black font-bold text-xl">The leadership guiding our future.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
          {/* Director Card Placeholder */}
          {[1, 2, 3, 4].map((i) => (
            <div key={i} style={{...glass.card, animation: `fadeInUp 0.5s ease-out ${i * 0.15}s both`}} className="p-8 flex items-center text-left gap-6">
              <div className="w-24 h-24 rounded-full bg-black/5 border border-black/10 overflow-hidden shrink-0 flex items-center justify-center">
                 <svg className="w-12 h-12 text-black/20" fill="currentColor" viewBox="0 0 24 24"><path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-black mb-1">Director Name</h3>
                <p className="text-black/60 font-medium text-sm mb-3">Position & Title</p>
                <p className="text-black/40 text-sm leading-relaxed">
                  Extensive background and experience overseeing strategic growth and operational excellence.
                </p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
