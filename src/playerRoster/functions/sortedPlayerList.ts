import type { Player } from '../../player/types/Player';
import type { PlayerList } from '../types/PlayerList';
import type { PlayerRoster } from '../types/PlayerRoster';

export function sortedPlayerList(playerRoster: PlayerRoster): PlayerList {
  return Object.keys(playerRoster).sort().map(playerId => playerRoster[playerId] as Player);
}
