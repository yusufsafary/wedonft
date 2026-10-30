import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import MintPanel from "@/components/MintPanel";
import MarketBanner from "@/components/MarketBanner";
import Footer from "@/components/Footer";
import MobileNav from "@/components/MobileNav";

export default function App() {
  return (
    <div className="min-h-screen bg-ink text-paper pb-[76px] lg:pb-0">
      <Nav />
      <main>
        <Hero />
        <MintPanel />
        <MarketBanner />
      </main>
      <Footer />
      <MobileNav />
    </div>
  );
}
