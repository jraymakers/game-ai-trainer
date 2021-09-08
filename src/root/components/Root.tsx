import React, { useCallback, useState } from 'react';
import type { GameRegistration } from '../../game/types/GameRegistration';
import { gameCatalog } from '../../gameCatalog/constants/gameCatalog';
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
              selectedGame.ui ? (
                <selectedGame.ui
                  config={gameConfig}
                  state={gameState}
                  onAction={handleGameAction}
                  onLeave={handleLeaveGame}
                />
              ) : (
              <div>
                <div>Active Game: {selectedGame.displayName}</div>
                <div>
                  <pre>{JSON.stringify(gameConfig, null, 2)}</pre>
                </div>
                <div>
                  <pre>{JSON.stringify(gameState, null, 2)}</pre>
                </div>
              </div>
              )
            ) : (
              selectedGame.configEditor ? (
                <div>
                  <div>Configure Game: {selectedGame.displayName}</div>
                  <selectedGame.configEditor
                    onSubmit={handleSubmitGameConfig}
                    onCancel={handleClearSelectedGame}
                  />
                </div>
              ) : (
                <div>No config editor</div>
              )
            )}
          </div>
        ) : (
          <GameSelector games={gameCatalog} onSelectGame={handleSelectGame} />
        )}
      </div>
    </div>
  );
};
