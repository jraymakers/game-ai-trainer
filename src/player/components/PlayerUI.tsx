import React from 'react';
import type { Player } from '../types/Player';

export const PlayerUI: React.FC<{
  player: Player;
}> = ({
  player,
}) => {
  return (
    <span>
      <span>{player.id}</span>
      <span> [{player.type}]</span>
    </span>
  );
};
