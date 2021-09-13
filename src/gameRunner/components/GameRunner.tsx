import React, { useCallback, useState } from 'react';
import type { GameConfig } from '../../gameDefinition/types/GameConfig';
import type { GameState } from '../../gameDefinition/types/GameState';
import type { GameRegistration } from '../../gameRegistration/types/GameRegistration';
import type { JsonObject } from '../../generalPurpose/types/Json';
import type { PlayerRoster } from '../../playerRoster/types/PlayerRoster';
import { GameConfigEditor } from './GameConfigEditor';

export const GameRunner: React.FC<{
  playerRoster: PlayerRoster;
  game: GameRegistration;
  onLeaveGame: () => void;
}> = ({
  playerRoster,
  game,
  onLeaveGame,
}) => {
  const [gameConfig, setGameConfig] = useState<GameConfig<JsonObject> | null>(null);
  const [gameState, setGameState] = useState<GameState<JsonObject, JsonObject> | null>(null);

  const handleStartGame = useCallback((newGameConfig: GameConfig<JsonObject>) => {
    setGameConfig(newGameConfig);
    setGameState(game.definition.createInitialState(newGameConfig));
  }, [game.definition]);

  const handleGameAction = useCallback((gameAction: JsonObject) => {
    if (gameConfig && gameState) {
      setGameState(game.definition.getStateAfterAction(gameConfig, gameState, gameAction));
    }
  }, [game.definition, gameConfig, gameState]);

  return (
    <div>
      {gameConfig && gameState ? (
        <div>
          <div>Current Game: {game.displayName}</div>
          <game.gameUI
            gameConfig={gameConfig}
            gameState={gameState}
            onGameAction={handleGameAction}
          />
          <div>
            <button onClick={onLeaveGame}>Leave Game</button>
          </div>
        </div>
      ) : (
        <GameConfigEditor
          playerRoster={playerRoster}
          game={game}
          onStartGame={handleStartGame}
          onCancel={onLeaveGame}
        />
      )}
    </div>
  );
};
