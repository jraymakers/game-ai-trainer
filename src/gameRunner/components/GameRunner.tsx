import React, { useCallback, useEffect, useRef, useState } from 'react';
import type { GameConfig } from '../../gameDefinition/types/GameConfig';
import type { GameState } from '../../gameDefinition/types/GameState';
import type { GameRegistration } from '../../gameRegistration/types/GameRegistration';
import { RandomGameStrategyRegistration } from '../../gameStrategies/random/constants/RandomGameStrategyRegistration';
import type { JsonObject } from '../../generalPurpose/types/Json';
import { PlayerType } from '../../player/types/PlayerType';
import type { PlayerMemory } from '../../memory/types/PlayerMemory';
import type { MemoryStore } from '../../memory/types/MemoryStore';
import type { PlayerRoster } from '../../playerRoster/types/PlayerRoster';
import type { PlayerStrategiesStore } from '../../playerStrategies/types/PlayerStrategiesStore';
import { GameConfigEditor } from './GameConfigEditor';

export const GameRunner: React.FC<{
  game: GameRegistration;
  playerRoster: PlayerRoster;
  playerStrategiesStore: PlayerStrategiesStore;
  memoryStore: MemoryStore;
  setPlayerMemory: (playerId: string, newPlayerMemory: PlayerMemory) => void;
  onLeaveGame: () => void;
}> = ({
  game,
  playerRoster,
  playerStrategiesStore,
  memoryStore,
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

  const memoryStoreRef = useRef(memoryStore);
  memoryStoreRef.current = memoryStore;

  const setPlayerMemoryRef = useRef(setPlayerMemory);
  setPlayerMemoryRef.current = setPlayerMemory;

  useEffect(() => {
    if (gameConfig && gameState && !gameState.gameResult) {
      const currentPlayer = gameConfig.players[gameState.currentPlayerIndex];
      if (currentPlayer.type === PlayerType.Computer) {
        const timerId = setTimeout(() => {

          const currentPlayerStrategies = playerStrategiesStoreRef.current[currentPlayer.id];
          const currentPlayerGameStrategy = currentPlayerStrategies &&
            currentPlayerStrategies[game.displayName] || RandomGameStrategyRegistration;

          const currentPlayerMemory = memoryStoreRef.current.playerMemories[currentPlayer.id];
          const currentPlayerGameMemory = currentPlayerMemory &&
            currentPlayerMemory.gameMemories[game.displayName];
          const currentPlayerStrategyMemory = currentPlayerGameMemory &&
            currentPlayerGameMemory.strategyMemories[currentPlayerGameStrategy.displayName];

          const nextActionAndMemory =
            currentPlayerGameStrategy.definition.getNextActionAndMemory(
              gameState, gameConfig, game.definition, currentPlayerStrategyMemory);

          if (nextActionAndMemory) {
            const { nextAction, nextMemory } = nextActionAndMemory;
            console.log(currentPlayer.id, nextAction, nextMemory);
            if (nextMemory) {
              setPlayerMemoryRef.current(currentPlayer.id, {
                ...currentPlayerMemory,
                gameMemories: {
                  ...(currentPlayerMemory ? currentPlayerMemory.gameMemories : {}),
                  [game.displayName]: {
                    ...currentPlayerGameMemory,
                    strategyMemories: {
                      ...(currentPlayerGameMemory ? currentPlayerGameMemory.strategyMemories : {}),
                      [currentPlayerGameStrategy.displayName]: nextMemory,
                    }
                  }
                }
              });
            }

            setGameState(game.definition.getStateAfterAction(nextAction, gameState, gameConfig));
          } else {
            console.warn('strategy did not return an action!');
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
