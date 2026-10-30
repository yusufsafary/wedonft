import { CONFIG } from "@/config";
import { TIERS } from "@/data/content";
import { Reveal } from "./Reveal";

/** Banner halaman market — jembatan mencolok dari beranda ke /market/. */
export default function MarketBanner() {
  return (
    <section id="market" className="relative">
      <div className="mx-auto max-w-[1400px] px-4 md:px-8 xl:pl-[108px] py-10 md:py-24">
        <Reveal>
          <a href="/market/" className="group relative block overflow-hidden border border-volt/50 bg-ink2/70 p-5 md:p-10 transition-colors hover:border-volt">
            <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center">
              <div className="min-w-0 flex-1">
                <p className="label text-[10px] md:text-[11px] text-volt">
                  <span className="inline-block w-6 h-[2px] bg-volt align-middle mr-3" aria-hidden="true" />
                  Secondary market
                </p>
                <p className="display text-3xl md:text-5xl font-extrabold uppercase leading-[0.95] tracking-tight mt-3">
                  The Doer Market<br />
                  <span className="text-volt">is coming.</span>
                </p>
                <p className="mt-3 max-w-xl text-sm md:text-base text-paper2/85">
                  List, bid on, and trade Doers on BNB Chain — priced by the rarity the deck dealt you. The opening date drops on X first.
                </p>
                <p className="mt-5 inline-flex items-center gap-3">
                  <span className="btn btn-solid !py-2.5"><span>Visit the market page</span></span>
                  <span className="label text-[10px] text-ash group-hover:text-paper transition-colors">@wedowtf on X ↗</span>
                </p>
              </div>
              <div className="flex gap-2 shrink-0 overflow-hidden">
                {TIERS.map((t) => (
                  <img key={t.name} src={t.img} alt={`WEDO ${t.name} Doer`} className="w-14 md:w-20 border border-steel/60 bg-black" loading="lazy" decoding="async" />
                ))}
              </div>
            </div>
            <span className="absolute right-4 top-4 rotate-6 border-2 border-volt text-volt rounded-md px-2.5 py-1 mono text-[10px] tracking-[0.25em] uppercase">Soon</span>
          </a>
        </Reveal>
        <p className="label text-[10px] text-ash mt-3">Supply {CONFIG.supply.total.toLocaleString("en-US")} · the market opens after the mint — {CONFIG.domain}/market</p>
      </div>
    </section>
  );
}
