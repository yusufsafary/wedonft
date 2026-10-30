import { CONFIG } from "@/config";

export type MintStatus = "upcoming" | "live" | "ended";

/** Status situs WEDO sederhana: belum ada kontrak = coming soon. */
export function getMintStatus(): MintStatus {
  return CONFIG.contract.address ? "live" : "upcoming";
}

export function statusLabel(s: MintStatus): string {
  return s === "upcoming" ? "COMING SOON" : s === "live" ? "MINT LIVE" : "MINT CLOSED";
}

export function statusTone(s: MintStatus): string {
  return s === "upcoming" ? "var(--color-volt)" : s === "live" ? "var(--color-live)" : "var(--color-ash)";
}
