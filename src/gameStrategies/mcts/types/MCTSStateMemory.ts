import type { MCTSActionMemory } from './MCTSActionMemory';

export type MCTSStateMemory = Readonly<{
  visits: number;
  actionMemories: {
    readonly [actionKey: string]: MCTSActionMemory | undefined;
  }
}>;
