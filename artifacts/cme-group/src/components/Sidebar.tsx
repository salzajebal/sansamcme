import { useState } from "react";
import { Minus, Plus } from "lucide-react";

export default function Sidebar() {
  const [toolsOpen, setToolsOpen] = useState(true);
  const [resourcesOpen, setResourcesOpen] = useState(false);

  const tools = [
    "Roll Analyzer",
    "QuikStrike tools",
    "Options Expiration Calendar",
    "Commitment of Traders",
    "Equity TCA Tool",
  ];

  const resources = [
    "E-mini Nasdaq-100 Fact Card",
    "Understanding E-mini Nasdaq-100",
    "Equity Index Futures Brochure",
    "Options on Futures Brochure",
    "Introduction to Futures",
    "Self-Study Guide to Hedging",
  ];

  return (
    <aside className="w-full lg:w-[280px] shrink-0 h-fit">
      {/* Tools Panel */}
      <div className="bg-white border border-[#D9E0E5]">
        <button
          onClick={() => setToolsOpen(!toolsOpen)}
          data-testid="button-tools-toggle"
          className="flex items-center justify-between w-full px-4 py-4 text-[#3A464F] font-bold text-[15px] hover:bg-[#F1F5F7] transition-colors"
        >
          Tools
          {toolsOpen ? <Minus size={16} className="text-[#006EB6]" /> : <Plus size={16} className="text-[#3A464F]" />}
        </button>

        {toolsOpen && (
          <>
            <div className="h-[1px] bg-[#D9E0E5]" />
            <div className="px-4 py-3 flex flex-col gap-1">
              {tools.map((tool, i) => (
                <a
                  key={i}
                  href="#"
                  data-testid={`link-tool-${i}`}
                  className="text-[#006EB6] text-[14px] py-1 hover:underline block"
                >
                  {tool}
                </a>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Resources Panel */}
      <div className="bg-white border border-[#D9E0E5] border-t-0 mt-0">
        <button
          onClick={() => setResourcesOpen(!resourcesOpen)}
          data-testid="button-resources-toggle"
          className="flex items-center justify-between w-full px-4 py-4 text-[#3A464F] font-bold text-[15px] hover:bg-[#F1F5F7] transition-colors"
        >
          Resources
          {resourcesOpen ? <Minus size={16} className="text-[#006EB6]" /> : <Plus size={16} className="text-[#3A464F]" />}
        </button>

        {resourcesOpen && (
          <>
            <div className="h-[1px] bg-[#D9E0E5]" />
            <div className="px-4 py-3 flex flex-col gap-1">
              {resources.map((res, i) => (
                <a
                  key={i}
                  href="#"
                  data-testid={`link-resource-${i}`}
                  className="text-[#006EB6] text-[14px] py-1 hover:underline block"
                >
                  {res}
                </a>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Education Promo Box */}
      <div className="mt-4 bg-[#081D37] text-white p-5">
        <h3 className="text-[15px] font-bold mb-2">Understanding the E-mini Nasdaq-100</h3>
        <p className="text-[13px] text-white/70 leading-relaxed mb-4">
          Explore our educational courses to learn about trading E-mini Nasdaq-100 futures and options.
        </p>
        <a
          href="#"
          data-testid="link-education-course"
          className="inline-block text-[13px] text-[#25A9E0] font-semibold hover:underline"
        >
          Explore Courses →
        </a>
      </div>
    </aside>
  );
}
