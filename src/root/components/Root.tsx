import React, { useCallback, useState } from 'react';
import { gameCatalog } from '../../gameCatalog/constants/gameCatalog';
import type { GameRegistration } from '../../gameRegistration/types/GameRegistration';
import { GameRunner } from '../../gameRunner/components/GameRunner';
import { GameSelector } from '../../gameSelection/components/GameSelector';
import { PlayerMapEditorUI } from '../../playerManagement/components/PlayerMapEditorUI';
import type { PlayerMap } from '../../playerManagement/types/PlayerMap';

export const Root: React.FC = () => {
  const [playerMap, setPlayerMap] = useState<PlayerMap>(() => ({}));

  const handleAddNewPlayer = useCallback((newPlayerId: string) => {
    setPlayerMap({
      ...playerMap,
      [newPlayerId]: { playerId: newPlayerId },
    });
  }, [playerMap]);

  const handleRemovePlayer = useCallback((playerId: string) => {
    const { [playerId]: _, ...rest } = playerMap;
    setPlayerMap(rest);
  }, [playerMap]);

  const [selectedGame, setSelectedGame] = useState<GameRegistration | null>(null);
  
  const handleSelectGame = useCallback((gameRegistration: GameRegistration) => {
    setSelectedGame(gameRegistration);
  }, []);

  const handleLeaveGame = useCallback(() => {
    setSelectedGame(null);
  }, []);

  return (
    <div>
      <div>Game AI Trainer</div>
      
      <div>
        {selectedGame ? (
          <GameRunner game={selectedGame} onLeave={handleLeaveGame} />
        ) : (
          <div>
            <PlayerMapEditorUI
              playerMap={playerMap}
              onAddNewPlayer={handleAddNewPlayer}
              onRemovePlayer={handleRemovePlayer}
            />
            <GameSelector games={gameCatalog} onSelectGame={handleSelectGame} />
          </div>
        )}
      </div>
    </div>
  );
};
