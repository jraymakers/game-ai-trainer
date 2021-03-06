import React, { useCallback } from 'react';
import type { GameRegistration } from '../../gameRegistration/types/GameRegistration';

export const GameSelectionOption: React.FC<{
  game: GameRegistration;
  onSelectGame: (game: GameRegistration) => void;
}> = ({
  game,
  onSelectGame,
}) => {
  const handleClick = useCallback(() => {
    onSelectGame(game);
  }, [game, onSelectGame]);
  return (
    <div style={{ margin: 6 }}>
      <button onClick={handleClick}>{game.displayName}</button>
    </div>
  );
};
