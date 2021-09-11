import React, { useCallback, useState } from 'react';
import { MultiplayerGameConfigUI } from '../../../gameUI/components/MultiplayerGameConfigUI';
import type { GameConfigUIProps } from '../../../gameUI/types/GameConfigUIProps';
import type { NimGameConfig } from '../types/NimGameConfig';
import type { NimRows } from '../types/NimRows';
import { RowConfigEntry } from './NimRowConfigUI';

export const NimGameConfigUI: React.FC<GameConfigUIProps<NimGameConfig>> = ({
  onSubmit,
  onCancel,
}) => {
  const [playerIds, setPlayerIds] = useState<readonly string[]>(() => ['Player 1', 'Player 2']);
  
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
  }, [playerIds, initialRows, misere, onSubmit]);

  return (
    <div>
      <MultiplayerGameConfigUI
        playerIds={playerIds}
        setPlayerIds={setPlayerIds}
        minPlayerCount={2}
        maxPlayerCount={2}
      />
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
