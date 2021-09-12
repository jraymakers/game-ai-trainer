import React, { useCallback } from 'react';

export const PlayerSelectorUI: React.FC<{
  availablePlayers: readonly string[];
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
    <div>
      <select value={selectedPlayerId} onChange={handleChange}>
        {!selectedPlayerId ? <option key="" value={''}>Select a player</option> : null}
        {availablePlayers.map(playerId =>
          <option key={playerId} value={playerId}>{playerId}</option>
        )}
      </select>
      {canRemove ? <button onClick={handleRemove}>Remove</button> : null}
    </div>
  );
};
