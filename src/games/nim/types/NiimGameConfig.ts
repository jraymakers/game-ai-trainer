import type { MultiplayerGameConfig } from '../../../game/types/MultiplayerGameConfig';
import type { NimRows } from './NimRows';

export type NimGameConfig = MultiplayerGameConfig & Readonly<{
  initialRows: NimRows;
  misere: boolean;
}>;
