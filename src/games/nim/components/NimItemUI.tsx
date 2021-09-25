import React, { useCallback } from 'react';

function colorForState(state: 'available' | 'highlighted' | 'removed'): string {
  switch (state) {
    case 'available':
      return 'black';
    case 'highlighted':
      return 'red';
    case 'removed':
      return 'lightgray';
  }
}

export const NimItemUI: React.FC<{
  rowIndex: number;
  itemIndex: number;
  state: 'available' | 'highlighted' | 'removed'
  onMouseEnterItem: ((rowIndex: number, itemIndex: number) => void) | null;
  onMouseLeaveItem: ((rowIndex: number, itemIndex: number) => void) | null;
  onClickItem: ((rowIndex: number, itemIndex: number) => void) | null;  
}> = ({
  rowIndex,
  itemIndex,
  state,
  onMouseEnterItem,
  onMouseLeaveItem,
  onClickItem,
}) => {
  const handleMouseEnter = useCallback(() => {
    if (onMouseEnterItem) {
      onMouseEnterItem(rowIndex, itemIndex);
    }
  }, [onMouseEnterItem, rowIndex, itemIndex]);
  const handleMouseLeave = useCallback(() => {
    if (onMouseLeaveItem) {
      onMouseLeaveItem(rowIndex, itemIndex);
    }
  }, [onMouseLeaveItem, rowIndex, itemIndex]);
  const handleClick = useCallback(() => {
    if (onClickItem) {
      onClickItem(rowIndex, itemIndex);
    }
  }, [onClickItem, rowIndex, itemIndex]);
  return (
    <span
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ color: colorForState(state)}}
    >
      ●
    </span>
  );
};
