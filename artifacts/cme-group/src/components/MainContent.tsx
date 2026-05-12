export default function MainContent() {
  const newsItems = [
    { title: "Now live: Expanded Dividend suite", date: "11 MAY 2026" },
    { title: "The 2026 Russell Reconstitution: Twice the Friction, Twice the Friction", date: "06 MAY 2026" },
    { title: "Meet 54 Single Stock futures, arriving this summer", date: "04 MAY 2026" },
    { title: "Why Are Investors So Excited About E-mini Nasdaq-100?", date: "01 MAY 2026" },
  ];

  return (
    <div className="flex-1 flex flex-col min-w-0">
      <p className="text-[#5A6874] text-[15px] leading-[1.7]">
        Our E-mini Nasdaq-100 products give you one of the most cost-effective ways to gain market exposure to the Nasdaq-100 Index, a broad-based, modified capitalization-weighted index that tracks 100 large-cap companies that span major industry groups. Enjoy the liquidity and flexibility to react to global events as they unfold around the clock.
      </p>

      <h2 className="text-[#3A464F] text-[12px] font-bold tracking-widest uppercase mt-8 mb-4">
        Latest Equities News
      </h2>

      <div className="flex overflow-x-auto gap-4 pb-4 -mx-1 px-1">
        {newsItems.map((item, i) => (
          <div
            key={i}
            data-testid={`card-news-${i}`}
            className="bg-white border border-[#D9E0E5] p-4 min-w-[220px] max-w-[280px] flex-1 flex flex-col justify-between cursor-pointer hover:border-[#006EB6] transition-colors"
            style={{ minHeight: "120px" }}
          >
            <h3 className="text-[#3A464F] text-[14px] font-semibold leading-snug">{item.title}</h3>
            <span className="text-[#5A6874] text-[11px] uppercase tracking-wider font-semibold mt-3 block">{item.date}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
