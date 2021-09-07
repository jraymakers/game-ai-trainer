import React, { useCallback, useState } from 'react';
import type { GameDefinition } from '../../game/types/GameDefinition2';
import { NimGameDefinition } from '../../games/NimGameDefinition2';
import type { JsonObject } from '../../generalPurpose/types/Json';

export const Root: React.FC = () => {
  const [gameDefinition, setGameDefinition] = useState<GameDefinition | null>(null);
  const handleSelectGame = useCallback(() => {
    setGameDefinition(NimGameDefinition);
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
    if (gameDefinition && gameConfig) {
      setGameState(gameDefinition.createInitialState(gameConfig));
    }
  }, [gameDefinition, gameConfig]);

  const handleTakeTurn = useCallback(() => {
    if (gameDefinition && gameConfig && gameState) {
      const action = {
        rowIndex: 0,
        itemsToRemove: 1,
      };
      setGameState(gameDefinition.getStateAfterAction(gameConfig, gameState, action));
    }
  }, [gameDefinition, gameConfig, gameState]);

  return (
    <div>
      <div>Game AI Trainer</div>
      <div>
        {gameDefinition ? (
          <div>
            <div>Game selected</div>
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
          <button onClick={handleSelectGame}>Select Game</button>
        )}
      </div>
    </div>
  );
}
