import React, { useCallback, useEffect, useState } from 'react';
import type { GameConfig } from '../../gameDefinition/types/GameConfig';
import type { GameState } from '../../gameDefinition/types/GameState';
import type { GameRegistration } from '../../gameRegistration/types/GameRegistration';
import { RandomGameStrategy } from '../../gameStrategies/random/constants/RandomGameStrategy';
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
      const currentPlayer = gameConfig.players[gameState.currentPlayerIndex];
      if (currentPlayer.type === PlayerType.Computer) {
        const timerId = setTimeout(() => {
          const action = RandomGameStrategy.getNextAction(gameState, gameConfig, gameDefinition);
          handleGameAction(action);
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
          <div style={{ margin: 12 }}>Current Game: {game.displayName}</div>
          <div style={{ margin: 12 }}>
            <game.gameUI
              gameConfig={gameConfig}
              gameState={gameState}
              onGameAction={handleGameAction}
            />
          </div>
          <div style={{ margin: 12 }}>
            <button onClick={handleResetGame}>Reset Game</button>
            <button onClick={onLeaveGame} style={{ marginLeft: 6 }}>Leave Game</button>
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
