import React, { useCallback, useMemo, useState } from 'react';
import type { PlayerMap } from '../types/PlayerMap';
import { PlayerMapEditorItemUI } from './PlayerMapEditorItemUI';

export const PlayerMapEditorUI: React.FC<{
  playerMap: PlayerMap;
  onAddNewPlayer: (newPlayerId: string) => void;
  onRemovePlayer: (playerId: string) => void;
}> = ({
  playerMap,
  onAddNewPlayer,
  onRemovePlayer,
}) => {
  const playerIds = useMemo<string[]>(() => {
    return Object.keys(playerMap).sort();
  }, [playerMap]);

  const [newPlayerId, setNewPlayerId] = useState<string>('');

  const handleChangeNewPlayerId = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPlayerId(e.target.value);
  }, []);

  const isNewPlayerIdValid = !!newPlayerId && !playerMap[newPlayerId];

  const handleAddNewPlayer = useCallback(() => {
    onAddNewPlayer(newPlayerId);
    setNewPlayerId('');
  }, [newPlayerId, onAddNewPlayer]);

  return (
    <div>
      <div>Players: {playerIds.length}</div>
      <div>
        {playerIds.map(playerId =>
          <PlayerMapEditorItemUI
            key={playerId}
            playerId={playerId}
            onRemovePlayer={onRemovePlayer}
          />
        )}
      </div>
      <div>
        <input type="text" onChange={handleChangeNewPlayerId} value={newPlayerId} />
        <button onClick={handleAddNewPlayer} disabled={!isNewPlayerIdValid}>Add New Player</button>
      </div>
    </div>
  );
};
