import type { PlayerMemory } from './PlayerMemory';

export type PlayerMemoryStore = Readonly<{
  readonly [playerId: string]: PlayerMemory | undefined;
}>;
