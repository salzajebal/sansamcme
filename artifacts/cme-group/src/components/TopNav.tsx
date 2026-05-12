import { Search, User } from "lucide-react";
import cmeLogoPath from "@assets/cme-logo.svg";

export default function TopNav() {
  return (
    <header className="bg-white border-b border-[#D9E0E5] h-[60px] flex items-center justify-between px-6 sticky top-0 z-50">
      <div className="flex items-center gap-2">
        <img src={cmeLogoPath} alt="Nq Capital Group Logo" className="h-[23px] w-auto" />
        <span className="text-[#3A464F] font-bold text-[15px] tracking-wide">Nq Capital Group</span>
      </div>

      <nav className="hidden md:flex items-center gap-6">
        <a href="#" className="text-[13px] tracking-wide uppercase text-[#3A464F] hover:text-[#006EB6] hover:underline decoration-2 underline-offset-4">Markets</a>
        <a href="#" className="text-[13px] tracking-wide uppercase text-[#3A464F] hover:text-[#006EB6] hover:underline decoration-2 underline-offset-4">Data</a>
        <a href="#" className="text-[13px] tracking-wide uppercase text-[#3A464F] hover:text-[#006EB6] hover:underline decoration-2 underline-offset-4">Solutions</a>
        <div className="w-[1px] h-4 bg-[#D9E0E5]"></div>
        <a href="#" className="text-[13px] tracking-wide uppercase text-[#3A464F] hover:text-[#006EB6] hover:underline decoration-2 underline-offset-4">Insights</a>
        <a href="#" className="text-[13px] tracking-wide uppercase text-[#3A464F] hover:text-[#006EB6] hover:underline decoration-2 underline-offset-4">Education</a>
      </nav>

      <div className="flex items-center gap-4">
        <button className="text-[#3A464F] hover:text-[#006EB6]">
          <Search size={20} />
        </button>
        <button className="text-[#3A464F] hover:text-[#006EB6]">
          <User size={20} />
        </button>
        <button className="border border-[#006EB6] text-[#006EB6] px-5 py-2 text-sm font-semibold hover:bg-[#006EB6] hover:text-white transition-colors uppercase">
          Download
        </button>
      </div>
    </header>
  );
}