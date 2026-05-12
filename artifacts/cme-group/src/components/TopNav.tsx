import nqGlobePath from "@assets/nq-globe.svg";

export default function TopNav() {
  return (
    <header className="bg-white border-b border-[#D9E0E5] h-[60px] flex items-center justify-between px-6 sticky top-0 z-50">
      <div className="flex items-center gap-2">
        <img src={nqGlobePath} alt="Nq Capital Group Globe" className="h-[22px] w-auto" />
        <span className="text-[#3A464F] font-bold text-[15px] tracking-wide">Nq Capital Group</span>
      </div>

      <div className="flex items-center gap-3">
        <button className="border border-[#3A464F] text-[#3A464F] px-5 py-2 text-sm font-semibold hover:bg-[#3A464F] hover:text-white transition-colors uppercase tracking-wide">
          Download
        </button>
        <button className="border border-[#006EB6] text-[#006EB6] px-5 py-2 text-sm font-semibold hover:bg-[#006EB6] hover:text-white transition-colors uppercase tracking-wide">
          Log In
        </button>
      </div>
    </header>
  );
}
