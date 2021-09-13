import React, { useCallback, useState } from 'react';
import type { GameConfig } from '../../gameDefinition/types/GameConfig';
import type { GameRegistration } from '../../gameRegistration/types/GameRegistration';
import type { JsonObject } from '../../generalPurpose/types/Json';
import type { Player } from '../../player/types/Player';
import type { PlayerRoster } from '../../playerRoster/types/PlayerRoster';
import { PlayerSelectionUI } from '../../playerSelection/components/PlayerSelectionUI';

export const GameConfigEditor: React.FC<{
  playerRoster: PlayerRoster;
  game: GameRegistration;
  onStartGame: (newGameConfig: GameConfig<JsonObject>) => void;
  onCancel: () => void;
}> = ({
  playerRoster,
  game,
  onStartGame,
  onCancel,
}) => {
  const [selectedPlayerIds, setSelectedPlayerIds] = useState<readonly string[]>(
    () => Array.from({ length: game.definition.getDefaultPlayerCount() }, _ => '')
  );

  const [customGameConfig, setCustomGameConfig] = useState<JsonObject>(
    () => game.definition.getDefaultCustomGameConfig()
  );

  const somePlayersUndefined = selectedPlayerIds.some(playerId => !playerId);

  const handleStartGame = useCallback(() => {
    const players: Player[] = [];
    for (const playerId of selectedPlayerIds) {
      const player = playerRoster[playerId];
      if (player) {
        players.push(player);
      }
    }
    onStartGame({
      players,
      customGameConfig,
    });
  }, [customGameConfig, onStartGame, playerRoster, selectedPlayerIds]);

  return (
    <div>
      <div>Configure Game: {game.displayName}</div>
      <PlayerSelectionUI
        playerRoster={playerRoster}
        minPlayerCount={game.definition.getMinPlayerCount()}
        maxPlayerCount={game.definition.getMaxPlayerCount()}
        selectedPlayerIds={selectedPlayerIds}
        onSelectedPlayerIdsChanged={setSelectedPlayerIds}
      />
      {game.customConfigUI ? (
        <game.customConfigUI
          customGameConfig={customGameConfig}
          onCustomGameConfigChanged={setCustomGameConfig}
        />
      ) : null}
      <div>
        <button onClick={handleStartGame} disabled={somePlayersUndefined}>Start Game</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
};
