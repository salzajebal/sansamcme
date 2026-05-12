import { ChevronDown, Info, Star } from "lucide-react";

export default function HeroSection() {
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
      <div className="px-6 pt-6 pb-0 flex flex-wrap gap-y-6 justify-between items-end">
        <div className="flex flex-wrap gap-12">
          {/* Col 1 */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1 text-white/60 uppercase text-[11px] tracking-widest font-semibold">
              Globex Code <Info size={12} className="cursor-pointer" />
            </div>
            <div className="border border-white/50 text-white px-2 py-0.5 text-[15px] font-medium inline-block w-fit">
              NQM6
            </div>
          </div>

          {/* Col 2 */}
          <div className="flex flex-col gap-1">
            <div className="text-white/60 uppercase text-[11px] tracking-widest font-semibold">
              Last
            </div>
            <div className="text-white text-[28px] leading-none">
              29318.25
            </div>
          </div>

          {/* Col 3 */}
          <div className="flex flex-col gap-1">
            <div className="text-white/60 uppercase text-[11px] tracking-widest font-semibold">
              Change
            </div>
            <div className="text-[#CC0000] text-[28px] leading-none font-medium">
              -105.75  (-0.36%)
            </div>
          </div>

          {/* Col 4 */}
          <div className="flex flex-col gap-1">
            <div className="text-white/60 uppercase text-[11px] tracking-widest font-semibold">
              Volume
            </div>
            <div className="text-white text-[28px] leading-none">
              35,480
            </div>
          </div>
        </div>

        {/* Watchlist Button */}
        <button className="bg-[#006EB6] hover:bg-[#005a96] text-white px-5 py-2.5 text-[13px] font-bold uppercase tracking-wide flex items-center gap-2 transition-colors">
          <Star size={16} fill="currentColor" /> Watchlists
        </button>
      </div>

      {/* Timestamp */}
      <div className="px-6 pt-2 pb-5">
        <p className="text-white/50 text-[12px] italic">
          Last Updated 12 May 2026 09:18:47 PM CT. Market data is delayed by at least 10 minutes
        </p>
      </div>
    </div>
  );
}