import React, { useCallback, useState } from 'react';
import { gameCatalog } from '../../gameCatalog/constants/gameCatalog';
import type { GameRegistration } from '../../gameRegistration/types/GameRegistration';
import { GameRunner } from '../../gameRunner/components/GameRunner';
import { GameSelector } from '../../gameSelection/components/GameSelector';
import type { Player } from '../../player/types/Player';
import { PlayerRosterEditorUI } from '../../playerRoster/components/PlayerRosterEditorUI';
import type { PlayerRoster } from '../../playerRoster/types/PlayerRoster';

export const Root: React.FC = () => {
  const [playerRoster, setPlayerRoster] = useState<PlayerRoster>(() => ({}));

  const handleAddNewPlayer = useCallback((newPlayer: Player) => {
    setPlayerRoster({
      ...playerRoster,
      [newPlayer.id]: newPlayer,
    });
  }, [playerRoster]);

  const handleRemovePlayer = useCallback((playerId: string) => {
    const { [playerId]: _, ...rest } = playerRoster;
    setPlayerRoster(rest);
  }, [playerRoster]);

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
          <GameRunner playerRoster={playerRoster} game={selectedGame} onLeaveGame={handleLeaveGame} />
        ) : (
          <div>
            <PlayerRosterEditorUI
              playerRoster={playerRoster}
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
