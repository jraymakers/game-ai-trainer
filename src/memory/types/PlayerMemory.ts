import type { PlayerGameMemory } from './PlayerGameMemory';

export type PlayerMemory = Readonly<{
  gameMemories: {
    readonly [gameDisplayName: string]: PlayerGameMemory | undefined;
  }
}>;
