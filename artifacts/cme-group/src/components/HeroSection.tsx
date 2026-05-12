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

function formatNumber(n: number, decimals = 2): string {
  return n.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

function formatVolume(n: number): string {
  return n.toLocaleString("en-US");
}

function formatTimestamp(iso: string): string {
  const date = new Date(iso);
  return date.toLocaleString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
    timeZoneName: "short",
  });
}

export default function HeroSection() {
  const [data, setData] = useState<MarketData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [lastFetched, setLastFetched] = useState<string>("");

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch("/api/market-data/nq");
      if (!res.ok) throw new Error("API error");
      const json: MarketData = await res.json();
      setData(json);
      setLastFetched(formatTimestamp(json.timestamp));
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

  const displayLast = data ? formatNumber(data.last) : "—";
  const displayChange = data
    ? `${data.change >= 0 ? "+" : ""}${formatNumber(data.change)}  (${data.changePct >= 0 ? "+" : ""}${formatNumber(data.changePct)}%)`
    : "—";
  const displayVolume = data ? formatVolume(data.volume) : "—";

  return (
    <div className="bg-[#081D37] flex flex-col w-full">
      {/* Breadcrumb Sub-nav */}
      <div className="h-[40px] px-6 flex items-center justify-between text-[13px] border-b border-white/10">
        <a href="#" className="text-white/80 hover:text-white transition-colors">
          ← Nasdaq futures and options
        </a>
        <button className="text-white/80 hover:text-white flex items-center gap-1 transition-colors">
          View an Equity Index Product <ChevronDown size={14} />
        </button>
      </div>

      {/* Main Hero */}
      <div className="pt-10 px-6 pb-5">
        <h1 className="text-white text-[38px] font-light leading-tight">
          E-mini Nasdaq-100
        </h1>
        <p className="text-white/60 text-[16px] mt-1">
          Futures and Options
        </p>
      </div>

      {/* Stats Row */}
      <div className="px-6 pt-6 pb-0 flex items-end justify-between gap-y-6">
        {/* Stats group — flex-1 so columns fill width, pushing WATCHLISTS close to VOLUME */}
        <div className="flex flex-1 items-end">
          {/* Globex Code */}
          <div className="flex flex-col gap-1 flex-[0_0_180px]">
            <div className="flex items-center gap-1 text-white/60 uppercase text-[11px] tracking-widest font-semibold">
              Globex Code <Info size={12} className="cursor-pointer" />
            </div>
            <div className="border border-white/50 text-white px-2 py-0.5 text-[15px] font-medium inline-block w-fit">
              NQM6
            </div>
          </div>

          {/* Last */}
          <div className="flex flex-col gap-1 flex-[0_0_175px]" data-testid="stat-last">
            <div className="text-white/60 uppercase text-[11px] tracking-widest font-semibold">
              Last
            </div>
            <div className={`text-white text-[28px] leading-none transition-all ${loading ? "opacity-40" : "opacity-100"}`}>
              {displayLast}
            </div>
          </div>

          {/* Change */}
          <div className="flex flex-col gap-1 flex-1" data-testid="stat-change">
            <div className="text-white/60 uppercase text-[11px] tracking-widest font-semibold">
              Change
            </div>
            <div
              className={`text-[28px] leading-none font-medium transition-all ${loading ? "opacity-40" : "opacity-100"}`}
              style={{ color: changeColor }}
            >
              {displayChange}
            </div>
          </div>

          {/* Volume */}
          <div className="flex flex-col gap-1 flex-[0_0_220px]" data-testid="stat-volume">
            <div className="text-white/60 uppercase text-[11px] tracking-widest font-semibold">
              Volume
            </div>
            <div className={`text-white text-[28px] leading-none transition-all ${loading ? "opacity-40" : "opacity-100"}`}>
              {displayVolume}
            </div>
          </div>
        </div>

        {/* Watchlist Button — sits right after the stats */}
        <button className="shrink-0 bg-[#006EB6] hover:bg-[#005a96] text-white px-5 py-2.5 text-[13px] font-bold uppercase tracking-wide flex items-center gap-2 transition-colors">
          <Star size={16} fill="currentColor" /> Watchlists
        </button>
      </div>

      {/* Timestamp */}
      <div className="px-6 pt-2 pb-5 flex items-center gap-2">
        {error ? (
          <p className="text-red-400 text-[12px] italic">
            Failed to load market data. Retrying...
          </p>
        ) : (
          <>
            <RefreshCw
              size={11}
              className={`text-white/40 ${loading ? "animate-spin" : ""}`}
            />
            <p className="text-white/50 text-[12px] italic">
              {lastFetched
                ? `Last Updated ${lastFetched}. Market data is delayed by at least 10 minutes`
                : "Loading market data..."}
            </p>
          </>
        )}
      </div>
    </div>
  );
}
