import type { NimGameConfig } from '../types/NimGameConfig';
import type { NimGameResult } from '../types/NimGameResult';
import type { NimRows } from '../types/NimRows';

export function getNimGameResult(
  config: NimGameConfig,
  rows: NimRows,
  prevCurrentPlayerIndex: number,
  currentPlayerIndex: number,
): NimGameResult | null {
  if (!rows.some(rowItemCount => rowItemCount > 0)) {
    if (config.misere) {
      return { winnerIndex: currentPlayerIndex };
    } else {
      return { winnerIndex: prevCurrentPlayerIndex };
    }
  }
  return null;
}
