import type { PlayerStrategies } from './PlayerStrategies';

export type PlayerStrategiesStore = Readonly<{
  readonly [playerId: string]: PlayerStrategies | undefined;
}>;
