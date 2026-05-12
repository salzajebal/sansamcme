import { ChevronDown, Info, Star, RefreshCw } from "lucide-react";
import { useState, useEffect, useCallback } from "react";

interface MarketData {
  symbol: string;
  last: number;
  change: number;
  changePct: number;
  volume: number;
  timestamp: string;
}

/** CME style: no thousand separator, fixed 2 decimal places  e.g. 29318.25 */
function formatPrice(n: number): string {
  return n.toFixed(2);
}

/** Volume: comma-separated integer  e.g. 35,480 */
function formatVolume(n: number): string {
  return Math.round(n).toLocaleString("en-US");
}

export default function HeroSection() {
  const [data, setData] = useState<MarketData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [fetched, setFetched] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch("/api/market-data/nq");
      if (!res.ok) throw new Error("API error");
      const json: MarketData = await res.json();
      setData(json);
      setFetched(true);
      setError(false);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 15000);
    return () => clearInterval(interval);
  }, [fetchData]);

  const isNegative = data ? data.change < 0 : false;
  const changeColor = isNegative ? "#CC0000" : "#00A878";

  const displayLast = data ? formatPrice(data.last) : "—";
  const displayChange = data
    ? `${data.change >= 0 ? "+" : ""}${formatPrice(data.change)}\u00A0\u00A0(${data.changePct >= 0 ? "+" : ""}${formatPrice(data.changePct)}%)`
    : "—";
  const displayVolume = data ? formatVolume(data.volume) : "—";

  return (
    <div className="flex flex-col w-full" style={{ backgroundColor: "#0B2340" }}>

      {/* Breadcrumb sub-nav — slightly darker than hero */}
      <div
        className="h-[44px] px-8 flex items-center justify-between text-[13px] border-b border-white/10"
        style={{ backgroundColor: "#071C35" }}
      >
        <a href="#" className="text-white/70 hover:text-white transition-colors">
          ← Nasdaq futures and options
        </a>
        <button className="text-white/70 hover:text-white flex items-center gap-1 transition-colors">
          View an Equity Index Product <ChevronDown size={14} />
        </button>
      </div>

      {/* Title area */}
      <div className="pt-12 px-8 pb-0">
        <h1 className="text-white text-[34px] font-light leading-tight">
          E-mini Nasdaq-100
        </h1>
        <p className="text-white/55 text-[15px] mt-1.5">
          Futures and Options
        </p>
      </div>

      {/* Stats Row — justify-between distributes all 5 elements across full width */}
      <div className="px-8 pt-10 pb-0 flex items-end justify-between">

        {/* GLOBEX CODE */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-1.5 text-white/55 uppercase text-[11px] tracking-widest font-semibold">
            Globex Code <Info size={12} className="cursor-pointer opacity-70" />
          </div>
          <div className="border border-white/40 text-white px-2.5 py-0.5 text-[15px] font-medium inline-block">
            NQM6
          </div>
        </div>

        {/* LAST */}
        <div className="flex flex-col gap-1.5" data-testid="stat-last">
          <div className="text-white/55 uppercase text-[11px] tracking-widest font-semibold">
            Last
          </div>
          <div
            className={`text-white text-[30px] leading-none font-light tabular-nums transition-opacity ${loading ? "opacity-40" : "opacity-100"}`}
          >
            {displayLast}
          </div>
        </div>

        {/* CHANGE */}
        <div className="flex flex-col gap-1.5" data-testid="stat-change">
          <div className="text-white/55 uppercase text-[11px] tracking-widest font-semibold">
            Change
          </div>
          <div
            className={`text-[30px] leading-none font-light tabular-nums transition-opacity ${loading ? "opacity-40" : "opacity-100"}`}
            style={{ color: changeColor }}
          >
            {displayChange}
          </div>
        </div>

        {/* VOLUME */}
        <div className="flex flex-col gap-1.5" data-testid="stat-volume">
          <div className="text-white/55 uppercase text-[11px] tracking-widest font-semibold">
            Volume
          </div>
          <div
            className={`text-white text-[30px] leading-none font-light tabular-nums transition-opacity ${loading ? "opacity-40" : "opacity-100"}`}
          >
            {displayVolume}
          </div>
        </div>

        {/* WATCHLISTS button */}
        <button className="shrink-0 bg-[#006EB6] hover:bg-[#005a96] text-white px-5 py-2.5 text-[13px] font-bold uppercase tracking-wide flex items-center gap-2 transition-colors self-center">
          <Star size={14} fill="currentColor" /> Watchlists
        </button>
      </div>

      {/* Refresh / error strip */}
      <div className="px-8 pt-3 pb-6 flex items-center gap-2 min-h-[36px]">
        {error ? (
          <p className="text-red-400 text-[12px] italic">
            Failed to load market data. Retrying...
          </p>
        ) : (
          <>
            <RefreshCw
              size={11}
              className={`text-white/30 ${loading ? "animate-spin" : ""}`}
            />
            {!fetched && (
              <p className="text-white/40 text-[12px] italic">Loading market data...</p>
            )}
          </>
        )}
      </div>
    </div>
  );
}
