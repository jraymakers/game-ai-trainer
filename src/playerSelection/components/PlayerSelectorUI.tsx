import React, { useCallback } from 'react';
import type { PlayerList } from '../../player/types/PlayerList';

export const PlayerSelectorUI: React.FC<{
  availablePlayers: PlayerList;
  playerIndex: number;
  canRemove: boolean;
  selectedPlayerId: string;
  onSelectedPlayerIdChanged: (playerIndex: number, newSelectedPlayerId: string) => void;
  onRemoveSelectedPlayer: (playerIndex: number) => void;
}> = ({
  availablePlayers,
  playerIndex,
  canRemove,
  selectedPlayerId,
  onSelectedPlayerIdChanged,
  onRemoveSelectedPlayer,
}) => {
  const handleChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    onSelectedPlayerIdChanged(playerIndex, e.target.value);
  }, [onSelectedPlayerIdChanged, playerIndex]);
  const handleRemove = useCallback(() => {
    onRemoveSelectedPlayer(playerIndex);
  }, [onRemoveSelectedPlayer, playerIndex]);
  return (
    <div style={{ margin: 6 }}>
      <select value={selectedPlayerId} onChange={handleChange}>
        {!selectedPlayerId ? <option key="" value="">Select a player</option> : null}
        {availablePlayers.map(player =>
          <option key={player.id} value={player.id}>{player.id} [{player.type}]</option>
        )}
      </select>
      {canRemove ? <button onClick={handleRemove}>Remove</button> : null}
    </div>
  );
};
