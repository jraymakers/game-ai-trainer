import React, { useCallback, useEffect, useState } from 'react';
import type { GameConfig } from '../../gameDefinition/types/GameConfig';
import type { GameState } from '../../gameDefinition/types/GameState';
import type { GameRegistration } from '../../gameRegistration/types/GameRegistration';
import type { JsonObject } from '../../generalPurpose/types/Json';
import { PlayerType } from '../../player/types/PlayerType';
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
  const gameDefinition = game.definition;
  const [gameConfig, setGameConfig] = useState<GameConfig<JsonObject> | null>(null);
  const [gameState, setGameState] = useState<GameState<JsonObject, JsonObject> | null>(null);

  const handleStartGame = useCallback((newGameConfig: GameConfig<JsonObject>) => {
    setGameConfig(newGameConfig);
    setGameState(gameDefinition.createInitialState(newGameConfig));
  }, [gameDefinition]);

  const handleGameAction = useCallback((gameAction: JsonObject) => {
    if (gameConfig && gameState) {
      setGameState(gameDefinition.getStateAfterAction(gameAction, gameState, gameConfig));
    }
  }, [gameDefinition, gameConfig, gameState]);

  useEffect(() => {
    if (gameConfig && gameState && !gameState.gameResult) {
      if (gameConfig.players[gameState.currentPlayerIndex].type === PlayerType.Computer) {
        const timerId = setTimeout(() => {
          const actions = gameDefinition.getLegalActions(gameState, gameConfig);
          console.log(actions);
          if (actions.length > 0) {
            const action = actions[Math.floor(Math.random() * actions.length)];
            console.log(action);
            handleGameAction(action);
          } else {
            console.warn('no legal actions!');
          }
        }, 500);
        return () => clearTimeout(timerId);
      }
    }
  }, [gameDefinition, gameConfig, gameState, handleGameAction]);

  const handleResetGame = useCallback(() => {
    if (gameConfig) {
      setGameState(gameDefinition.createInitialState(gameConfig));
    }
  }, [gameConfig, gameDefinition]);

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
            <button onClick={handleResetGame}>Reset Game</button>
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
