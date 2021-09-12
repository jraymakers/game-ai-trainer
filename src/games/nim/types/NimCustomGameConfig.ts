import type { NimRows } from './NimRows';

export type NimCustomGameConfig = Readonly<{
  initialRows: NimRows;
  misere: boolean;
}>;
