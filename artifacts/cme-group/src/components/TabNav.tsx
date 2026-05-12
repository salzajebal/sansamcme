import { useState } from "react";

const TABS = [
  "Overview",
  "Quotes",
  "Settlements",
  "Volume & OI",
  "Specs",
  "Margins",
  "Calendar"
];

export default function TabNav() {
  const [activeTab, setActiveTab] = useState("Overview");

  return (
    <div className="bg-white border-b-2 border-[#D9E0E5] sticky top-[60px] z-40 w-full overflow-x-auto">
      <div className="flex px-2 w-max min-w-full">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-4 text-[13px] font-bold tracking-wide uppercase transition-colors relative whitespace-nowrap ${
              activeTab === tab
                ? "text-[#006EB6]"
                : "text-[#5A6874] hover:text-[#006EB6]"
            }`}
          >
            {tab}
            {activeTab === tab && (
              <div className="absolute bottom-[-2px] left-0 right-0 h-[3px] bg-[#006EB6]"></div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}