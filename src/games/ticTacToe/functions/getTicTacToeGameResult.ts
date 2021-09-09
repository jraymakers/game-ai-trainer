import type { TicTacToeGameResult } from '../types/TicTacToeGameResult';
import type { TicTacToeGrid } from '../types/TicTacToeGrid';

export function getTicTacToeGameResult(nextGrid: TicTacToeGrid): TicTacToeGameResult | null {
  const r0 = nextGrid[0];
  const r1 = nextGrid[1];
  const r2 = nextGrid[2];
  const g00 = r0[0], g01 = r0[1], g02 = r0[2];
  const g10 = r1[0], g11 = r1[1], g12 = r1[2];
  const g20 = r2[0], g21 = r2[1], g22 = r2[2];
  // rows
  if (g00 !== null && g00 === g01 && g00 === g02) {
    return { winnerIndex: g00 };
  }
  if (g10 !== null && g10 === g11 && g10 === g12) {
    return { winnerIndex: g10 };
  }
  if (g20 !== null && g20 === g21 && g20 === g22) {
    return { winnerIndex: g20 };
  }
  // columns
  if (g00 !== null && g00 === g10 && g00 === g20) {
    return { winnerIndex: g00 };
  }
  if (g01 !== null && g01 === g11 && g01 === g21) {
    return { winnerIndex: g01 };
  }
  if (g02 !== null && g02 === g12 && g02 === g22) {
    return { winnerIndex: g02 };
  }
  // diagonals
  if (g00 !== null && g00 === g11 && g00 === g22) {
    return { winnerIndex: g00 };
  }
  if (g02 !== null && g02 === g11 && g02 === g20) {
    return { winnerIndex: g02 };
  }
  if (
    g00 !== null && g01 !== null && g02 !== null &&
    g10 !== null && g11 !== null && g12 !== null &&
    g20 !== null && g21 !== null && g22 !== null
  ) {
    return { winnerIndex: null }; // draw
  }
  return null;
}
