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
  const handleSubmitGameConfig = useCallback((gameConfig: JsonObject) => {
    if (selectedGame) {
      setGameConfig(gameConfig);
      setGameState(selectedGame.definition.createInitialState(gameConfig));
    }
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
            <div>Configure Game: {selectedGame.displayName}</div>
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
              ) : selectedGame.configEditor ? (
                <selectedGame.configEditor
                  onSubmit={handleSubmitGameConfig}
                  onCancel={handleClearSelectedGame}
                />
              ) : (
                <div>No config editor</div>
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
