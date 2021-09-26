import type { AnyGameStrategy } from './AnyGameStrategy';

export type GameStrategyRegistration = Readonly<{
  displayName: string;
  strategy: AnyGameStrategy;
}>;
