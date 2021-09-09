import React, { useCallback, useState } from 'react';
import { MultiplayerGameConfigUI } from '../../../game/components/MultiplayerGameConfigUI';
import type { GameConfigUIProps } from '../../../game/types/GameConfigUIProps';
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
      <MultiplayerGameConfigUI playerIds={playerIds} setPlayerIds={setPlayerIds} />
      <div>
        <button onClick={handleSubmit}>Submit</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
};
