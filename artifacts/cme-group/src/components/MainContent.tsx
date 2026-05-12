export default function MainContent() {
  return (
    <div className="flex-1 flex flex-col min-w-0">
      <p className="text-[#5A6874] text-[15px] leading-[1.7]">
        Our E-mini Nasdaq-100 products give you one of the most cost-effective ways to gain market exposure to the Nasdaq-100 Index, a broad-based, modified capitalization-weighted index that tracks 100 large-cap companies that span major industry groups. Enjoy the liquidity and flexibility to react to global events as they unfold around the clock.
      </p>

      <h2 className="text-[#3A464F] text-[12px] font-bold tracking-widest uppercase mt-8 mb-4">
        Latest Equities News
      </h2>

      <div className="flex overflow-x-auto gap-4 pb-4 -mx-1 px-1">
        <div className="bg-white border border-[#D9E0E5] p-4 min-w-[220px] max-w-[280px] flex-1 flex flex-col justify-between h-[120px]">
          <h3 className="text-[#3A464F] text-[15px] font-semibold leading-snug line-clamp-3">Now live: Expanded Dividend suite</h3>
          <span className="text-[#5A6874] text-[11px] uppercase tracking-wider font-bold mt-2">11 May 2026</span>
        </div>

        <div className="bg-white border border-[#D9E0E5] p-4 min-w-[220px] max-w-[280px] flex-1 flex flex-col justify-between h-[120px]">
          <h3 className="text-[#3A464F] text-[15px] font-semibold leading-snug line-clamp-3">The 2026 Russell Reconstitution: Twice the Friction, Twice the...</h3>
          <span className="text-[#5A6874] text-[11px] uppercase tracking-wider font-bold mt-2">06 May 2026</span>
        </div>

        <div className="bg-white border border-[#D9E0E5] p-4 min-w-[220px] max-w-[280px] flex-1 flex flex-col justify-between h-[120px]">
          <h3 className="text-[#3A464F] text-[15px] font-semibold leading-snug line-clamp-3">Meet 54 Single Stock futures, arriving this summer</h3>
          <span className="text-[#5A6874] text-[11px] uppercase tracking-wider font-bold mt-2">04 May 2026</span>
        </div>

        <div className="bg-white border border-[#D9E0E5] p-4 min-w-[220px] max-w-[280px] flex-1 flex flex-col justify-between h-[120px]">
          <h3 className="text-[#3A464F] text-[15px] font-semibold leading-snug line-clamp-3">Why Are Investors So Excited About E...</h3>
          <span className="text-[#5A6874] text-[11px] uppercase tracking-wider font-bold mt-2">01 May 2026</span>
        </div>
      </div>
    </div>
  );
}