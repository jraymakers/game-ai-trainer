import React, { useCallback, useState } from 'react';
import type { GameRegistration } from '../../gameRegistration/types/GameRegistration';
import type { JsonObject } from '../../generalPurpose/types/Json';

export const GameRunner: React.FC<{
  game: GameRegistration;
  onLeave: () => void;
}> = ({
  game,
  onLeave,
}) => {
  const [gameConfig, setGameConfig] = useState<JsonObject | null>(null);
  const [gameState, setGameState] = useState<JsonObject | null>(null);
  
  const handleSubmitGameConfig = useCallback((newGameConfig: JsonObject) => {
      setGameConfig(newGameConfig);
      setGameState(game.definition.createInitialState(newGameConfig));
  }, [game]);

  const handleGameAction = useCallback((gameAction: JsonObject) => {
    if (gameConfig && gameState) {
      setGameState(game.definition.getStateAfterAction(gameConfig, gameState, gameAction));
    }
  }, [game, gameConfig, gameState]);

  return (
    <div>
      {gameConfig && gameState ? (
        <div>
          <div>Current Game: {game.displayName}</div>
          <game.gameUI
            config={gameConfig}
            state={gameState}
            onAction={handleGameAction}
            onLeave={onLeave}
          />
        </div>
      ) : (
        <div>
          <div>Configure Game: {game.displayName}</div>
          <game.configUI
            onSubmit={handleSubmitGameConfig}
            onCancel={onLeave}
          />
        </div>
      )}
    </div>
  );
};
