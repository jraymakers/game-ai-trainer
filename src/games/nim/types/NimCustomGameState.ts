import type { NimRows } from './NimRows';

export type NimCustomGameState = Readonly<{
  currentRows: NimRows;
}>;
