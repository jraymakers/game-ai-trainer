import type { MCTSStateMemory } from './MCTSStateMemory';

export type MCTSGameStrategyMemory = Readonly<{
  stateMemories: {
    readonly [stateKey: string]: MCTSStateMemory;
  }
}>;
