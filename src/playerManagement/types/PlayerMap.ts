import type { Player } from './Player';

export type PlayerMap = Readonly<{
  readonly [playerId: string]: Player | undefined;
}>;
