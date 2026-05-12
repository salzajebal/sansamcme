import { useState } from "react";
import { Minus, Plus, ArrowRight } from "lucide-react";

const reports = [
  {
    title: "NON-FARM PAYROLL",
    description:
      "This monthly report shows changes in U.S. jobs, drives Fed policy and indicates economic growth.",
  },
  {
    title: "UNEMPLOYMENT REPORTS",
    description:
      "These reports present the U.S. unemployment rate as a percentage. They drive Fed policy and indicate economy's strength.",
  },
  {
    title: "EARNINGS RELEASES",
    description:
      "These updates list changes in earnings of publically traded companies, which can move the market.",
  },
  {
    title: "FOMC (FEDERAL OPEN MARKETS COMMITTEE)",
    description:
      "The Federal Open Market Committee determines U.S. monetary policy and whether to move the key interest rate. It also drives stock market movements.",
  },
  {
    title: "CPI (CONSUMER PRICE INDEX)",
    description:
      "The Consumer Price Index measures inflation or cost-of-living changes through average price of a basket of goods and services.",
  },
  {
    title: "INDUSTRIAL PRODUCTION",
    description:
      "These reports track change in monthly raw volume of industrial goods produced.",
  },
  {
    title: "FEDERAL RESERVE OPEN MARKET OPERATIONS",
    description:
      "The Federal Reserve uses open market operations to implement monetary policy and control the supply of money in the economy.",
  },
  {
    title: "INVENTORY REPORTS",
    description:
      "These reports track changes in oil and natural gas supplies. They also impact energy prices paid by consumers.",
  },
];

export default function EconomicReportsSection() {
  const [collapsed, setCollapsed] = useState<Record<number, boolean>>({
    6: true,
  });

  const toggle = (i: number) =>
    setCollapsed((prev) => ({ ...prev, [i]: !prev[i] }));

  const leftReports = reports.filter((_, i) => i % 2 === 0);
  const rightReports = reports.filter((_, i) => i % 2 === 1);

  return (
    <section className="w-full bg-white py-12 px-6 border-t border-[#D9E0E5]">
      <div className="max-w-[1100px] mx-auto">
        <h2 className="text-[#3A464F] text-[26px] font-light mb-8">
          Key economic reports and factors that move markets
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {/* Left column */}
          <div>
            {leftReports.map((report, colIdx) => {
              const globalIdx = colIdx * 2;
              const isCollapsed = collapsed[globalIdx];
              return (
                <div
                  key={globalIdx}
                  className="border-b border-[#D9E0E5] py-4 pr-8"
                  data-testid={`accordion-report-${globalIdx}`}
                >
                  <button
                    onClick={() => toggle(globalIdx)}
                    className="flex items-center justify-between w-full text-left group"
                  >
                    <span className="text-[#3A464F] text-[12px] font-bold tracking-widest uppercase">
                      {report.title}
                    </span>
                    {isCollapsed ? (
                      <Plus size={14} className="text-[#5A6874] shrink-0 ml-2" />
                    ) : (
                      <Minus size={14} className="text-[#5A6874] shrink-0 ml-2" />
                    )}
                  </button>
                  {!isCollapsed && (
                    <p className="text-[#5A6874] text-[14px] leading-relaxed mt-2">
                      {report.description}
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right column */}
          <div className="md:pl-8 md:border-l border-[#D9E0E5]">
            {rightReports.map((report, colIdx) => {
              const globalIdx = colIdx * 2 + 1;
              const isCollapsed = collapsed[globalIdx];
              return (
                <div
                  key={globalIdx}
                  className="border-b border-[#D9E0E5] py-4"
                  data-testid={`accordion-report-${globalIdx}`}
                >
                  <button
                    onClick={() => toggle(globalIdx)}
                    className="flex items-center justify-between w-full text-left group"
                  >
                    <span className="text-[#3A464F] text-[12px] font-bold tracking-widest uppercase">
                      {report.title}
                    </span>
                    {isCollapsed ? (
                      <Plus size={14} className="text-[#5A6874] shrink-0 ml-2" />
                    ) : (
                      <Minus size={14} className="text-[#5A6874] shrink-0 ml-2" />
                    )}
                  </button>
                  {!isCollapsed && (
                    <p className="text-[#5A6874] text-[14px] leading-relaxed mt-2">
                      {report.description}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Market Commentary link */}
        <div className="mt-8">
          <a
            href="#"
            className="flex items-center gap-2 text-[#3A464F] text-[16px] font-semibold hover:text-[#006EB6] transition-colors"
            data-testid="link-market-commentary"
          >
            Market Commentary <ArrowRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}
