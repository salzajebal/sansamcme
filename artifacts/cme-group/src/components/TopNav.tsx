import nqGlobePath from "@assets/nq-globe.svg";

export default function TopNav() {
  const scrollToDownload = () => {
    const el = document.getElementById("download-section");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="bg-white border-b border-[#D9E0E5] sticky top-0 z-50">
      <div className="max-w-[1100px] mx-auto px-6 h-[60px] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src={nqGlobePath} alt="Nq Capital Group Globe" className="h-[22px] w-auto" />
          <span className="text-[#3A464F] font-bold text-[20px] tracking-wide">Nq Capital Group</span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={scrollToDownload}
            className="border border-[#3A464F] text-[#3A464F] px-5 py-2 text-sm font-semibold hover:bg-[#3A464F] hover:text-white transition-colors uppercase tracking-wide"
          >
            Download
          </button>
          <a
            href="https://htsweb.nqcapital-traders.com"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-[#006EB6] text-[#006EB6] px-5 py-2 text-sm font-semibold hover:bg-[#006EB6] hover:text-white transition-colors uppercase tracking-wide"
          >
            Log In
          </a>
        </div>
      </div>
    </header>
  );
}
