import React, { useCallback, useRef, useState } from 'react';
import type { GameConfigEditorProps } from '../../../gameCatalog/types/GameRegistration';
import type { NimGameConfig } from '../types/NiimGameConfig';
import type { NimRows } from '../types/NimRows';

const PlayerConfigEntry: React.FC<{
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

const RowConfigEntry: React.FC<{
  rowIndex: number;
  rowItemCount: number;
  onChangeRowItemCount: (rowIndexToChange: number, newValue: number) => void;
  onRemoveRow?: (rowIndex: number) => void;
}> = ({
  rowIndex,
  rowItemCount,
  onChangeRowItemCount,
  onRemoveRow,
}) => {
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value, 10);
    if (newValue >= 1) {
      onChangeRowItemCount(rowIndex, newValue);
    }
  }, [rowIndex, onChangeRowItemCount]);
  const handleRemove = useCallback(() => {
    if (onRemoveRow) {
      onRemoveRow(rowIndex);
    }
  }, [rowIndex, onRemoveRow]);
  return (
    <div>
      <input type="number" onChange={handleChange} value={rowItemCount} />
      {onRemoveRow ? <button onClick={handleRemove}>Remove</button> : null}
    </div>
  );
};

export const NimGameConfigEditor: React.FC<GameConfigEditorProps> = ({
  onSubmit,
  onCancel,
}) => {
  const [playerIds, setPlayerIds] = useState<readonly string[]>(() => ['Player 1', 'Player 2']);
  const handleChangePlayerId = useCallback((playerIdToChange: string, newValue: string) => {
    setPlayerIds(playerIds.map(playerId => playerId === playerIdToChange ? newValue : playerId));
  }, [playerIds]);
  const handleRemovePlayerId = useCallback((playerIdToRemove: string) => {
    setPlayerIds(playerIds.filter(playerId => playerId !== playerIdToRemove));
  }, [playerIds]);
  const handleAddNewPlayer = useCallback(() => {
    let i = playerIds.length + 1;
    while (playerIds.includes(`Player ${i}`)) {
      i++;
    }
    setPlayerIds(playerIds.concat(`Player ${i}`));
  }, [playerIds]);
  
  const [initialRows, setInitialRows] = useState<NimRows>(() => [3, 5, 7]);
  const handleChangeRowItemCount = useCallback((rowIndexToChange: number, newValue: number) => {
    setInitialRows(initialRows.map((value, index) => index === rowIndexToChange ? newValue : value));
  }, [initialRows]);
  const handleRemoveRow = useCallback((rowIndex: number) => {
    setInitialRows(initialRows.filter((_, index) => index !== rowIndex));
  }, [initialRows]);
  const handleAddNewRow = useCallback(() => {
    setInitialRows(initialRows.concat(1));
  }, [initialRows]);

  const [misere, setMisere] = useState<boolean>(false);
  const handleClickMisere = useCallback(() => {
    setMisere(!misere);
  }, [misere]);

  const handleSubmit = useCallback(() => {
    const gameConfig: NimGameConfig = {
      playerIds,
      initialRows,
      misere,
    };
    onSubmit(gameConfig);
  }, [playerIds, initialRows, misere]);

  return (
    <div>
      <div>
        <div>Player Ids</div>
        <div>
          {playerIds.map((playerId, index) =>
            <PlayerConfigEntry
              key={index}
              playerId={playerId}
              onChangePlayerId={handleChangePlayerId}
              onRemovePlayerId={playerIds.length > 1 ? handleRemovePlayerId : undefined}
            />
          )}
        </div>
        <div>
          <button onClick={handleAddNewPlayer}>Add Player</button>
        </div>
      </div>
      <div>
      <div>Initial Rows</div>
        <div>
          {initialRows.map((rowItemCount, index) =>
            <RowConfigEntry
              key={index}
              rowIndex={index}
              rowItemCount={rowItemCount}
              onChangeRowItemCount={handleChangeRowItemCount}
              onRemoveRow={initialRows.length > 1 ? handleRemoveRow : undefined}
            />
          )}
        </div>
        <div>
          <button onClick={handleAddNewRow}>Add Row</button>
        </div>
      </div>
      <div>
        <input id="misere_checkbox" type="checkbox" onChange={handleClickMisere} checked={misere} />
        <label htmlFor="misere_checkbox">Misere?</label>
      </div>
      <div>
        <button onClick={handleSubmit}>Submit</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
};
