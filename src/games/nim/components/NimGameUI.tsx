import React, { useCallback, useState } from 'react';
import type { GameUIProps } from '../../../game/types/GameUIProps';
import type { NimGameAction } from '../types/NimGameAction';
import type { NimGameConfig } from '../types/NimGameConfig';
import type { NimGameState } from '../types/NimGameState';

type NimSelectedItems = Readonly<{
  [itemIndex: number]: true;
}>;

type NimSelection = Readonly<{
  rowIndex: number;
  selectedItems: NimSelectedItems;
}>;

const NimGameItemUI: React.FC<{
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

const NimGameRowUI: React.FC<{
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
      <NimGameItemUI
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

export const NimGameUI: React.FC<GameUIProps<NimGameConfig, NimGameState, NimGameAction>> = ({
  config,
  state,
  onAction,
  onLeave,
}) => {
  const [selection, setSelection] = useState<NimSelection | null>(null);

  const handleClickItem = useCallback((rowIndex: number, itemIndex: number) => {
    if (selection && selection.rowIndex === rowIndex) {
      if (selection.selectedItems[itemIndex]) {
        const { [itemIndex]: _, ...rest } = selection.selectedItems;
        setSelection({
          rowIndex: selection.rowIndex,
          selectedItems: rest,
        });
      } else {
        setSelection({
          rowIndex: selection.rowIndex,
          selectedItems: { ...selection.selectedItems, [itemIndex]: true },
        });
      }
    } else {
      setSelection({ rowIndex, selectedItems: { [itemIndex]: true } });
    }
  }, [selection]);

  const handleSubmit = useCallback(() => {
    if (selection) {
      const action: NimGameAction = {
        rowIndex: selection.rowIndex,
        itemsToRemove: Object.keys(selection.selectedItems).length,
      };
      setSelection(null);
      onAction(action);
    }
  }, [selection, onAction]);

  const handleReset = useCallback(() => {
    setSelection(null);
  }, []);

  return (
    <div>
      <div>Nim</div>
      <div>Win condition: {config.misere ? 'Last move loses' : 'Last move wins'}</div>
      <div>Current Turn: {config.playerIds[state.currentPlayerIndex]}</div>
      <div style={{ cursor: 'pointer', fontSize: '48px', fontFamily: 'monospace' }}>
        {state.currentRows.map((rowItemCount, rowIndex) =>
          <NimGameRowUI
            key={rowIndex}
            rowIndex={rowIndex}
            rowItemCount={rowItemCount}
            selectedItems={selection && selection.rowIndex === rowIndex ? selection.selectedItems : null}
            onClickItem={handleClickItem}
          />
        )}
      </div>
      <div>
        <span>
          <button onClick={handleSubmit} disabled={!selection}>Submit</button>
        </span>
        <span>
          <button onClick={handleReset} disabled={!selection}>Reset</button>
        </span>
      </div>
      <div>
        <span>
          <button onClick={onLeave}>Leave Game</button>
        </span>
      </div>
    </div>
  );
};
