import type { NimRows } from '../types/NimRows';

export function serializeNimRows(rows: NimRows): string {
  const parts: string[] = [];
  for (const row of rows) {
    parts.push(`${row}`);
  }
  return parts.join('-');
}
