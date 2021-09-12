import React, { useCallback, useMemo } from 'react';
import type { PlayerRoster } from '../../playerRoster/types/PlayerRoster';
import { PlayerSelectorUI } from './PlayerSelectorUI';

export const PlayerSelectionUI: React.FC<{
  playerRoster: PlayerRoster;
  minPlayerCount: number;
  maxPlayerCount: number;
  selectedPlayerIds: readonly string[];
  onSelectedPlayerIdsChanged: (newSelectedPlayers: readonly string[]) => void;
}> = ({
  playerRoster,
  minPlayerCount,
  maxPlayerCount,
  selectedPlayerIds,
  onSelectedPlayerIdsChanged,
}) => {
  const playerCount = selectedPlayerIds.length;

  const availablePlayers = useMemo<readonly string[]>(() => {
    return Object.keys(playerRoster).sort();
  }, [playerRoster]);

  const handleDecrementPlayerCount = useCallback(() => {
    onSelectedPlayerIdsChanged(selectedPlayerIds.slice(0, selectedPlayerIds.length - 1));
  }, [onSelectedPlayerIdsChanged, selectedPlayerIds]);

  const handleIncrementPlayerCount = useCallback(() => {
    onSelectedPlayerIdsChanged(selectedPlayerIds.concat(''));
  }, [onSelectedPlayerIdsChanged, selectedPlayerIds]);

  const handleSelectedPlayerIdChanged = useCallback((playerIndex: number, newSelectedPlayerId: string) => {
    onSelectedPlayerIdsChanged(selectedPlayerIds.map(
      (value, index) => index === playerIndex ? newSelectedPlayerId : value
    ));
  }, [onSelectedPlayerIdsChanged, selectedPlayerIds]);

  const handleRemoveSelectedPlayer = useCallback((playerIndex: number) => {
    onSelectedPlayerIdsChanged(selectedPlayerIds.filter((_, index) => index !== playerIndex));
  }, [onSelectedPlayerIdsChanged, selectedPlayerIds]);

  const canChangePlayerCount = minPlayerCount !== maxPlayerCount;
  
  return (
    <div>
      <div>
        <span>Players: </span>
        {canChangePlayerCount
          ? <button onClick={handleDecrementPlayerCount} disabled={playerCount <= minPlayerCount}>-</button>
          : null}
        <span> {selectedPlayerIds.length} </span>
        {canChangePlayerCount
          ? <button onClick={handleIncrementPlayerCount} disabled={playerCount >= maxPlayerCount}>+</button>
          : null}
      </div>
      <div>
        {selectedPlayerIds.map((playerId, index) =>
          <PlayerSelectorUI
            key={index}
            availablePlayers={availablePlayers}
            playerIndex={index}
            canRemove={selectedPlayerIds.length > minPlayerCount}
            selectedPlayerId={playerId}
            onSelectedPlayerIdChanged={handleSelectedPlayerIdChanged}
            onRemoveSelectedPlayer={handleRemoveSelectedPlayer}
          />
        )}
      </div>
    </div>
  );
};
