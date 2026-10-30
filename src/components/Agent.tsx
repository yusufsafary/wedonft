import { CONFIG } from "@/config";
import { num } from "@/lib/format";
import { Reveal, SectionHead } from "./Reveal";

export default function Agent() {
  const rows: [string, string, string][] = [
    ["Supply / cap", `${num(CONFIG.supply.total)} / ${CONFIG.supply.maxPerWallet}`, `${num(CONFIG.supply.wallets)} wallets can ever hold a full set of ten — plus six spare draws for whoever is fastest at the end.`],
    ["One draw", "FREE", "One mint opens one deck slot. The NFT itself costs nothing."],
    ["Ten draws", "FREE × 10", "A full wallet. The only cost along the way is the anti-bot commission — a few cents per mint, confirmed in your Binance Agent wallet."],
    ["The deck", "6,666 slots", "Exact tier counts, shuffled once, hash committed on-chain before mint opens. It never restocks and never changes."],
    ["Mythic", "33 of 6,666", "Half a percent of the deck — on average one in every 202 draws."],
    ["Eleventh mint", "REVERT", "The cap is a lifetime counter in the contract. No owner override, no team allocation, no back door."],
  ];
  return (
    <section id="agent" className="relative bg-ink2/40 border-y border-steel/50">
      <div className="mx-auto max-w-[1400px] px-4 md:px-8 xl:pl-[108px] py-16 md:py-24">
        <SectionHead index="04 / The Math" title="Arithmetic, not hype" sub="The collection is shaped by one division and one deck. Everything else — the cap, the odds, the audit — falls out of those two." />
        <Reveal>
          <p className="display tnum text-center font-extrabold leading-none text-[13vw] md:text-[7rem]">
            {num(CONFIG.supply.total)} <span className="text-volt">/</span> {CONFIG.supply.maxPerWallet} <span className="text-volt">=</span> {num(CONFIG.supply.wallets)}
          </p>
          <p className="label text-[11px] text-ash text-center mt-4">full wallets — and 6 draws left over</p>
        </Reveal>
        <div className="mt-12 border border-steel/70">
          {rows.map(([a, b, c], i) => (
            <Reveal key={a} delay={i * 40}>
              <div className="grid md:grid-cols-[220px_220px_1fr] gap-2 md:gap-6 items-baseline px-5 py-4 border-b border-steel/40 last:border-b-0 bg-ink/60">
                <span className="label text-[11px] text-ash">{a}</span>
                <span className="mono tnum text-volt">{b}</span>
                <span className="text-sm text-paper2/85">{c}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
