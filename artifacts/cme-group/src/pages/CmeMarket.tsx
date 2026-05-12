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
      { label: "About Us", href: "https://www.cmegroup.com/company/about-us.html" },
      { label: "Corporate Citizenship", href: "https://www.cmegroup.com/company/corporate-citizenship.html" },
      { label: "Media Room", href: "https://www.cmegroup.com/media-room.html" },
      { label: "Careers", href: "https://www.cmegroup.com/careers.html" },
      { label: "Investor Relations", href: "https://investor.cmegroup.com/" },
      { label: "Subscription Center", href: "https://www.cmegroup.com/subscription-center.html" },
      { label: "Contact Us", href: "https://www.cmegroup.com/company/contact-us.html" },
    ],
  },
  {
    title: "International",
    links: [
      { label: "Global Offices", href: "https://www.cmegroup.com/international/global-offices.html" },
      { label: "Partner Exchanges", href: "https://www.cmegroup.com/international/partner-exchanges.html" },
      { label: "Latin America", href: "https://www.cmegroup.com/international/latin-america.html" },
      { label: "Europe, Middle East & Africa", href: "https://www.cmegroup.com/international/emea.html" },
      { label: "Asia-Pacific", href: "https://www.cmegroup.com/international/asia-pacific.html" },
    ],
  },
  {
    title: "Market Regulation",
    links: [
      { label: "Overview", href: "https://www.cmegroup.com/market-regulation/overview.html" },
      { label: "Rulebooks", href: "https://www.cmegroup.com/market-regulation/rulebooks.html" },
      { label: "Regulatory Guidance", href: "https://www.cmegroup.com/market-regulation/regulatory-guidance.html" },
      { label: "Rule Filings", href: "https://www.cmegroup.com/market-regulation/rule-filings.html" },
      { label: "Regulatory Outreach", href: "https://www.cmegroup.com/market-regulation/regulatory-outreach.html" },
    ],
  },
  {
    title: "Our Exchanges",
    links: [
      { label: "CME", href: "https://www.cmegroup.com/company/cme.html" },
      { label: "CBOT", href: "https://www.cmegroup.com/company/cbot.html" },
      { label: "NYMEX", href: "https://www.cmegroup.com/company/nymex.html" },
      { label: "COMEX", href: "https://www.cmegroup.com/company/comex.html" },
    ],
  },
];

const legalLinks = [
  { label: "Disclaimer", href: "https://www.cmegroup.com/disclaimer.html" },
  { label: "Privacy Notice", href: "https://www.cmegroup.com/privacy-notice.html" },
  { label: "Cookie Notice", href: "https://www.cmegroup.com/cookie-notice.html" },
  { label: "Terms of Use", href: "https://www.cmegroup.com/terms-of-use.html" },
  { label: "Data Terms of Use", href: "https://www.cmegroup.com/data-terms-of-use.html" },
  { label: "Modern Slavery Act Transparency Statement", href: "https://www.cmegroup.com/company/modern-slavery-act-transparency-statement.html" },
  { label: "Report a Security Concern", href: "https://www.cmegroup.com/report-a-security-concern.html" },
];

const socialIcons = [
  { Icon: FaYoutube,    label: "YouTube",   href: "https://www.youtube.com/user/cmegroup" },
  { Icon: FaXTwitter,  label: "X",          href: "https://twitter.com/CMEGroup" },
  { Icon: FaFacebookF, label: "Facebook",   href: "https://www.facebook.com/CMEGroup" },
  { Icon: FaLinkedinIn,label: "LinkedIn",   href: "https://www.linkedin.com/company/cme-group" },
  { Icon: FaInstagram, label: "Instagram",  href: "https://www.instagram.com/cmegroup/" },
  { Icon: FaRss,       label: "RSS",        href: "https://www.cmegroup.com/rss-feeds.html" },
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
                    <li key={link.label}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#006EB6] text-[13px] hover:underline leading-relaxed"
                      >
                        {link.label}
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
              {socialIcons.map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
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
              <a href="https://www.cmegroup.com/company/cme.html" target="_blank" rel="noopener noreferrer" className="text-[#25A9E0] hover:underline">CME</a>,{" "}
              <a href="https://www.cmegroup.com/company/cbot.html" target="_blank" rel="noopener noreferrer" className="text-[#25A9E0] hover:underline">CBOT</a>,{" "}
              <a href="https://www.cmegroup.com/company/nymex.html" target="_blank" rel="noopener noreferrer" className="text-[#25A9E0] hover:underline">NYMEX</a> and{" "}
              <a href="https://www.cmegroup.com/company/comex.html" target="_blank" rel="noopener noreferrer" className="text-[#25A9E0] hover:underline">COMEX</a>.
            </p>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
              <p className="text-white/60 text-[12px]">
                © 2026 Nq Capital Group Inc. All rights reserved.
              </p>
              <div className="flex flex-wrap gap-x-0 gap-y-1">
                {legalLinks.map((item, i) => (
                  <span key={item.label} className="flex items-center">
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#25A9E0] text-[12px] hover:underline whitespace-nowrap"
                    >
                      {item.label}
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
