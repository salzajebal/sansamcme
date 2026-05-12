import TopNav from "@/components/TopNav";
import HeroSection from "@/components/HeroSection";
import TabNav from "@/components/TabNav";
import MainContent from "@/components/MainContent";
import Sidebar from "@/components/Sidebar";
import ExploreSection from "@/components/ExploreSection";
import CompareSection from "@/components/CompareSection";
import EconomicReportsSection from "@/components/EconomicReportsSection";
import DownloadSection from "@/components/DownloadSection";
import { FaYoutube, FaFacebookF, FaLinkedinIn, FaInstagram, FaRss } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { ChevronDown } from "lucide-react";

const footerColumns = [
  {
    title: "Company",
    links: [
      "About Us",
      "Corporate Citizenship",
      "Media Room",
      "Careers",
      "Investor Relations",
      "Subscription Center",
      "Contact Us",
    ],
  },
  {
    title: "International",
    links: [
      "Global Offices",
      "Partner Exchanges",
      "Latin America",
      "Europe, Middle East & Africa",
      "Asia-Pacific",
    ],
  },
  {
    title: "Market Regulation",
    links: [
      "Overview",
      "Rulebooks",
      "Regulatory Guidance",
      "Rule Filings",
      "Regulatory Outreach",
    ],
  },
  {
    title: "Our Exchanges",
    links: ["CME", "CBOT", "NYMEX", "COMEX"],
  },
];

const legalLinks = [
  "Disclaimer",
  "Privacy Notice",
  "Cookie Notice",
  "Terms of Use",
  "Data Terms of Use",
  "Modern Slavery Act Transparency Statement",
  "Report a Security Concern",
];

const socialIcons = [
  { Icon: FaYoutube, label: "YouTube" },
  { Icon: FaXTwitter, label: "X" },
  { Icon: FaFacebookF, label: "Facebook" },
  { Icon: FaLinkedinIn, label: "LinkedIn" },
  { Icon: FaInstagram, label: "Instagram" },
  { Icon: FaRss, label: "RSS" },
];

export default function CmeMarket() {
  return (
    <div className="min-h-screen bg-[#F1F5F7] flex flex-col font-sans">
      <TopNav />
      <HeroSection />
      <TabNav />

      {/* Two-column overview area */}
      <div className="w-full bg-[#F1F5F7]">
        <div className="max-w-[1100px] mx-auto px-6 py-8">
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
      <footer className="bg-white border-t border-[#D9E0E5]">

        {/* Top: 4-column link grid */}
        <div className="max-w-[1100px] mx-auto px-6 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {footerColumns.map((col) => (
              <div key={col.title}>
                <h4 className="text-[#3A464F] text-[11px] font-bold uppercase tracking-widest mb-5">
                  {col.title}
                </h4>
                <ul className="flex flex-col gap-[10px]">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-[#006EB6] text-[13px] hover:underline leading-relaxed"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Middle: Social icons + language selector */}
        <div className="border-t border-[#D9E0E5]">
          <div className="max-w-[1100px] mx-auto px-6 py-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              {socialIcons.map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-9 h-9 rounded-full border border-[#C5CDD4] flex items-center justify-center text-[#5A6874] hover:border-[#006EB6] hover:text-[#006EB6] transition-colors"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>

            <button className="flex items-center gap-1 text-[#3A464F] text-[13px] font-semibold hover:text-[#006EB6] transition-colors">
              English <ChevronDown size={14} />
            </button>
          </div>
        </div>

        {/* Bottom: dark gray strip */}
        <div className="bg-[#3A4F5E]">
          <div className="max-w-[1100px] mx-auto px-6 py-5">
            <p className="text-white/70 text-[12px] leading-relaxed mb-3">
              Nq Capital Group is the world's leading derivatives marketplace. The company is comprised of four Designated Contract Markets (DCMs).{" "}
              Further information on each exchange's rules and product listings can be found by clicking on the links to{" "}
              <a href="#" className="text-[#25A9E0] hover:underline">CME</a>,{" "}
              <a href="#" className="text-[#25A9E0] hover:underline">CBOT</a>,{" "}
              <a href="#" className="text-[#25A9E0] hover:underline">NYMEX</a> and{" "}
              <a href="#" className="text-[#25A9E0] hover:underline">COMEX</a>.
            </p>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
              <p className="text-white/60 text-[12px]">
                © 2026 Nq Capital Group Inc. All rights reserved.
              </p>
              <div className="flex flex-wrap gap-x-0 gap-y-1">
                {legalLinks.map((item, i) => (
                  <span key={item} className="flex items-center">
                    <a
                      href="#"
                      className="text-[#25A9E0] text-[12px] hover:underline whitespace-nowrap"
                    >
                      {item}
                    </a>
                    {i < legalLinks.length - 1 && (
                      <span className="text-white/30 mx-2 text-[12px]">|</span>
                    )}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
