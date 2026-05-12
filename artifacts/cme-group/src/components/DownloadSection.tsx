import { Download, Monitor, Globe, Smartphone } from "lucide-react";

const downloadItems = [
  {
    id: "mts",
    icon: Smartphone,
    label: "모바일 전용 설치",
    abbr: "MTS",
    description: "스마트폰에서 언제 어디서나 실시간 시세 확인 및 주문 실행",
    href: "#",
  },
  {
    id: "hts",
    icon: Monitor,
    label: "PC 전용 설치",
    abbr: "HTS",
    description: "PC 전용 고성능 트레이딩 시스템으로 빠르고 안정적인 거래 환경 제공",
    href: "#",
  },
  {
    id: "wts",
    icon: Globe,
    label: "웹 트레이딩 시스템",
    abbr: "WTS",
    description: "별도 설치 없이 웹 브라우저에서 바로 접속하는 트레이딩 플랫폼",
    href: "#",
  },
];

export default function DownloadSection() {
  return (
    <section className="w-full bg-[#F1F5F7] border-t border-[#D9E0E5] py-14 px-6">
      <div className="max-w-[1400px] mx-auto">
        <h2 className="text-[#3A464F] text-[26px] font-light mb-2">
          트레이딩 플랫폼 다운로드
        </h2>
        <p className="text-[#5A6874] text-[14px] mb-10">
          Nq Capital Group의 트레이딩 플랫폼을 선택하여 설치하세요.
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
                  다운로드
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
