import React, { useCallback, useState } from 'react';
import type { GameConfig } from '../../gameDefinition/types/GameConfig';
import type { GameState } from '../../gameDefinition/types/GameState';
import type { GameRegistration } from '../../gameRegistration/types/GameRegistration';
import type { JsonObject } from '../../generalPurpose/types/Json';
import type { PlayerRoster } from '../../playerRoster/types/PlayerRoster';
import { PlayerSelectionUI } from '../../playerSelection/components/PlayerSelectionUI';

export const GameRunner: React.FC<{
  playerRoster: PlayerRoster;
  game: GameRegistration;
  onLeaveGame: () => void;
}> = ({
  playerRoster,
  game,
  onLeaveGame,
}) => {
  const [gameConfig, setGameConfig] = useState<GameConfig<JsonObject>>(
    () => ({
      playerIds: Array.from({ length: game.definition.getDefaultPlayerCount() }, _ => ''),
      customGameConfig: game.definition.getDefaultCustomGameConfig(),
    })
  );

  const handleSelectedPlayerIdsChanged = useCallback((newSelectedPlayerIds: readonly string[]) => {
    setGameConfig({
      ...gameConfig,
      playerIds: newSelectedPlayerIds,
    });
  }, [gameConfig]);

  const handleCustomGameConfigChanged = useCallback((newCustomGameConfig: JsonObject) => {
    setGameConfig({
      ...gameConfig,
      customGameConfig: newCustomGameConfig,
    });
  }, [gameConfig]);

  const [gameState, setGameState] = useState<GameState<JsonObject, JsonObject> | null>(null);

  const handleStartGame = useCallback(() => {
    setGameState(game.definition.createInitialState(gameConfig));
  }, [game.definition, gameConfig]);

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
            gameConfig={gameConfig}
            gameState={gameState}
            onGameAction={handleGameAction}
          />
          <div>
            <button onClick={onLeaveGame}>Leave Game</button>
          </div>
        </div>
      ) : (
        <div>
          <div>Configure Game: {game.displayName}</div>
          <PlayerSelectionUI
            playerRoster={playerRoster}
            minPlayerCount={game.definition.getMinPlayerCount()}
            maxPlayerCount={game.definition.getMaxPlayerCount()}
            selectedPlayerIds={gameConfig.playerIds}
            onSelectedPlayerIdsChanged={handleSelectedPlayerIdsChanged}
          />
          {game.customConfigUI ? (
            <game.customConfigUI
              customGameConfig={gameConfig.customGameConfig}
              onCustomGameConfigChanged={handleCustomGameConfigChanged}
            />
          ) : null}
          <div>
            <button onClick={handleStartGame}>Start Game</button>
            <button onClick={onLeaveGame}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};
