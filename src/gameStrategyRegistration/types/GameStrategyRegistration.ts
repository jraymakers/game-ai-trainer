import type { AnyGameStrategyDefinition } from './AnyGameStrategyDefinition';

export type GameStrategyRegistration = Readonly<{
  displayName: string;
  definition: AnyGameStrategyDefinition;
}>;
