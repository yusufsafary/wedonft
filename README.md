# WEDO — wedo.wtf

6,666 gacha Doers on BNB Smart Chain. Free mint, exclusively through a Binance Agent — rarity
is drawn from a deck shuffled and committed on-chain before launch, and revealed the moment
you mint.

- **Token:** WEDO (WEDO), ERC-721 · supply 6,666 · max 10 per wallet
- **Rarity deck:** Common 4,300 · Rare 1,667 · Epic 533 · Legendary 133 · Mythic 33
- **Deck commitment (keccak256):** `0x8323f151aa094a7d4624421543f12cf2e1780a2d20218124d4dd3b8b3fe1f7d3`
- **Contract (predicted):** `0x745d7a3b46E704e7A9D79AE1C3B049Da8f335D79` — mint opens after deploy
- **Gate:** SPACE ID Agent ID, checked on-chain at every mint
- **Agent skill file:** https://wedo.wtf/wedo-skill.md

## Site

React + Vite + Tailwind, built to a single-file `dist/index.html` and served by GitHub Pages
(`.github/workflows/deploy.yml`). The site is read-only — it never connects to a wallet;
minting happens 100% through the visitor's own Binance Agent.

- `public/metadata/<id>` — ERC-721 metadata for tokens 1–6666 (rarity follows the deck)
- `public/deck.json` — the public deck (tier per token id), used by the reveal checker
- `public/img/<tier>.webp` — the five rarity artworks
- `src/config.ts` — the single place for supply, contract address and links
