import type { GameStrategyRegistration } from '../../gameStrategyRegistration/types/GameStrategyRegistration';

export type PlayerStrategies = Readonly<{
  readonly [gameDisplayName: string]: GameStrategyRegistration | undefined;
}>;
