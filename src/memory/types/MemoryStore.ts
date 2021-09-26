import type { PlayerMemory } from './PlayerMemory';

export type MemoryStore = Readonly<{
  playerMemories: {
    readonly [playerId: string]: PlayerMemory | undefined;
  }
}>;
