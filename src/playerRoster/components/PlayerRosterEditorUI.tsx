import React, { useCallback, useMemo, useState } from 'react';
import type { Player } from '../../player/types/Player';
import type { PlayerList } from '../../player/types/PlayerList';
import { PlayerType } from '../../player/types/PlayerType';
import { sortedPlayerList } from '../functions/sortedPlayerList';
import type { PlayerRoster } from '../types/PlayerRoster';
import { PlayerRosterEditorItemUI } from './PlayerRosterEditorItemUI';

export const PlayerRosterEditorUI: React.FC<{
  playerRoster: PlayerRoster;
  onAddNewPlayer: (newPlayer: Player) => void;
  onRemovePlayer: (playerId: string) => void;
}> = ({
  playerRoster,
  onAddNewPlayer,
  onRemovePlayer,
}) => {
  const players = useMemo<PlayerList>(() => {
    return sortedPlayerList(playerRoster);
  }, [playerRoster]);

  const [newPlayerId, setNewPlayerId] = useState<string>('');
  const [newPlayerType, setNewPlayerType] = useState<PlayerType>(PlayerType.Human);

  const handleChangeNewPlayerId = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPlayerId(e.target.value);
  }, []);

  const isNewPlayerIdValid = !!newPlayerId && !playerRoster[newPlayerId];

  const handleAddNewPlayer = useCallback(() => {
    onAddNewPlayer({
      id: newPlayerId,
      type: newPlayerType
    });
    setNewPlayerId('');
  }, [newPlayerId, newPlayerType, onAddNewPlayer]);

  const handleInputKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAddNewPlayer();
    }
  }, [handleAddNewPlayer]);

  const handlePlayerTypeChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setNewPlayerType(e.target.value as PlayerType);
  }, []);

  return (
    <div>
      <div>Total Players: {players.length}</div>
      <div>
        {players.map(player =>
          <PlayerRosterEditorItemUI
            key={player.id}
            player={player}
            onRemovePlayer={onRemovePlayer}
          />
        )}
      </div>
      <div>
        <div>Create New Player</div>
        <div style={{ margin: 6 }}>
          <label htmlFor="new_player_name_input">Name: </label>
          <input id="new_player_name_input" type="text" value={newPlayerId}
            onChange={handleChangeNewPlayerId}
            onKeyDown={handleInputKeyDown}
          />
          <select value={newPlayerType} onChange={handlePlayerTypeChange} style={{ marginLeft: 6 }}>
            {Object.keys(PlayerType).map(playerType => 
              <option key={playerType} value={playerType}>{playerType}</option>
            )}
          </select>
          <button onClick={handleAddNewPlayer} disabled={!isNewPlayerIdValid} style={{ marginLeft: 6 }}>
            Create
          </button>
        </div>
      </div>
    </div>
  );
};
