import { useEffect, useState } from "react";
import { CONFIG } from "@/config";
import { TICKER_ITEMS, TIERS } from "@/data/content";
import { useCountUp, useInView } from "@/hooks";
import { readContract, SEL } from "@/lib/read";
import { num } from "@/lib/format";

type Draw = { id: number; tier: number };

export default function Hero() {
  const live = CONFIG.contract.address.length > 0;
  const [minted, setMinted] = useState<number | null>(null);
  const [open, setOpen] = useState<boolean | null>(null);
  const [draws, setDraws] = useState<Draw[]>([]);
  const { ref, inView } = useInView<HTMLDivElement>(0.3);
  const shown = useCountUp(minted ?? 0, 1600, inView && minted !== null);

  useEffect(() => {
    if (!live) return;
    let stop = false;
    const tick = async () => {
      const [t, o] = await Promise.all([
        readContract(CONFIG.contract.address, SEL.totalMinted),
        readContract(CONFIG.contract.address, SEL.mintOpen),
      ]);
      if (stop) return;
      if (o !== null) setOpen(o > 0n);
      if (t === null) return;
      const n = Number(t);
      setMinted(n);
      if (n > 0) {
        const ids = Array.from({ length: Math.min(6, n) }, (_, i) => n - i);
        const tiers = await Promise.all(
          ids.map((id) => readContract(CONFIG.contract.address, SEL.rarityOf + id.toString(16).padStart(64, "0"))),
        );
        if (!stop) setDraws(ids.map((id, i) => ({ id, tier: tiers[i] !== null ? Number(tiers[i]) : 0 })).reverse());
      }
    };
    tick();
    const id = window.setInterval(tick, 20000);
    return () => { stop = true; window.clearInterval(id); };
  }, [live]);

  const pctMinted = minted !== null ? Math.min(100, (minted / CONFIG.supply.total) * 100) : 0;
  const remaining = minted !== null ? CONFIG.supply.total - minted : null;

  return (
    <section id="top" className="noise gridlines relative overflow-hidden pt-[64px]">
      <div className="mx-auto max-w-[1400px] px-4 md:px-8 xl:pl-[108px] pt-6 md:pt-20 pb-10 md:pb-14">
        <div ref={ref} className="reveal-mask is-in">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-4">
            {live && open ? (
              <span className="inline-flex items-center gap-2 border border-live/60 bg-live/10 px-3 py-1.5">
                <span className="pulse-dot inline-block size-2 rounded-full bg-live" />
                <span className="label text-[10px] text-live">Mint live{minted !== null ? ` · ${num(minted)} drawn` : ""}</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-2 border border-volt/60 bg-volt/10 px-3 py-1.5">
                <span className="pulse-dot inline-block size-2 rounded-full bg-volt" />
                <span className="label text-[10px] text-volt">{live ? "Mint opens soon" : "Deploying"}</span>
              </span>
            )}
            <p className="label text-[10px] md:text-[11px] text-ash">{CONFIG.network.name} · {CONFIG.contract.standard} · Agent ID only · Free mint · Gacha</p>
          </div>
          <h1 className="display font-extrabold uppercase leading-[0.88] tracking-tight text-[17.5vw] sm:text-[15vw] lg:text-[11rem]">
            WEDO<span className="text-volt">.</span>
          </h1>
          <p className="display font-extrabold uppercase leading-[0.95] tracking-tight text-[8vw] sm:text-[5.5vw] lg:text-[3.6rem] mt-3">
            Every mint<br />is a <span className="text-volt">draw.</span>
          </p>
        </div>
        <div className="mt-7 grid gap-5 lg:grid-cols-[1.2fr_1fr] lg:gap-10">
          <div>
            <p className="text-base md:text-xl text-paper2/90 max-w-xl">{CONFIG.lede}</p>
            <div className="snap-row mt-6 flex gap-2 overflow-x-auto snap-x snap-mandatory pb-1 md:grid md:grid-cols-5 md:overflow-visible max-w-xl">
              {TIERS.map((t) => (
                <figure key={t.name} className="bg-black min-w-[104px] w-[104px] snap-center md:min-w-0 md:w-auto border" style={{ borderColor: `color-mix(in srgb, ${t.color} 45%, transparent)` }}>
                  <img src={t.img} alt={`WEDO ${t.name} Doer`} className="w-full block" loading="lazy" decoding="async" />
                  <figcaption className="label text-[9px] text-ash text-center py-1.5">
                    <span style={{ color: t.color }}>●</span> {t.name} · {t.odds.replace("1 in ", "1/")}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
          <div className="border border-steel/70 bg-ink2/70 p-4 md:p-5 h-fit">
            <div className="flex items-baseline justify-between gap-4">
              <span className="label text-[11px] text-ash">Doers drawn</span>
              <span className="label text-[11px]" style={{ color: open ? "var(--color-live)" : "var(--color-ash)" }}>{live ? (open ? "● LIVE · on-chain" : "○ PAUSED") : "DEPLOYING"}</span>
            </div>
            <p className="display tnum text-4xl md:text-6xl font-extrabold mt-2">
              {live && minted !== null ? num(shown) : "—"}<span className="text-ash text-2xl md:text-4xl"> / {num(CONFIG.supply.total)}</span>
            </p>
            <div className="mt-3 h-2 bg-graphite overflow-hidden">
              <div className="h-full bg-volt transition-all duration-700" style={{ width: `${pctMinted}%` }} />
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2 text-center">
              <div className="border border-steel/50 py-2 px-1">
                <p className="display tnum text-lg md:text-xl font-bold leading-none">{minted !== null ? num(minted) : "—"}</p>
                <p className="label text-[9px] text-ash mt-1.5">Drawn</p>
              </div>
              <div className="border border-steel/50 py-2 px-1">
                <p className="display tnum text-lg md:text-xl font-bold leading-none">{remaining !== null ? num(remaining) : "—"}</p>
                <p className="label text-[9px] text-ash mt-1.5">Left in deck</p>
              </div>
              <div className="border border-steel/50 py-2 px-1">
                <p className="display tnum text-lg md:text-xl font-bold leading-none">{CONFIG.supply.maxPerWallet}</p>
                <p className="label text-[9px] text-ash mt-1.5">Max / wallet</p>
              </div>
            </div>
            {draws.length > 0 ? (
              <div className="mt-4">
                <p className="label text-[9px] text-ash mb-2">Latest draws — live from chain</p>
                <div className="flex flex-wrap gap-1.5">
                  {draws.map((d) => (
                    <span key={d.id} className="mono text-[11px] border px-2 py-1" style={{ borderColor: `color-mix(in srgb, ${TIERS[d.tier].color} 55%, transparent)`, color: TIERS[d.tier].color }}>
                      #{d.id} · {TIERS[d.tier].name}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}
            <div className="mt-5 flex flex-wrap gap-3">
              <a href="#mint" className="btn btn-solid"><span>Mint through your agent</span></a>
              <a href="#deck" className="btn btn-ghost"><span>Audit the deck</span></a>
            </div>
          </div>
        </div>
      </div>
      <div className="marquee-host overflow-hidden border-y border-steel/60 bg-ink2/60 py-2.5">
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
