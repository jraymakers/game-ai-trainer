import React, { useCallback } from 'react';
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
      <span>{player.id}</span>
      <span> [{player.type}] </span>
      <button onClick={handleClick}>Remove</button>
    </div>
  );
};
