import { Download, Monitor, Globe, Smartphone } from "lucide-react";

const downloadItems = [
  {
    id: "mts",
    icon: Smartphone,
    label: "Mobile Trading System",
    abbr: "MTS",
    description: "Access real-time quotes and execute orders anytime, anywhere from your smartphone.",
    href: "#",
  },
  {
    id: "hts",
    icon: Monitor,
    label: "Desktop Trading System",
    abbr: "HTS",
    description: "High-performance PC-based trading platform for fast, stable order execution and advanced charting.",
    href: "#",
  },
  {
    id: "wts",
    icon: Globe,
    label: "Web Trading System",
    abbr: "WTS",
    description: "Trade directly from any web browser — no installation required.",
    href: "#",
  },
];

export default function DownloadSection() {
  return (
    <section className="w-full bg-[#F1F5F7] border-t border-[#D9E0E5] py-14 px-6">
      <div className="max-w-[1400px] mx-auto">
        <h2 className="text-[#3A464F] text-[26px] font-light mb-2">
          Download Trading Platforms
        </h2>
        <p className="text-[#5A6874] text-[14px] mb-10">
          Choose a Nq Capital Group trading platform and get started today.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {downloadItems.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="bg-white border border-[#D9E0E5] p-8 flex flex-col gap-5 hover:border-[#006EB6] transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#006EB6]/10 flex items-center justify-center shrink-0">
                    <Icon size={24} className="text-[#006EB6]" />
                  </div>
                  <div>
                    <p className="text-[#5A6874] text-[11px] font-bold uppercase tracking-widest">
                      {item.abbr}
                    </p>
                    <h3 className="text-[#3A464F] text-[16px] font-semibold leading-tight">
                      {item.label}
                    </h3>
                  </div>
                </div>

                <p className="text-[#5A6874] text-[13px] leading-relaxed flex-1">
                  {item.description}
                </p>

                <a
                  href={item.href}
                  data-testid={`download-btn-${item.id}`}
                  className="flex items-center justify-center gap-2 bg-[#006EB6] hover:bg-[#005a96] text-white text-[13px] font-bold uppercase tracking-wide py-3 px-6 transition-colors"
                >
                  <Download size={15} />
                  Download
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
