import type { PlayerList } from '../../player/types/PlayerList';

export type GameConfig<TCustomGameConfig> = Readonly<{
  players: PlayerList;
  customGameConfig: TCustomGameConfig;
}>;
