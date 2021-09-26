import React, { useCallback, useEffect, useState } from 'react';
import type { GameConfig } from '../../gameDefinition/types/GameConfig';
import type { GameState } from '../../gameDefinition/types/GameState';
import type { GameRegistration } from '../../gameRegistration/types/GameRegistration';
import { RandomGameStrategy } from '../../gameStrategies/random/constants/RandomGameStrategy';
import type { GameStrategy } from '../../gameStrategy/types/GameStrategy';
import type { JsonObject } from '../../generalPurpose/types/Json';
import { PlayerType } from '../../player/types/PlayerType';
import type { PlayerMemory } from '../../playerMemory/types/PlayerMemory';
import type { PlayerMemoryStore } from '../../playerMemory/types/PlayerMemoryStore';
import type { PlayerRoster } from '../../playerRoster/types/PlayerRoster';
import { GameConfigEditor } from './GameConfigEditor';

const strategy: GameStrategy<JsonObject, JsonObject, JsonObject, JsonObject, JsonObject> = RandomGameStrategy;

export const GameRunner: React.FC<{
  game: GameRegistration;
  playerRoster: PlayerRoster;
  playerMemoryStore: PlayerMemoryStore;
  setPlayerMemory: (playerId: string, newPlayerMemory: PlayerMemory) => void;
  onLeaveGame: () => void;
}> = ({
  game,
  playerRoster,
  playerMemoryStore,
  setPlayerMemory,
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
          const currentPlayerMemory = playerMemoryStore[currentPlayer.id];
          const currentPlayerMemoryForGame = currentPlayerMemory && currentPlayerMemory.memoryForGame[game.displayName] || {};
          const { nextAction, nextPlayerMemoryForGame } =
            strategy.getNextActionAndPlayerGameState(gameState, gameConfig, gameDefinition, currentPlayerMemoryForGame);
          if (nextPlayerMemoryForGame) {
            setPlayerMemory(currentPlayer.id, {
              ...currentPlayerMemory,
              memoryForGame: {
                ...(currentPlayerMemory ? currentPlayerMemory.memoryForGame : {}),
                [game.displayName]: nextPlayerMemoryForGame,
              }
            });
          }
          if (nextAction) {
            handleGameAction(nextAction);
          } else {
            console.warn('no legal actions!');
          }
        }, 500);
        return () => clearTimeout(timerId);
      }
    }
  }, [gameDefinition, gameConfig, gameState, handleGameAction, playerMemoryStore, game.displayName, setPlayerMemory]);

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
