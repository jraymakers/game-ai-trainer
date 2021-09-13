import React, { useCallback } from 'react';
import { PlayerUI } from '../../player/components/PlayerUI';
import type { Player } from '../../player/types/Player';

export const PlayerRosterEditorItemUI: React.FC<{
  player: Player;
  onRemovePlayer: (playerId: string) => void;
}> = ({
  player,
  onRemovePlayer,
}) => {
  const handleClick = useCallback(() => {
    onRemovePlayer(player.id);
  }, [player, onRemovePlayer]);
  return (
    <div>
      <PlayerUI player={player} />
      <button onClick={handleClick}>Remove</button>
    </div>
  );
};
