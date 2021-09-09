import React, { useCallback, useState } from 'react';
import { gameCatalog } from '../../gameCatalog/constants/gameCatalog';
import type { GameRegistration } from '../../gameRegistration/types/GameRegistration';
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
  const [gameState, setGameState] = useState<JsonObject | null>(null);
  const handleSubmitGameConfig = useCallback((newGameConfig: JsonObject) => {
    if (selectedGame) {
      setGameConfig(newGameConfig);
      setGameState(selectedGame.definition.createInitialState(newGameConfig));
    }
  }, [selectedGame]);

  const handleGameAction = useCallback((gameAction: JsonObject) => {
    if (selectedGame && gameConfig && gameState) {
      setGameState(selectedGame.definition.getStateAfterAction(gameConfig, gameState, gameAction));
    }
  }, [selectedGame, gameConfig, gameState]);

  const handleLeaveGame = useCallback(() => {
    setGameState(null);
    setGameConfig(null);
    setSelectedGame(null);
  }, []);

  return (
    <div>
      <div>Game AI Trainer</div>
      <div>
        {selectedGame ? (
          <div>
            {gameConfig && gameState ? (
              <div>
                <div>Current Game: {selectedGame.displayName}</div>
                <selectedGame.gameUI
                  config={gameConfig}
                  state={gameState}
                  onAction={handleGameAction}
                  onLeave={handleLeaveGame}
                />
              </div>
            ) : (
              <div>
                <div>Configure Game: {selectedGame.displayName}</div>
                <selectedGame.configUI
                  onSubmit={handleSubmitGameConfig}
                  onCancel={handleClearSelectedGame}
                />
              </div>
            )}
          </div>
        ) : (
          <GameSelector games={gameCatalog} onSelectGame={handleSelectGame} />
        )}
      </div>
    </div>
  );
};
