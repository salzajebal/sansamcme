import TopNav from "@/components/TopNav";
import HeroSection from "@/components/HeroSection";
import TabNav from "@/components/TabNav";
import MainContent from "@/components/MainContent";
import Sidebar from "@/components/Sidebar";
import ExploreSection from "@/components/ExploreSection";
import CompareSection from "@/components/CompareSection";
import EconomicReportsSection from "@/components/EconomicReportsSection";
import DownloadSection from "@/components/DownloadSection";
import nqGlobePath from "@assets/nq-globe.svg";

const footerLinks = {
  Markets: ["Equities", "Interest Rates", "FX", "Agricultural", "Energy", "Metals", "Real Estate"],
  "Data & Research": ["Market Data", "Data Services", "Research & Reports", "Economic Research"],
  Solutions: ["Financial Intermediaries", "Buy-Side", "Corporate Treasury", "Small Business"],
  Education: ["Online Courses", "Self-Study Guides", "Webinars & Events", "Market Insights"],
  About: ["Our Company", "Leadership", "Careers", "Media Room", "Investor Relations"],
};

export default function CmeMarket() {
  return (
    <div className="min-h-screen bg-[#F1F5F7] flex flex-col font-sans">
      <TopNav />
      <HeroSection />
      <TabNav />

      {/* Two-column overview area */}
      <div className="w-full bg-[#F1F5F7]">
        <div className="max-w-[1400px] mx-auto px-6 py-8">
          <div className="flex flex-col lg:flex-row gap-6">
            <MainContent />
            <Sidebar />
          </div>
        </div>
      </div>

      {/* Full-width sections */}
      <ExploreSection />
      <CompareSection />
      <EconomicReportsSection />
      <DownloadSection />

      {/* Footer */}
      <footer className="bg-[#081D37] text-white mt-0">
        <div className="max-w-[1400px] mx-auto px-6 py-12">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h4 className="text-white text-[12px] font-bold uppercase tracking-widest mb-4">
                  {category}
                </h4>
                <ul className="flex flex-col gap-2">
                  {links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-white/60 text-[13px] hover:text-white transition-colors leading-relaxed">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-white/10">
          <div className="max-w-[1400px] mx-auto px-6 py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <img src={nqGlobePath} alt="Nq Capital Group" className="h-4 brightness-0 invert opacity-60" />
              <span className="text-white/60 text-[13px] font-bold tracking-wide">Nq Capital Group</span>
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {["Privacy Policy", "Terms of Use", "Cookie Policy", "Sitemap", "Contact Us"].map((item) => (
                <a key={item} href="#" className="text-white/50 text-[12px] hover:text-white transition-colors">
                  {item}
                </a>
              ))}
            </div>
            <p className="text-white/40 text-[12px] whitespace-nowrap">
              © 2026 Nq Capital Group Inc. All rights reserved.
            </p>
          </div>
        </div>

        <div className="border-t border-white/10">
          <div className="max-w-[1400px] mx-auto px-6 py-4">
            <p className="text-white/30 text-[11px] leading-relaxed">
              Nq Capital Group is the world's leading derivatives marketplace. The company is comprised of four Designated Contract Markets (DCMs). Further information on each exchange's rules and product listings can be found by clicking on the links to CME, CBOT, NYMEX and COMEX.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
