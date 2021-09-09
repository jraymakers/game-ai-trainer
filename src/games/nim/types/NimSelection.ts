import type { NimSelectedItems } from './NimSelectedItems';

export type NimSelection = Readonly<{
  rowIndex: number;
  selectedItems: NimSelectedItems;
}>;
