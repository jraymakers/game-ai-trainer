import React, { useCallback } from 'react';

export const NimItemUI: React.FC<{
  rowIndex: number;
  itemIndex: number;
  selected: boolean;
  onClickItem: (rowIndex: number, itemIndex: number) => void;
}> = ({
  rowIndex,
  itemIndex,
  selected,
  onClickItem,
}) => {
  const handleClickItem = useCallback(() => {
    onClickItem(rowIndex, itemIndex);
  }, [rowIndex, itemIndex, onClickItem]);
  return (
    <span onClick={handleClickItem}>{selected ? 'X' : '•'}</span>
  );
};
