import React, { useCallback } from 'react';
import type { GameConfigUIProps } from '../../../gameUI/types/GameConfigUIProps';
import type { NimCustomGameConfig } from '../types/NimCustomGameConfig';
import { RowConfigEntry } from './NimRowConfigUI';

export const NimGameConfigUI: React.FC<GameConfigUIProps<NimCustomGameConfig>> = ({
  customGameConfig,
  onCustomGameConfigChanged,
}) => {
  const handleChangeRowItemCount = useCallback((rowIndexToChange: number, newValue: number) => {
    onCustomGameConfigChanged({
      ...customGameConfig,
      initialRows: customGameConfig.initialRows.map((value, index) => index === rowIndexToChange ? newValue : value),
    });
  }, [customGameConfig, onCustomGameConfigChanged]);

  const handleRemoveRow = useCallback((rowIndex: number) => {
    onCustomGameConfigChanged({
      ...customGameConfig,
      initialRows: customGameConfig.initialRows.filter((_, index) => index !== rowIndex),
    });
  }, [customGameConfig, onCustomGameConfigChanged]);

  const handleAddNewRow = useCallback(() => {
    onCustomGameConfigChanged({
      ...customGameConfig,
      initialRows: customGameConfig.initialRows.concat(1),
    });
  }, [customGameConfig, onCustomGameConfigChanged]);

  const handleClickMisere = useCallback(() => {
    onCustomGameConfigChanged({
      ...customGameConfig,
      misere: !customGameConfig.misere,
    });
  }, [customGameConfig, onCustomGameConfigChanged]);

  return (
    <div>
      <div>
        <div>Initial Rows</div>
        <div>
          {customGameConfig.initialRows.map((rowItemCount, index) =>
            <RowConfigEntry
              key={index}
              rowIndex={index}
              rowItemCount={rowItemCount}
              onChangeRowItemCount={handleChangeRowItemCount}
              onRemoveRow={customGameConfig.initialRows.length > 1 ? handleRemoveRow : undefined}
            />
          )}
        </div>
        <div>
          <button onClick={handleAddNewRow}>Add Row</button>
        </div>
      </div>
      <div>
        <input id="misere_checkbox" type="checkbox" onChange={handleClickMisere} checked={customGameConfig.misere} />
        <label htmlFor="misere_checkbox">Misere?</label>
      </div>
    </div>
  );
};
