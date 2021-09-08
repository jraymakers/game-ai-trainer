import React from 'react';
import type { GameRegistration } from '../../game/types/GameRegistration';
import { GameSelectionOption } from './GameSelectionOption';

export const GameSelector: React.FC<{
  games: readonly GameRegistration[];
  onSelectGame: (game: GameRegistration) => void;
}> = ({
  games,
  onSelectGame,
}) => {
  return (
    <div>
      <div>Select a game</div>
      <div>
        {games.map(game => <GameSelectionOption key={game.displayName} game={game} onSelectGame={onSelectGame} />)}
      </div>
    </div>
  );
};
