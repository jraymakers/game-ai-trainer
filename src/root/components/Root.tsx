import React, { useCallback, useState } from 'react';
import { gameCatalog } from '../../gameCatalog/constants/gameCatalog';
import type { GameRegistration } from '../../gameRegistration/types/GameRegistration';
import { GameRunner } from '../../gameRunner/components/GameRunner';
import { GameSelector } from '../../gameSelection/components/GameSelector';
import { MCTSGameStrategyRegistration } from '../../gameStrategies/mcts/constants/MCTSGameStrategyRegistration';
import { RandomGameStrategyRegistration } from '../../gameStrategies/random/constants/RandomGameStrategyRegistration';
import type { Player } from '../../player/types/Player';
import { PlayerType } from '../../player/types/PlayerType';
import type { PlayerMemory } from '../../memory/types/PlayerMemory';
import type { MemoryStore } from '../../memory/types/MemoryStore';
import { PlayerRosterEditorUI } from '../../playerRoster/components/PlayerRosterEditorUI';
import type { PlayerRoster } from '../../playerRoster/types/PlayerRoster';
import type { PlayerStrategiesStore } from '../../playerStrategies/types/PlayerStrategiesStore';
import { updatePlayerMemory } from '../../memory/functions/updatePlayerMemory';

export const Root: React.FC = () => {
  const [playerRoster, setPlayerRoster] = useState<PlayerRoster>(() => ({
    'Computer1': { id: 'Computer1', type: PlayerType.Computer },
    'Computer2': { id: 'Computer2', type: PlayerType.Computer },
    'Human1': { id: 'Human1', type: PlayerType.Human },
    'Human2': { id: 'Human2', type: PlayerType.Human },
  }));

  const handleAddNewPlayer = useCallback((newPlayer: Player) => {
    setPlayerRoster({
      ...playerRoster,
      [newPlayer.id]: newPlayer,
    });
  }, [playerRoster]);

  const handleRemovePlayer = useCallback((playerId: string) => {
    const { [playerId]: _, ...rest } = playerRoster;
    setPlayerRoster(rest);
  }, [playerRoster]);

  const [playerStrategiesStore, _setPlayerStrategiesStore] = useState<PlayerStrategiesStore>(() => ({
    'Computer1': {
      'Nim': RandomGameStrategyRegistration,
      'Tic-Tac-Toe': RandomGameStrategyRegistration,
    },
    'Computer2': {
      'Nim': MCTSGameStrategyRegistration,
      'Tic-Tac-Toe': MCTSGameStrategyRegistration,
    }
  }));

  const [memoryStore, setMemoryStore] = useState<MemoryStore>(() => ({ playerMemories: {} }));

  const setPlayerMemory = useCallback((playerId: string, newPlayerMemory: PlayerMemory) => {
    setMemoryStore(updatePlayerMemory(memoryStore, playerId, newPlayerMemory));
  }, [memoryStore]);

  const [selectedGame, setSelectedGame] = useState<GameRegistration | null>(null);
  
  const handleSelectGame = useCallback((gameRegistration: GameRegistration) => {
    setSelectedGame(gameRegistration);
  }, []);

  const handleLeaveGame = useCallback(() => {
    setSelectedGame(null);
  }, []);

  return (
    <div>
      <div style={{ margin: 12 }}>Game AI Trainer</div>
      
      <div>
        {selectedGame ? (
          <GameRunner
            game={selectedGame}  
            playerRoster={playerRoster}
            playerStrategiesStore={playerStrategiesStore}
            memoryStore={memoryStore}
            setPlayerMemory={setPlayerMemory}
            onLeaveGame={handleLeaveGame}
          />
        ) : (
          <div>
            <div style={{ margin: 12 }}>
              <PlayerRosterEditorUI
                playerRoster={playerRoster}
                onAddNewPlayer={handleAddNewPlayer}
                onRemovePlayer={handleRemovePlayer}
              />
            </div>
            <div style={{ margin: 12 }}>
              <GameSelector games={gameCatalog} onSelectGame={handleSelectGame} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
