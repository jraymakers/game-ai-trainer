import type { Player } from '../../player/types/Player';

export type PlayerRoster = Readonly<{
  readonly [playerId: string]: Player | undefined;
}>;
