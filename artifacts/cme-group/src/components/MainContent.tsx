export default function MainContent() {
  const newsItems = [
    { title: "Now live: Expanded Dividend suite", date: "11 MAY 2026" },
    { title: "The 2026 Russell Reconstitution: Twice the Friction, Twice the Friction", date: "06 MAY 2026" },
    { title: "Meet 54 Single Stock futures, arriving this summer", date: "04 MAY 2026" },
    { title: "Why Are Investors So Excited About E-mini Nasdaq-100?", date: "01 MAY 2026" },
  ];

  const keyBenefits = [
    "Trade and track one NQ futures contract versus 100 stocks to achieve nearly identical exposure",
    "Easily sell short with NQ futures — no uptick rule or special requirements",
    "Nearly 24-hour access means your hands aren't tied when off-hour news and overseas events occur",
    "Spread trading versus another sector takes less time, less capital, and is more efficient",
    "Significantly more buying power with your capital than cash securities — futures require a relatively small payment to control a large contract value",
    "E-mini Nasdaq-100 futures can serve as a cost-efficient proxy for trading Facebook, Amazon, Netflix and Alphabet (Google), collectively known as the FANG stocks",
  ];

  const relatedProducts = [
    {
      title: "Micro E-mini Nasdaq-100 Index Futures",
      ticker: "MNQ",
      description: "The Micro E-mini Nasdaq-100 futures contract is $2 × the Nasdaq-100 Index — offering a smaller-sized version of the liquid benchmark E-mini contract, at 1/10th the size.",
      href: "#",
    },
    {
      title: "E-mini Nasdaq-100 Weekly Options",
      ticker: "NQ",
      description: "E-mini Nasdaq-100 Weekly options expand your choices to manage market-moving events and fine-tune trading strategies with short-dated contracts.",
      href: "#",
    },
    {
      title: "Options on Micro E-mini Nasdaq-100 Futures",
      ticker: "MNQ",
      description: "Scale Nasdaq-100 index exposure with greater granularity using underlying contracts 1/10th the size of E-mini products, with weekly, end-of-month, and quarterly expirations.",
      href: "#",
    },
    {
      title: "Nasdaq-100 Futures (Full-Size)",
      ticker: "ND",
      description: "Full-size Nasdaq-100 futures offer diversification potential with underlying index holdings spanning major industry groups. One big futures contract equals five E-mini contracts.",
      href: "#",
    },
  ];

  return (
    <div className="flex-1 flex flex-col min-w-0">
      {/* Overview Description */}
      <p className="text-[#5A6874] text-[15px] leading-[1.7]">
        Our E-mini Nasdaq-100 products give you one of the most cost-effective ways to gain market exposure to the Nasdaq-100 Index, a broad-based, modified capitalization-weighted index that tracks 100 large-cap companies that span major industry groups. Enjoy the liquidity and flexibility to react to global events as they unfold around the clock.
      </p>

      {/* Latest Equities News */}
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

      {/* Key Benefits */}
      <div className="mt-10">
        <h2 className="text-[#3A464F] text-[12px] font-bold tracking-widest uppercase mb-5">
          Key Benefits
        </h2>
        <ul className="flex flex-col gap-3">
          {keyBenefits.map((benefit, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="mt-[6px] shrink-0 w-[6px] h-[6px] rounded-full bg-[#006EB6]" />
              <span className="text-[#5A6874] text-[15px] leading-[1.7]">{benefit}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Related Products */}
      <div className="mt-10">
        <h2 className="text-[#3A464F] text-[12px] font-bold tracking-widest uppercase mb-5">
          Related Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {relatedProducts.map((product, i) => (
            <a
              key={i}
              href={product.href}
              data-testid={`card-related-product-${i}`}
              className="bg-white border border-[#D9E0E5] p-5 flex flex-col gap-2 hover:border-[#006EB6] transition-colors group"
            >
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold text-white bg-[#006EB6] px-2 py-0.5 tracking-wide">
                  {product.ticker}
                </span>
              </div>
              <h3 className="text-[#006EB6] text-[14px] font-semibold leading-snug group-hover:underline">
                {product.title}
              </h3>
              <p className="text-[#5A6874] text-[13px] leading-[1.6]">{product.description}</p>
            </a>
          ))}
        </div>
      </div>

      {/* Contract Specs Preview */}
      <div className="mt-10 mb-4">
        <h2 className="text-[#3A464F] text-[12px] font-bold tracking-widest uppercase mb-5">
          Contract Specifications
        </h2>
        <div className="bg-white border border-[#D9E0E5] overflow-hidden">
          <table className="w-full text-[14px]">
            <tbody>
              {[
                ["Ticker Symbol", "NQ"],
                ["Contract Size", "$20 × Nasdaq-100 Index"],
                ["Minimum Price Fluctuation", "0.25 index points = $5.00 per contract"],
                ["Trading Hours", "Mon–Fri: 5:00 p.m. (prev. day) – 4:15 p.m. CT"],
                ["Settlement Method", "Cash Settlement"],
                ["Expiration Cycle", "Quarterly (March cycle)"],
                ["Last Trading Day", "3rd Friday of contract month"],
                ["Position Limit", "10,000 net long or short across all contract months"],
              ].map(([label, value], i) => (
                <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-[#F1F5F7]"}>
                  <td className="px-5 py-3 text-[#5A6874] font-semibold w-[45%] border-r border-[#D9E0E5]">{label}</td>
                  <td className="px-5 py-3 text-[#3A464F]">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="border-t border-[#D9E0E5] px-5 py-3">
            <a href="#" className="text-[#006EB6] text-[13px] font-semibold hover:underline">
              View Full Contract Specifications →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
