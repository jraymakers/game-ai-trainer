import type { PlayerType } from './PlayerType';

export type Player = Readonly<{
  id: string;
  type: PlayerType;
}>;
