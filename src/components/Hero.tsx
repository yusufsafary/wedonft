import { useEffect, useState } from "react";
import { CONFIG } from "@/config";
import { TICKER_ITEMS, TIERS } from "@/data/content";
import { useCountUp, useInView } from "@/hooks";
import { readContract, SEL } from "@/lib/read";
import { num } from "@/lib/format";

export default function Hero() {
  const live = CONFIG.contract.address.length > 0;
  const [minted, setMinted] = useState<number | null>(null);
  const { ref, inView } = useInView<HTMLDivElement>(0.3);
  const shown = useCountUp(minted ?? 0, 1600, inView && minted !== null);

  useEffect(() => {
    if (!live) return;
    let stop = false;
    const tick = async () => {
      const v = await readContract(CONFIG.contract.address, SEL.totalMinted);
      if (!stop && v !== null) setMinted(Number(v));
    };
    tick();
    const id = window.setInterval(tick, 20000);
    return () => { stop = true; window.clearInterval(id); };
  }, [live]);

  const pctMinted = minted !== null ? Math.min(100, (minted / CONFIG.supply.total) * 100) : 0;
  return (
    <section id="top" className="noise gridlines relative overflow-hidden pt-[64px]">
      <div className="mx-auto max-w-[1400px] px-4 md:px-8 xl:pl-[108px] pt-10 md:pt-24 pb-12 md:pb-16">
        <div ref={ref} className="reveal-mask is-in">
          <p className="label text-volt mb-5">{CONFIG.network.name} · {CONFIG.contract.standard} · Agent ID only · Free mint · Gacha</p>
          <h1 className="display font-extrabold uppercase leading-[0.88] tracking-tight text-[19vw] sm:text-[15vw] lg:text-[11rem]">
            WEDO<span className="text-volt">.</span>
          </h1>
          <p className="display font-extrabold uppercase leading-[0.95] tracking-tight text-[8.5vw] sm:text-[5.5vw] lg:text-[3.6rem] mt-4">
            Every mint<br />is a <span className="text-volt">draw.</span>
          </p>
        </div>
        <div className="mt-10 grid gap-10 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <p className="text-lg md:text-xl text-paper2/90 max-w-xl">{CONFIG.lede}</p>
            <div className="snap-row mt-8 flex gap-2 overflow-x-auto snap-x snap-mandatory pb-1 md:grid md:grid-cols-5 md:overflow-visible max-w-xl">
              {TIERS.map((t) => (
                <figure key={t.name} className="border border-steel/60 bg-black min-w-[104px] w-[104px] snap-center md:min-w-0 md:w-auto">
                  <img src={t.img} alt={`WEDO ${t.name} Doer`} className="w-full block" loading="lazy" decoding="async" />
                  <figcaption className="label text-[9px] text-ash text-center py-1.5">{t.name} · {t.odds.replace("1 in ", "1/")}</figcaption>
                </figure>
              ))}
            </div>
          </div>
          <div className="border border-steel/70 bg-ink2/70 p-5 h-fit">
            <div className="flex items-baseline justify-between gap-4">
              <span className="label text-[11px] text-ash">Doers drawn</span>
              <span className="label text-[11px] text-ash">{live ? "LIVE · on-chain" : "DEPLOYING"}</span>
            </div>
            <p className="display tnum text-5xl md:text-6xl font-extrabold mt-2">
              {live && minted !== null ? num(shown) : "—"}<span className="text-ash text-3xl md:text-4xl"> / {num(CONFIG.supply.total)}</span>
            </p>
            <div className="mt-4 h-2 bg-graphite overflow-hidden">
              <div className="h-full bg-volt transition-all duration-700" style={{ width: `${pctMinted}%` }} />
            </div>
            <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2">
              <span className="label text-[11px] text-ash">Deck commitment</span>
              <span className="mono tnum text-volt text-[13px]">{CONFIG.gacha.deckCommitment.slice(0, 10)}…{CONFIG.gacha.deckCommitment.slice(-6)}</span>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#mint" className="btn btn-solid"><span>Mint through your agent</span></a>
              <a href="#tiers" className="btn btn-ghost"><span>See the rarities</span></a>
            </div>
          </div>
        </div>
      </div>
      <div className="marquee-host overflow-hidden border-y border-steel/60 bg-ink2/60 py-3">
        <div className="marquee-track flex whitespace-nowrap gap-0 w-max">
          {[0, 1].map((n) => (
            <span key={n} className="label text-[12px] text-ash">
              {TICKER_ITEMS.map((t, i) => (
                <span key={i} className="mx-6"><span className="text-volt mr-6">◉</span>{t}</span>
              ))}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
