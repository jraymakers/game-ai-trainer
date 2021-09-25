import React, { useCallback } from 'react';

export const RowConfigEntry: React.FC<{
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
    <div style={{ margin: 6 }}>
      <input type="number" onChange={handleChange} value={rowItemCount} style={{ width: 50 }} />
      {onRemoveRow ? <button onClick={handleRemove} style={{ marginLeft: 6 }}>Remove</button> : null}
    </div>
  );
};
