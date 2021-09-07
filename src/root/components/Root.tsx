import React, { useCallback, useState } from 'react';
import { gameCatalog } from '../../gameCatalog/constants/gameCatalog';
import type { GameRegistration } from '../../gameCatalog/types/GameRegistration';
import { GameSelector } from '../../gameSelection/components/GameSelector';
import type { JsonObject } from '../../generalPurpose/types/Json';

export const Root: React.FC = () => {
  const [selectedGame, setSelectedGame] = useState<GameRegistration | null>(null);
  const handleSelectGame = useCallback((gameRegistration: GameRegistration) => {
    setSelectedGame(gameRegistration);
  }, []);
  const handleClearSelectedGame = useCallback(() => {
    setSelectedGame(null);
  }, []);

  const [gameConfig, setGameConfig] = useState<JsonObject | null>(null);
  const handleConfigureGame = useCallback(() => {
    const config = {
      playerIds: ['player1', 'player2'],
      initialRows: [3, 5, 7],
      misere: true,
    };
    setGameConfig(config);
  }, []);

  const [gameState, setGameState] = useState<JsonObject | null>(null);
  const handleStartGame = useCallback(() => {
    if (selectedGame && gameConfig) {
      setGameState(selectedGame.definition.createInitialState(gameConfig));
    }
  }, [selectedGame, gameConfig]);

  const handleTakeTurn = useCallback(() => {
    if (selectedGame && gameConfig && gameState) {
      const action = {
        rowIndex: 0,
        itemsToRemove: 1,
      };
      setGameState(selectedGame.definition.getStateAfterAction(gameConfig, gameState, action));
    }
  }, [selectedGame, gameConfig, gameState]);

  return (
    <div>
      <div>Game AI Trainer</div>
      <div>
        {selectedGame ? (
          <div>
            <div>Selected Game: {selectedGame.displayName}</div>
            <div><button onClick={handleClearSelectedGame}>Clear Selected Game</button></div>
            <div>
              {gameConfig ? (
                <div>
                  <div>
                    <pre>{JSON.stringify(gameConfig, null, 2)}</pre>
                  </div>
                  <div>
                    {gameState ? (
                      <div>
                        <pre>{JSON.stringify(gameState, null, 2)}</pre>
                        <div>
                          <button onClick={handleTakeTurn}>Take Turn</button>
                        </div>
                      </div>
                    ) : (
                      <button onClick={handleStartGame}>Start Game</button>
                    )}
                  </div>
                </div>
              ) : (
                <button onClick={handleConfigureGame}>Configure Game</button>
              )}
            </div>
          </div>
        ) : (
          <GameSelector games={gameCatalog} onSelectGame={handleSelectGame} />
        )}
      </div>
    </div>
  );
};
