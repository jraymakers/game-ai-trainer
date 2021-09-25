import React from 'react';
import { NimItemUI } from './NimItemUI';

export const NimRowUI: React.FC<{
  rowIndex: number;
  rowItemCount: number;
  initialRowItemCount: number;
  hoverItemIndex: number | null;
  onMouseEnterItem: ((rowIndex: number, itemIndex: number) => void) | null;
  onMouseLeaveItem: ((rowIndex: number, itemIndex: number) => void) | null;
  onClickItem: ((rowIndex: number, itemIndex: number) => void) | null;
}> = ({
  rowIndex,
  rowItemCount,
  initialRowItemCount,
  hoverItemIndex,
  onClickItem,
  onMouseEnterItem,
  onMouseLeaveItem,
}) => {
  const items: React.ReactNode[] = [];
  for (let i = 0; i < initialRowItemCount; i++) {
    const state = i >= rowItemCount
      ? 'removed'
      : hoverItemIndex !== null && i >= hoverItemIndex
        ? 'highlighted'
        : 'available';
    items.push(
      <NimItemUI
        key={i}
        rowIndex={rowIndex}
        itemIndex={i}
        state={state}
        onMouseEnterItem={onMouseEnterItem}
        onMouseLeaveItem={onMouseLeaveItem}
        onClickItem={onClickItem}
      />
    );
  }
  return (
    <div>
      {items}
    </div>
  );
};
