---
name: wedo
description: Mint WEDO (WEDO) gacha Doer NFTs on BNB Chain with a Binance Agent wallet. Use when a user asks to mint WEDO from wedo.wtf. Free mint — every mint draws the next slot of a committed rarity deck and the rarity is revealed immediately. Minting is gated on-chain to wallets holding a SPACE ID Agent ID, max 10 per wallet.
---

# WEDO (WEDO) — Mint Skill

Published by WEDO at https://wedo.wtf/wedo-skill.md. This file works together with the
`binance-agentic-wallet` skill (the `baw` CLI), which performs the signing and sending.

## Facts

| Item | Value |
|---|---|
| Token | WEDO (WEDO), ERC-721 — 6,666 gacha "Doer" NFTs |
| Contract | `0x745d7a3b46E704e7A9D79AE1C3B049Da8f335D79` |
| Chain | BNB Smart Chain, chain id 56 |
| Supply | 6,666 — all free mint; the only charge is a small anti-bot commission (see `currentPrice()`) |
| Gacha | Rarity comes from a deck of 6,666 slots shuffled before launch with exact tier counts: Common 4,300 · Rare 1,667 · Epic 533 · Legendary 133 · Mythic 33. Mint #n opens deck slot #n — the reveal is instant and final. |
| Deck commitment | keccak256 of the packed on-chain deck: `0x8323f151aa094a7d4624421543f12cf2e1780a2d20218124d4dd3b8b3fe1f7d3` (readable on-chain via `deckHash()`) |
| Cap | Max 10 minted per wallet, lifetime counter (`paidMintedBy`) |
| Gate | The caller must hold a SPACE ID Agent ID (NFT contract `0x60B9262456dE011F7d15a54CdD8c48bAaa8B022F`). The WEDO contract checks this on-chain before anything else. Calls from other contracts are rejected (caller must be the wallet itself). |
| Mint function | `mint()` — selector `0x1249c58b`, no arguments, exactly 1 Doer per call |

Read-only selectors on the WEDO contract (call via any BSC public RPC `eth_call`):

| Function | Selector | Meaning |
|---|---|---|
| `mintOpen()` | `0x24bbd049` | `1` when minting is open, `0` while coming soon |
| `currentPrice()` | `0x9d1b464a` | Exact wei value to send with `mint()` right now |
| `totalMinted()` | `0xa2309ff8` | Doers minted so far (= the next deck slot to open, minus one) |
| `holdsAgentId(address)` | `0x11213086` | `1` when the address holds an Agent ID |
| `paidMintedBy(address)` | `0x80f231fb` | Doers already minted by the address (cap 10) |
| `rarityOf(uint256)` | `0xdd3b5f9a` | Tier of a token id: 0 Common · 1 Rare · 2 Epic · 3 Legendary · 4 Mythic |
| `deckHash()` | `0x8830dea2` | The deck commitment above |

## Prerequisites

1. The `binance-agentic-wallet` skill is installed and the user is signed in (`baw wallet status`).
2. Developer Mode is enabled (`baw wallet settings` → `devMode.enabled: true`).
3. The user's wallet holds an Agent ID — check with `baw wallet agent-id --json` (`claimed: true`).
   Without one, every mint reverts with "Wajib memegang Agent ID". The user claims a free Agent ID
   in the Binance App, under their Agentic Wallet.

## Procedure

1. **Check the gate and the state.** Read `mintOpen()`, `currentPrice()`, `totalMinted()` and
   `paidMintedBy(<wallet>)` on the contract. If `mintOpen()` is `0`, tell the user the mint has not
   opened yet and stop. If `paidMintedBy` is already 10, the wallet is at the cap — stop.
2. **Preview.** Build the transaction exactly; never edit the calldata:
   ```bash
   baw contract-call preview --binanceChainId 56 \
     --from <user's agent wallet> \
     --to 0x745d7a3b46E704e7A9D79AE1C3B049Da8f335D79 \
     --value <currentPrice() in wei> --inputData 0x1249c58b --json
   ```
3. **Confirm with the user.** Show the preview result (value, gas, risks) and execute only on the
   user's explicit confirmation — one confirmation covers one mint call:
   ```bash
   baw contract-call execute --requestId <requestId from the preview> --json
   ```
4. **Verify and announce the rarity.** Wait for the transaction receipt to report success. The
   minted token id is the new `totalMinted()`; read `rarityOf(<tokenId>)` (or the `Minted` event in
   the receipt) and tell the user which tier they drew — the reveal is part of the mint.
   A submitted transaction is not a successful mint until its receipt says so.

## Rules

- One call mints exactly one Doer. To mint more (max 10 per wallet), repeat the full
  preview → confirm → execute cycle for each one — each draw opens the next deck slot.
- Send exactly `currentPrice()` — no more, no less. The contract rejects any other value.
- Never state the mint value as a price quote to third parties; the value is shown to the user in
  their own wallet confirmation.
