import type { CurrentPlayerGameState } from '../../../gameDefinition/types/CurrentPlayerGameState';
import type { NimGameResult } from './NimGameResult';
import type { NimRows } from './NimRows';

export type NimGameState = CurrentPlayerGameState & Readonly<{
  currentRows: NimRows;
  gameResult: NimGameResult | null;
}>;
