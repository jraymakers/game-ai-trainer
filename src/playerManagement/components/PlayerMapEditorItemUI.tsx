import React, { useCallback } from 'react';

export const PlayerMapEditorItemUI: React.FC<{
  playerId: string;
  onRemovePlayer: (playerId: string) => void;
}> = ({
  playerId,
  onRemovePlayer,
}) => {
  const handleClick = useCallback(() => {
    onRemovePlayer(playerId);
  }, [playerId, onRemovePlayer]);
  return (
    <div>
      <span>{playerId}</span>
      <button onClick={handleClick}>Remove</button>
    </div>
  );
};
