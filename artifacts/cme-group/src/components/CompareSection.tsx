import { useState } from "react";

const tabs = ["NQ VS. BASKET OF STOCKS", "NQ VS. FANG STOCKS", "NQ VS. ETFS"];

const tabContent: Record<string, { left: string[]; right: string[] }> = {
  "NQ VS. BASKET OF STOCKS": {
    left: [
      "Trade and track one NQ futures contract versus 100 stocks to achieve nearly identical exposure",
      "Easily sell short with NQ futures — no uptick rule or special requirements",
      "Nearly 24-hour access means your hands aren't tied when off-hour news and overseas events occur",
    ],
    right: [
      "Spread trading versus another sector takes less time, less capital and is more efficient",
      "Significantly more buying power with your capital than cash securities – futures require a relatively small payment to control a large contract value",
    ],
  },
  "NQ VS. FANG STOCKS": {
    left: [
      "E-mini Nasdaq-100 futures can serve as a cost-efficient proxy for trading Meta (Facebook), Amazon, Netflix and Alphabet (Google)",
      "A single NQ contract captures tech sector exposure without managing multiple equity positions",
      "Futures provide leverage — smaller capital requirement to gain the same notional exposure",
    ],
    right: [
      "No stock-specific earnings risk concentrated in just 4 names — exposure diversified across 100 companies",
      "Nearly 24-hour trading provides flexibility around earnings announcements and global events",
    ],
  },
  "NQ VS. ETFS": {
    left: [
      "NQ futures avoid fund management fees associated with ETFs tracking the Nasdaq-100",
      "Futures positions require a relatively small margin versus the full ETF purchase price",
      "Tax treatment of futures may differ — consult your tax advisor for details",
    ],
    right: [
      "Futures allow short exposure without borrowing shares or paying borrowing costs",
      "Superior liquidity in NQ futures provides tighter bid-ask spreads than comparable ETFs during most sessions",
    ],
  },
};

export default function CompareSection() {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const content = tabContent[activeTab];

  return (
    <section className="w-full bg-[#1D4B6E] py-12 px-6">
      <div className="max-w-[1400px] mx-auto">
        <h2 className="text-white text-[28px] font-light mb-8">
          Compare E-mini Nasdaq-100 with other trading methods
        </h2>

        {/* Tab bar */}
        <div className="flex border-b border-white/20 mb-8 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              data-testid={`tab-compare-${tab.replace(/\s+/g, "-").toLowerCase()}`}
              className={`px-6 py-3 text-[12px] font-bold tracking-widest uppercase whitespace-nowrap transition-colors border-b-2 ${
                activeTab === tab
                  ? "text-white border-white"
                  : "text-white/50 border-transparent hover:text-white/80"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="bg-white/10 p-8">
          <p className="text-white text-[15px] mb-6">
            NQ futures give you an easier, faster, more flexible way to harness Nasdaq-100 performance.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ul className="flex flex-col gap-3">
              {content.left.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-[8px] shrink-0 w-[5px] h-[5px] rounded-full bg-white/70" />
                  <span className="text-white/90 text-[14px] leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
            <ul className="flex flex-col gap-3">
              {content.right.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-[8px] shrink-0 w-[5px] h-[5px] rounded-full bg-white/70" />
                  <span className="text-white/90 text-[14px] leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
