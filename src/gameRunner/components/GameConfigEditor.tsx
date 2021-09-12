import React, { useCallback } from 'react';
import type { GameConfig } from '../../gameDefinition/types/GameConfig';
import type { GameRegistration } from '../../gameRegistration/types/GameRegistration';
import type { JsonObject } from '../../generalPurpose/types/Json';
import type { PlayerRoster } from '../../playerRoster/types/PlayerRoster';
import { PlayerSelectionUI } from '../../playerSelection/components/PlayerSelectionUI';

export const GameConfigEditor: React.FC<{
  playerRoster: PlayerRoster;
  game: GameRegistration;
  gameConfig: GameConfig<JsonObject>;
  onGameConfigChanged: (gameConfig: GameConfig<JsonObject>) => void;
  onStartGame: () => void;
  onCancel: () => void;
}> = ({
  playerRoster,
  game,
  gameConfig,
  onGameConfigChanged,
  onStartGame,
  onCancel,
}) => {
  const handleSelectedPlayerIdsChanged = useCallback((newSelectedPlayerIds: readonly string[]) => {
    onGameConfigChanged({
      ...gameConfig,
      playerIds: newSelectedPlayerIds,
    });
  }, [gameConfig, onGameConfigChanged]);

  const handleCustomGameConfigChanged = useCallback((newCustomGameConfig: JsonObject) => {
    onGameConfigChanged({
      ...gameConfig,
      customGameConfig: newCustomGameConfig,
    });
  }, [gameConfig, onGameConfigChanged]);

  return (
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
        <button onClick={onStartGame}>Start Game</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
};
