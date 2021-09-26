import type { MCTSActionMemory } from './MCTSActionMemory';

export type MCTSStateMemory = Readonly<{
  actionMemories: {
    readonly [actionKey: string]: MCTSActionMemory | undefined;
  }
}>;
