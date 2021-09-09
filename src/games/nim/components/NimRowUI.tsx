import React from 'react';
import type { NimSelectedItems } from '../types/NimSelectedItems';
import { NimItemUI } from './NimItemUI';

export const NimRowUI: React.FC<{
  rowIndex: number;
  rowItemCount: number;
  selectedItems: NimSelectedItems | null;
  onClickItem: (rowIndex: number, itemIndex: number) => void;
}> = ({
  rowIndex,
  rowItemCount,
  selectedItems,
  onClickItem,
}) => {
  const items: React.ReactNode[] = [];
  for (let i = 0; i < rowItemCount; i++) {
    items.push(
      <NimItemUI
        key={i}
        rowIndex={rowIndex}
        itemIndex={i}
        selected={selectedItems ? selectedItems[i] : false}
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
