import type { MultiplayerGameConfig } from '../../../game/types/MultiplayerGameConfig';

export type ExampleGameConfig = MultiplayerGameConfig & Readonly<{
  initialValue: number;
  targetValue: number;
  minDelta: number;
  maxDelta: number;
  misere: boolean;
}>;
