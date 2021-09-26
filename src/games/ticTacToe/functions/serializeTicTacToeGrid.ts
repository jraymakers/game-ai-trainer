import type { TicTacToeGrid } from '../types/TicTacToeGrid';

export function serializeTicTacToeGrid(grid: TicTacToeGrid): string {
  const parts: string[] = [];
  for (const row of grid) {
    for (const cell of row) {
      parts.push(cell !== null ? `${cell}` : '.');
    }
  }
  return parts.join('');
}
