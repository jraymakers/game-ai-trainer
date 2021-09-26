import React, { useCallback, useEffect, useRef, useState } from 'react';
import type { GameConfig } from '../../gameDefinition/types/GameConfig';
import type { GameState } from '../../gameDefinition/types/GameState';
import type { GameRegistration } from '../../gameRegistration/types/GameRegistration';
import { RandomGameStrategyRegistration } from '../../gameStrategies/random/constants/RandomGameStrategyRegistration';
import type { JsonObject } from '../../generalPurpose/types/Json';
import { PlayerType } from '../../player/types/PlayerType';
import type { PlayerMemory } from '../../playerMemory/types/PlayerMemory';
import type { PlayerMemoryStore } from '../../playerMemory/types/PlayerMemoryStore';
import type { PlayerRoster } from '../../playerRoster/types/PlayerRoster';
import type { PlayerStrategiesStore } from '../../playerStrategies/types/PlayerStrategiesStore';
import { GameConfigEditor } from './GameConfigEditor';

export const GameRunner: React.FC<{
  game: GameRegistration;
  playerRoster: PlayerRoster;
  playerStrategiesStore: PlayerStrategiesStore;
  playerMemoryStore: PlayerMemoryStore;
  setPlayerMemory: (playerId: string, newPlayerMemory: PlayerMemory) => void;
  onLeaveGame: () => void;
}> = ({
  game,
  playerRoster,
  playerStrategiesStore,
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

  const playerStrategiesStoreRef = useRef(playerStrategiesStore);
  playerStrategiesStoreRef.current = playerStrategiesStore;

  const playerMemoryStoreRef = useRef(playerMemoryStore);
  playerMemoryStoreRef.current = playerMemoryStore;

  const setPlayerMemoryRef = useRef(setPlayerMemory);
  setPlayerMemoryRef.current = setPlayerMemory;

  useEffect(() => {
    if (gameConfig && gameState && !gameState.gameResult) {
      const currentPlayer = gameConfig.players[gameState.currentPlayerIndex];
      if (currentPlayer.type === PlayerType.Computer) {
        const timerId = setTimeout(() => {

          const currentPlayerMemory = playerMemoryStoreRef.current[currentPlayer.id];
          const currentPlayerMemoryForGame =
            currentPlayerMemory && currentPlayerMemory.memoryForGame[game.displayName] || {};

          const currentPlayerStrategies = playerStrategiesStoreRef.current[currentPlayer.id];
          const currentPlayerStrategyForGame =
            currentPlayerStrategies && currentPlayerStrategies[game.displayName] || RandomGameStrategyRegistration;

          const { nextAction, nextPlayerMemoryForGame } =
            currentPlayerStrategyForGame.strategy.getNextActionAndMemory(
              gameState, gameConfig, game.definition, currentPlayerMemoryForGame);

          if (nextPlayerMemoryForGame) {
            setPlayerMemoryRef.current(currentPlayer.id, {
              ...currentPlayerMemory,
              memoryForGame: {
                ...(currentPlayerMemory ? currentPlayerMemory.memoryForGame : {}),
                [game.displayName]: nextPlayerMemoryForGame,
              }
            });
          }

          if (nextAction) {
            setGameState(game.definition.getStateAfterAction(nextAction, gameState, gameConfig));
          } else {
            console.warn('no legal actions!');
          }

        }, 500);
        return () => clearTimeout(timerId);
      }
    }
  }, [game, gameConfig, gameState]);

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
