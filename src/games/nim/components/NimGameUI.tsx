import React, { useCallback, useEffect, useState } from 'react';
import type { GameUIProps } from '../../../gameUI/types/GameUIProps';
import { PlayerUI } from '../../../player/components/PlayerUI';
import type { NimCustomGameConfig } from '../types/NimCustomGameConfig';
import type { NimCustomGameState } from '../types/NimCustomGameState';
import type { NimGameAction } from '../types/NimGameAction';
import type { NimGameResult } from '../types/NimGameResult';
import type { NimSelection } from '../types/NimSelection';
import { NimRowUI } from './NimRowUI';

export const NimGameUI: React.FC<
  GameUIProps<NimCustomGameConfig, NimCustomGameState, NimGameAction, NimGameResult>
> = ({
  gameConfig,
  gameState,
  onGameAction,
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
      onGameAction(action);
    }
  }, [selection, onGameAction]);

  const handleReset = useCallback(() => {
    setSelection(null);
  }, []);

  useEffect(() => {
    if (gameState.gameResult) {
      setSelection(null);
    }
  }, [gameState.gameResult]);

  if (gameState.gameResult) {
    return (
      <div>
        <div>Game over!</div>
        <div>
          <span>Winner: </span>
          <PlayerUI player={gameConfig.players[gameState.gameResult.winnerIndex]} />
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <div>Win condition: {gameConfig.customGameConfig.misere ? 'Last move loses' : 'Last move wins'}</div>
        <div>
          <span>Current Turn: </span>
          <PlayerUI player={gameConfig.players[gameState.currentPlayerIndex]} />
        </div>
        <div style={{ cursor: 'pointer', fontSize: '48px', fontFamily: 'monospace' }}>
          {gameState.customGameState.currentRows.map((rowItemCount, rowIndex) =>
            <NimRowUI
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
      </div>
    );
  }
};
