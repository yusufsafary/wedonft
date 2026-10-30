import { CONFIG } from "@/config";
import { num } from "@/lib/format";
import { Reveal } from "./Reveal";

const rows: [string, string][] = [
  ["Collection", `${CONFIG.brand} — gacha Doers`],
  ["Total supply", `${num(CONFIG.supply.total)} Doers · one deck, no restock`],
  ["Max per wallet", `${CONFIG.supply.maxPerWallet} draws · lifetime counter`],
  ["Mint price", "Free — anti-bot commission only, confirmed in your Binance Agent wallet"],
  ["Rarity model", "Committed shuffled deck — exact tier counts, drawn in mint order"],
  ["Deck commitment", CONFIG.gacha.deckCommitment],
  ["Chain", `${CONFIG.network.name} · chainId ${CONFIG.network.chainId}`],
  ["Standard", CONFIG.contract.standard],
  ["Gate", "SPACE ID Agent ID, checked on-chain at every mint"],
  ["Reveal", "Instant at mint — rarityOf() on-chain + metadata"],
  ["Contract", CONFIG.contract.address ? CONFIG.contract.address : `Deploying — predicted ${CONFIG.contract.predicted}`],
];

export default function SpecSheet() {
  return (
    <section className="relative">
      <div className="mx-auto max-w-[1400px] px-4 md:px-8 xl:pl-[108px] py-10 md:py-20">
        <Reveal>
          <div className="border border-steel/70">
            <div className="flex items-center justify-between border-b border-steel/70 px-5 py-3 bg-ink2/70">
              <span className="label text-[11px] text-ash">Spec sheet</span>
              <span className="label text-[11px] text-volt">Read before you draw</span>
            </div>
            <dl className="grid md:grid-cols-2">
              {rows.map(([k, v], i) => (
                <div key={k} className={`flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6 px-5 py-3.5 ${i % 2 === 0 ? "md:border-r" : ""} border-b border-steel/40`}>
                  <dt className="label text-[11px] text-ash shrink-0">{k}</dt>
                  <dd className="mono text-[13px] text-left sm:text-right text-paper break-all">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
