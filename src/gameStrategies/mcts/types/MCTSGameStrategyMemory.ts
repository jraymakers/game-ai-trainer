import type { MCTSStateMemory } from './MCTSStateMemory';

export type MCTSGameStrategyMemory = Readonly<{
  totalActionsTaken: number;
  stateMemories: {
    readonly [stateKey: string]: MCTSStateMemory | undefined;
  }
}>;
