import type { CurrentPlayerGameState } from '../../../game/types/CurrentPlayerGameState';

export type ExampleGameState = CurrentPlayerGameState & Readonly<{
  currentValue: number;
}>;
