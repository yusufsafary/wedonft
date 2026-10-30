import { useState } from "react";
import { CONFIG } from "@/config";
import { DECK_STEPS, TIERS } from "@/data/content";
import { num } from "@/lib/format";
import { Reveal, SectionHead } from "./Reveal";

type RevealState =
  | { kind: "idle" }
  | { kind: "invalid" }
  | { kind: "loading" }
  | { kind: "done"; id: number; tier: number };

export default function Deck() {
  const [input, setInput] = useState("");
  const [state, setState] = useState<RevealState>({ kind: "idle" });

  async function lookup() {
    const id = Number(input.trim());
    if (!Number.isInteger(id) || id < 1 || id > CONFIG.supply.total) { setState({ kind: "invalid" }); return; }
    setState({ kind: "loading" });
    try {
      const res = await fetch("/deck.json");
      const j = (await res.json()) as { deck: string };
      const tier = Number(j.deck[id - 1]);
      setState({ kind: "done", id, tier });
    } catch {
      setState({ kind: "invalid" });
    }
  }

  const done = state.kind === "done" ? state : null;
  const tier = done ? TIERS[done.tier] : null;

  return (
    <section id="deck" className="relative">
      <div className="mx-auto max-w-[1400px] px-4 md:px-8 xl:pl-[108px] py-16 md:py-24">
        <SectionHead index="03 / The Deck" title="A deck you can audit" sub="No hidden mint-time randomness, no server deciding your fate. The rarity order was fixed before launch and locked to a hash — here is the whole mechanism, in the open." />
        <div className="relative">
          <svg className="hidden md:block absolute left-0 right-0 top-[26px] w-full h-[10px]" preserveAspectRatio="none" viewBox="0 0 100 10" aria-hidden="true">
            <line x1="0" y1="5" x2="100" y2="5" stroke="var(--color-steel)" strokeWidth="1" />
            <line className="arc-dash" x1="0" y1="5" x2="100" y2="5" stroke="var(--color-volt)" strokeWidth="2" />
          </svg>
          <div className="grid md:grid-cols-5 gap-4">
            {DECK_STEPS.map((e, i) => (
              <Reveal key={e.n} delay={i * 80}>
                <article className="relative border border-steel/70 bg-ink2/60 p-5 h-full">
                  <span className="stamp inline-grid place-items-center size-[52px] rounded-full border-2 mono tnum font-semibold" style={{ borderColor: e.color, color: e.color }}>{e.n}</span>
                  <h3 className="display text-xl font-bold mt-4">{e.name}</h3>
                  <p className="label text-[10px] text-ash mt-1">{e.state}</p>
                  <p className="text-sm text-paper2/85 mt-3">{e.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
        <div className="grid lg:grid-cols-2 gap-4 mt-8">
          <Reveal>
            <p className="border border-dashed border-steel px-5 py-4 text-sm text-paper2/85 h-full">
              Deck commitment (keccak256, stored in the contract):<br />
              <span className="text-volt mono break-all">{CONFIG.gacha.deckCommitment}</span><br />
              <span className="text-ash">Packed deck: {num(CONFIG.gacha.deckBytes)} bytes · 3 bits per token · {num(CONFIG.supply.total)} slots.</span>
            </p>
          </Reveal>
          <Reveal delay={90}>
            <div className="border border-steel/70 bg-ink2/60 px-5 py-4 h-full">
              <p className="label text-[11px] text-ash mb-3">Reveal checker — what is token #…?</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <input className="field flex-1" placeholder={`Token number, 1 – ${num(CONFIG.supply.total)}`} value={input} onChange={(e) => setInput(e.target.value)} inputMode="numeric" spellCheck={false} />
                <button className="btn btn-solid shrink-0" onClick={lookup} disabled={state.kind === "loading"}><span>{state.kind === "loading" ? "Checking…" : "Reveal"}</span></button>
              </div>
              <div className="mt-4 min-h-[64px]">
                {state.kind === "invalid" ? (
                  <p className="label text-[11px] text-oxide">Enter a whole token number between 1 and {num(CONFIG.supply.total)}.</p>
                ) : done && tier ? (
                  <div className="flex items-center gap-4">
                    <img src={tier.img} alt={`WEDO ${tier.name} Doer`} className="size-16 border border-steel/60 bg-black" />
                    <div>
                      <p className="display text-xl font-bold">WEDO #{done.id} — <span className="text-volt">{tier.name}</span></p>
                      <p className="label text-[10px] text-ash mt-1">{num(tier.count)} in the deck · {tier.odds} · the deck answers for minted and unminted tokens alike</p>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-paper2/70">The deck is public: every slot's rarity can be looked up here, and rarityOf() on the contract returns the same answer on-chain.</p>
                )}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
