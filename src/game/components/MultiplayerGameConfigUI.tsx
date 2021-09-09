import React, { useCallback } from 'react';
import { PlayerConfigUI } from './PlayerConfigUI';

export const MultiplayerGameConfigUI: React.FC<{
  playerIds: readonly string[];
  setPlayerIds: (newPlayerIds: readonly string[]) => void;
}> = ({
  playerIds,
  setPlayerIds,
}) => {
  const handleChangePlayerId = useCallback((playerIdToChange: string, newValue: string) => {
    setPlayerIds(playerIds.map(playerId => playerId === playerIdToChange ? newValue : playerId));
  }, [playerIds]);
  const handleRemovePlayerId = useCallback((playerIdToRemove: string) => {
    setPlayerIds(playerIds.filter(playerId => playerId !== playerIdToRemove));
  }, [playerIds]);
  const handleAddNewPlayer = useCallback(() => {
    let i = playerIds.length + 1;
    while (playerIds.includes(`Player ${i}`)) {
      i++;
    }
    setPlayerIds(playerIds.concat(`Player ${i}`));
  }, [playerIds]);
  
  return (
    <div>
      <div>Player Ids</div>
      <div>
        {playerIds.map((playerId, index) =>
          <PlayerConfigUI
            key={index}
            playerId={playerId}
            onChangePlayerId={handleChangePlayerId}
            onRemovePlayerId={playerIds.length > 1 ? handleRemovePlayerId : undefined}
          />
        )}
      </div>
      <div>
        <button onClick={handleAddNewPlayer}>Add Player</button>
      </div>
    </div>
  );
};
