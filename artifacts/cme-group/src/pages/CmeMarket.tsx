import TopNav from "@/components/TopNav";
import HeroSection from "@/components/HeroSection";
import TabNav from "@/components/TabNav";
import MainContent from "@/components/MainContent";
import Sidebar from "@/components/Sidebar";

export default function CmeMarket() {
  return (
    <div className="min-h-screen bg-[#F1F5F7] flex flex-col font-sans">
      <TopNav />
      <HeroSection />
      <TabNav />
      
      <main className="flex-1 w-full max-w-[1400px] mx-auto px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          <MainContent />
          <Sidebar />
        </div>
      </main>

      <footer className="bg-[#081D37] text-white py-8 px-6 text-sm">
        <div className="max-w-[1400px] mx-auto">
          © 2026 CME Group Inc. All rights reserved.
        </div>
      </footer>
    </div>
  );
}