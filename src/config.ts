/**
 * ============================================================================
 *  WEDO — SITE CONFIG
 * ============================================================================
 *  Satu-satunya file yang perlu diubah untuk mengganti angka, alamat
 *  kontrak, dan tautan. Situs ini READ-ONLY: tidak ada connect wallet,
 *  tidak ada tombol mint — mint 100% lewat Binance Agent pengguna.
 *
 *    contract.address = ""     -> kontrak belum di-deploy; panel mint
 *                                 menampilkan status DEPLOYING dan checker
 *                                 nonaktif.
 *    contract.address = "0x…"  -> situs membaca state kontrak langsung
 *                                 dari chain (totalMinted, mintOpen, dst).
 * ============================================================================
 */

export const CONFIG = {
  brand: "WEDO",
  domain: "wedo.wtf",
  repo: "https://github.com/yusufsafary/wedonft",
  tagline: "Every mint is a draw.",
  lede: "6,666 Doers on BNB Smart Chain — a gacha deck, shuffled and committed on-chain before the mint opens. Free mint, exclusively through a Binance Agent: your agent calls mint(), the deck decides your rarity, and the reveal lands the second the transaction confirms. Ten draws per wallet, no more.",

  /* ---------------- ekonomi koleksi ---------------- */
  supply: {
    total: 6666,
    maxPerWallet: 10,
    get wallets() {
      return Math.floor(this.total / this.maxPerWallet);
    },
  },
  price: {
    // NFT-nya FREE. Satu-satunya biaya = komisi anti-bot on-chain (currentPrice()
    // di kontrak) yang muncul di konfirmasi wallet agen — tidak ditampilkan di web.
    amount: "0",
    symbol: "BNB",
  },

  /* ---------------- gacha: deck yang dikomit ---------------- */
  gacha: {
    /** keccak256 dari deck terkemas (2.500 byte, 3 bit per token) — tertulis di kontrak. */
    deckCommitment: "0x8323f151aa094a7d4624421543f12cf2e1780a2d20218124d4dd3b8b3fe1f7d3",
    deckBytes: 2500,
    tiers: [
      { name: "Common", count: 4300 },
      { name: "Rare", count: 1667 },
      { name: "Epic", count: 533 },
      { name: "Legendary", count: 133 },
      { name: "Mythic", count: 33 },
    ],
  },

  /* ---------------- chain ---------------- */
  network: {
    name: "BNB Smart Chain",
    shortName: "BSC",
    chainId: 56,
    chainIdHex: "0x38",
    rpcUrl: "https://bsc-dataseed.binance.org/",
    explorer: "https://bscscan.com",
    currency: { name: "BNB", symbol: "BNB", decimals: 18 },
  },

  contract: {
    /** Kosongkan sampai kontrak di-deploy. Alamat prediksi CREATE2 di bawah. */
    address: "0x745d7a3b46E704e7A9D79AE1C3B049Da8f335D79",
    predicted: "0x745d7a3b46E704e7A9D79AE1C3B049Da8f335D79",
    standard: "BEP-721 (ERC-721)",
    audited: false,
  },

  links: {
    github: "https://github.com/yusufsafary/wedonft",
    x: "https://x.com/wedowtf",
    bscscan: "",
  },
} as const;

export type SiteConfig = typeof CONFIG;
