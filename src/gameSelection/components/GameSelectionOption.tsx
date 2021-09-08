import React, { useCallback } from 'react';
import type { GameRegistration } from '../../game/types/GameRegistration';

export const GameSelectionOption: React.FC<{
  game: GameRegistration;
  onSelectGame: (game: GameRegistration) => void;
}> = ({
  game,
  onSelectGame,
}) => {
  const handleClick = useCallback(() => {
    onSelectGame(game);
  }, [game]);
  return (
    <div>
      <button onClick={handleClick}>{game.displayName}</button>
    </div>
  );
};
