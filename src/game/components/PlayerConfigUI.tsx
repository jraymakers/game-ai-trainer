import React, { useCallback } from 'react';

export const PlayerConfigUI: React.FC<{
  playerId: string;
  onChangePlayerId: (playerId: string, newValue: string) => void;
  onRemovePlayerId?: (playerId: string) => void;
}> = ({
  playerId,
  onChangePlayerId,
  onRemovePlayerId,
}) => {
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onChangePlayerId(playerId, e.target.value);
  }, [playerId, onChangePlayerId]);
  const handleRemove = useCallback(() => {
    if (onRemovePlayerId) {
      onRemovePlayerId(playerId);
    }
  }, [playerId, onRemovePlayerId]);
  return (
    <div>
      <input type="text" onChange={handleChange} value={playerId} />
      {onRemovePlayerId ? <button onClick={handleRemove}>Remove</button> : null}
    </div>
  );
};
