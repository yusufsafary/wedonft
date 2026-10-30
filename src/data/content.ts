import { CONFIG } from "@/config";

/* ------------------------------------------------------------------ */
/*  TICKER                                                             */
/* ------------------------------------------------------------------ */
export const TICKER_ITEMS = [
  `MINT LIVE — VIA BINANCE AGENT`,
  `FREE MINT`,
  `GACHA RARITY — REVEALED AT MINT`,
  `TOTAL SUPPLY ${CONFIG.supply.total.toLocaleString("en-US")}`,
  `MAX ${CONFIG.supply.maxPerWallet} PER BINANCE AGENT`,
  `ONLY 33 MYTHIC IN THE DECK`,
  `AGENT ID ONLY`,
  `${CONFIG.network.name.toUpperCase()}`,
  CONFIG.contract.standard.toUpperCase(),
  `${CONFIG.domain.toUpperCase()}`,
];

/* ------------------------------------------------------------------ */
/*  NAV / SECTIONS                                                     */
/* ------------------------------------------------------------------ */
export const SECTIONS = [
  { id: "top", label: "00 / Index" },
  { id: "idea", label: "01 / The Idea" },
  { id: "tiers", label: "02 / The Rarity" },
  { id: "deck", label: "03 / The Deck" },
  { id: "agent", label: "04 / The Math" },
  { id: "gate", label: "05 / The Gate" },
  { id: "mint", label: "06 / Mint" },
  { id: "roadmap", label: "07 / Roadmap" },
  { id: "faq", label: "08 / FAQ" },
];

/* ------------------------------------------------------------------ */
/*  RARITY TIERS — isi deck                                            */
/* ------------------------------------------------------------------ */
export type Tier = {
  numeral: string;
  name: string;
  count: number;
  odds: string;
  hue: "volt" | "cobalt" | "oxide" | "live" | "paper";
  img: string;
  blurb: string;
  trait: string;
};

export const TIERS: Tier[] = [
  {
    numeral: "I",
    name: "Common",
    count: 4300,
    odds: "1 in 1.6",
    hue: "paper",
    img: "/img/m/common.webp",
    blurb:
      "The plain Doer. Grey line, no gear, no glow — the worker before anything happens. Most draws land here, and every collection needs its backbone.",
    trait: "Ash line · no gear",
  },
  {
    numeral: "II",
    name: "Rare",
    count: 1667,
    odds: "1 in 4",
    hue: "live",
    img: "/img/m/rare.webp",
    blurb:
      "A teal cap and a ring of light underfoot. The first step up from the line — one draw in four, and the tier where the deck starts to feel generous.",
    trait: "Teal cap · glow ring",
  },
  {
    numeral: "III",
    name: "Epic",
    count: 533,
    odds: "1 in 12.5",
    hue: "cobalt",
    img: "/img/m/epic.webp",
    blurb:
      "Tools on its back and a violet core in its chest. The Doer who shows up ready — eight percent of the deck, and it looks like it.",
    trait: "Tool pack · violet core",
  },
  {
    numeral: "IV",
    name: "Legendary",
    count: 133,
    odds: "1 in 50",
    hue: "volt",
    img: "/img/m/legendary.webp",
    blurb:
      "Crowned, haloed, drawn in gold. One hundred thirty-three in the whole deck — pull one and the whole wallet knows.",
    trait: "Crown · gold halo",
  },
  {
    numeral: "V",
    name: "Mythic",
    count: 33,
    odds: "1 in 202",
    hue: "oxide",
    img: "/img/m/mythic.webp",
    blurb:
      "Full regalia, wings of light, gold on crimson. Thirty-three exist. The deck does not care who you are — that is the entire point.",
    trait: "Regalia · wings of light",
  },
];

export const TIER_TOTAL = TIERS.reduce((n, t) => n + t.count, 0);

/* ------------------------------------------------------------------ */
/*  THE DECK — cara gacha bekerja                                      */
/* ------------------------------------------------------------------ */
export const DECK_STEPS = [
  {
    n: 1,
    name: "Shuffled",
    state: "Exact counts",
    color: "var(--color-paper)",
    text: "The deck is built with exact tier counts — 4,300 Common down to 33 Mythic — then shuffled with a secret seed before anything is deployed.",
  },
  {
    n: 2,
    name: "Committed",
    state: "Hash on-chain",
    color: "var(--color-live)",
    text: "The shuffled deck is packed into the contract itself, and its keccak256 hash is stored as a public commitment. The order can never be changed after deploy.",
  },
  {
    n: 3,
    name: "Drawn",
    state: "At mint",
    color: "var(--color-cobalt)",
    text: "Minting is sequential: token #n opens deck slot #n. Your draw is whatever the committed deck says — nobody picks, nobody rerolls.",
  },
  {
    n: 4,
    name: "Revealed",
    state: "Instantly",
    color: "var(--color-volt)",
    text: "rarityOf() is readable on-chain by anyone, so your rarity is public the second your mint confirms — in your wallet, on marketplaces, everywhere.",
  },
  {
    n: 5,
    name: "Audited",
    state: "At sellout",
    color: "var(--color-oxide)",
    text: "When the deck sells out, the seed is published. Anyone can rebuild the deck, re-hash it, and check it against the on-chain commitment.",
  },
];

/* ------------------------------------------------------------------ */
/*  STEPS — jalan menuju mint                                          */
/* ------------------------------------------------------------------ */
export const STEPS = [
  {
    numeral: "I",
    title: "Hold an Agent ID",
    body: "Minting is gated on-chain: your Binance Agent wallet must hold a SPACE ID Agent ID. No whitelist, no form — claim the Agent ID free in the Binance App and the gate opens.",
    meta: "Checked on-chain · every mint",
  },
  {
    numeral: "II",
    title: "Send your Binance Agent",
    body: "There is no mint button anywhere. You hand your agent the prompt in the mint section below — it reads the skill file, checks the contract, and calls mint() for you.",
    meta: "Skill file · wedo.wtf/wedo-skill.md",
  },
  {
    numeral: "III",
    title: "Draw up to ten",
    body: "Every mint opens the next slot of the committed deck, and the rarity reveals itself the moment the transaction confirms. Ten draws per wallet, counted for life.",
    meta: "Max 10 · reveal is instant",
  },
];

/* ------------------------------------------------------------------ */
/*  ROADMAP                                                            */
/* ------------------------------------------------------------------ */
export const ROADMAP = [
  {
    at: "Deck",
    title: "The deck is committed",
    body: "6,666 slots shuffled with exact tier counts; the keccak256 commitment is published here and written into the contract at deploy.",
    status: "done" as const,
  },
  {
    at: "Deploy",
    title: "Contract goes on-chain",
    body: "WedoAgenticPass deploys on BNB Smart Chain with the deck inside it, mint closed. Address and BscScan verification follow here.",
    status: "live" as const,
  },
  {
    at: "Mint",
    title: "The gate opens",
    body: "Mint opens to every Binance Agent holding a SPACE ID Agent ID. Free mint, ten draws per wallet, rarity revealed at mint.",
    status: "next" as const,
  },
  {
    at: "3,333 · 50%",
    title: "Half the deck",
    body: "Half the draws are gone. The remaining Mythic count is public math — the deck does not restock.",
    status: "next" as const,
  },
  {
    at: "6,666 · 100%",
    title: "Sold out — seed published",
    body: "The last draw lands, mint closes forever, and the shuffle seed is published so the entire deck can be audited against its commitment.",
    status: "next" as const,
  },
];

/* ------------------------------------------------------------------ */
/*  FAQ                                                                */
/* ------------------------------------------------------------------ */
export const FAQ = [
  {
    q: "What is WEDO?",
    a: "A collection of 6,666 Doers — one-eyed little workers — on BNB Smart Chain. It is a gacha: every mint draws the next slot of a pre-shuffled rarity deck, and your tier (Common, Rare, Epic, Legendary or Mythic) is revealed the moment your mint confirms.",
  },
  {
    q: "Who can mint — and how?",
    a: "Any Binance Agent wallet that holds a SPACE ID Agent ID. There is no browser mint and no whitelist: your agent reads the skill file at wedo.wtf/wedo-skill.md and calls mint() on the contract. This website is read-only — it never connects to your wallet.",
  },
  {
    q: "How does the gacha actually work?",
    a: "Before launch, a deck of 6,666 rarity slots is shuffled with exact tier counts — 4,300 Common, 1,667 Rare, 533 Epic, 133 Legendary, 33 Mythic. The deck lives inside the contract, its keccak256 hash is committed on-chain, and mint #n simply opens slot #n. The contract even emits your rarity in the mint event.",
  },
  {
    q: "Can the draw be rigged or changed later?",
    a: "No. The deck order is fixed inside the deployed contract and locked to its published hash — changing a single slot would change the hash. After sellout the shuffle seed is published, so anyone can rebuild the deck and verify the commitment themselves.",
  },
  {
    q: "Can I predict the next rarity?",
    a: "The deck is public by design, so a determined analyst can study it — that transparency is the fairness guarantee. In practice, minting is sequential, gated by Agent ID and capped at ten per wallet, so sniping a specific slot means out-running every other agent to the exact mint number.",
  },
  {
    q: "Why ten per wallet?",
    a: "6,666 divided by ten is 666 full wallets — the cap spreads the deck across hundreds of agents instead of a handful of whales, and it is a lifetime counter in the contract: minting ten and selling them does not reopen your slots.",
  },
  {
    q: "What does a mint cost?",
    a: "The NFT is free. The only charge is a small anti-bot commission — a few cents — shown in your Binance Agent wallet before you confirm, plus roughly a cent of BSC gas. The exact commission never appears on this website; it lives in the wallet confirmation, where it belongs.",
  },
  {
    q: "Where do I see my rarity?",
    a: "Everywhere, instantly: your wallet, marketplaces reading the metadata, and the reveal checker on this page — type a token number and the deck answers. rarityOf() on the contract returns the same tier to anyone who asks.",
  },
  {
    q: "What if the deck sells out?",
    a: "Mint closes permanently at 6,666 — there is no second deck and no restock. The seed is published, the audit opens, and the Doers trade on secondary markets from there.",
  },
];
