import React, { useCallback, useMemo, useState } from 'react';
import type { PlayerRoster } from '../types/PlayerRoster';
import { PlayerRosterEditorItemUI } from './PlayerRosterEditorItemUI';

export const PlayerRosterEditorUI: React.FC<{
  playerRoster: PlayerRoster;
  onAddNewPlayer: (newPlayerId: string) => void;
  onRemovePlayer: (playerId: string) => void;
}> = ({
  playerRoster,
  onAddNewPlayer,
  onRemovePlayer,
}) => {
  const playerIds = useMemo<string[]>(() => {
    return Object.keys(playerRoster).sort();
  }, [playerRoster]);

  const [newPlayerId, setNewPlayerId] = useState<string>('');

  const handleChangeNewPlayerId = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPlayerId(e.target.value);
  }, []);

  const isNewPlayerIdValid = !!newPlayerId && !playerRoster[newPlayerId];

  const handleAddNewPlayer = useCallback(() => {
    onAddNewPlayer(newPlayerId);
    setNewPlayerId('');
  }, [newPlayerId, onAddNewPlayer]);

  return (
    <div>
      <div>Players: {playerIds.length}</div>
      <div>
        {playerIds.map(playerId =>
          <PlayerRosterEditorItemUI
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
