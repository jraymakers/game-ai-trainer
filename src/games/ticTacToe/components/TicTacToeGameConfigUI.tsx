import React, { useCallback, useState } from 'react';
import { MultiplayerGameConfigUI } from '../../../gameUI/components/MultiplayerGameConfigUI';
import type { GameConfigUIProps } from '../../../gameUI/types/GameConfigUIProps';
import type { TicTacToeGameConfig } from '../types/TicTacToeGameConfig';

export const TicTacToeGameConfigUI: React.FC<GameConfigUIProps<TicTacToeGameConfig>> = ({
  onSubmit,
  onCancel,
}) => {
  const [playerIds, setPlayerIds] = useState<readonly string[]>(() => ['X', 'O']);

  const handleSubmit = useCallback(() => {
    onSubmit({
      playerIds
    });
  }, [playerIds]);

  return (
    <div>
      <MultiplayerGameConfigUI
        playerIds={playerIds}
        setPlayerIds={setPlayerIds}
        minPlayerCount={2}
        maxPlayerCount={2}
      />
      <div>
        <button onClick={handleSubmit}>Submit</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
};
