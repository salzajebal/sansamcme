import { useState } from "react";
import { Minus, Plus } from "lucide-react";

export default function Sidebar() {
  const [toolsOpen, setToolsOpen] = useState(true);
  const [resourcesOpen, setResourcesOpen] = useState(false);

  return (
    <aside className="w-full lg:w-[280px] shrink-0 bg-white border border-[#D9E0E5] h-fit">
      {/* Tools Panel */}
      <div className="flex flex-col">
        <button 
          onClick={() => setToolsOpen(!toolsOpen)}
          className="flex items-center justify-between p-4 text-[#3A464F] font-bold text-[15px] hover:bg-gray-50 transition-colors w-full"
        >
          Tools
          {toolsOpen ? <Minus size={18} /> : <Plus size={18} />}
        </button>
        
        {toolsOpen && (
          <div className="p-4 pt-0 flex flex-col gap-2">
            <div className="h-[1px] bg-[#D9E0E5] mb-2 w-full"></div>
            <a href="#" className="text-[#006EB6] hover:underline text-[14px] leading-loose">Roll Analyzer</a>
            <a href="#" className="text-[#006EB6] hover:underline text-[14px] leading-loose">QuikStrike tools</a>
            <a href="#" className="text-[#006EB6] hover:underline text-[14px] leading-loose">Options Expiration Calendar</a>
            <a href="#" className="text-[#006EB6] hover:underline text-[14px] leading-loose">Commitment of Traders</a>
            <a href="#" className="text-[#006EB6] hover:underline text-[14px] leading-loose">Equity TCA Tool</a>
          </div>
        )}
      </div>

      <div className="h-[1px] bg-[#D9E0E5] w-full"></div>

      {/* Resources Panel */}
      <div className="flex flex-col">
        <button 
          onClick={() => setResourcesOpen(!resourcesOpen)}
          className="flex items-center justify-between p-4 text-[#3A464F] font-bold text-[15px] hover:bg-gray-50 transition-colors w-full"
        >
          Resources
          {resourcesOpen ? <Minus size={18} /> : <Plus size={18} />}
        </button>
        
        {resourcesOpen && (
          <div className="p-4 pt-0 flex flex-col gap-2">
            <div className="h-[1px] bg-[#D9E0E5] mb-2 w-full"></div>
            <a href="#" className="text-[#006EB6] hover:underline text-[14px] leading-loose">Documentation</a>
            <a href="#" className="text-[#006EB6] hover:underline text-[14px] leading-loose">Research Papers</a>
            <a href="#" className="text-[#006EB6] hover:underline text-[14px] leading-loose">FAQs</a>
          </div>
        )}
      </div>
    </aside>
  );
}