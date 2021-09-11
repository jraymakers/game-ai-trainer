import React, { useCallback, useState } from 'react';
import { gameCatalog } from '../../gameCatalog/constants/gameCatalog';
import type { GameRegistration } from '../../gameRegistration/types/GameRegistration';
import { GameRunner } from '../../gameRunner/components/GameRunner';
import { GameSelector } from '../../gameSelection/components/GameSelector';

export const Root: React.FC = () => {
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
          <GameSelector games={gameCatalog} onSelectGame={handleSelectGame} />
        )}
      </div>
    </div>
  );
};
