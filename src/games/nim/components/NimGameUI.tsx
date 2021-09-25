import React, { useCallback, useEffect, useState } from 'react';
import type { GameUIProps } from '../../../gameUI/types/GameUIProps';
import { PlayerUI } from '../../../player/components/PlayerUI';
import { PlayerType } from '../../../player/types/PlayerType';
import type { NimCustomGameConfig } from '../types/NimCustomGameConfig';
import type { NimCustomGameState } from '../types/NimCustomGameState';
import type { NimGameAction } from '../types/NimGameAction';
import type { NimGameResult } from '../types/NimGameResult';
import { NimRowUI } from './NimRowUI';

export const NimGameUI: React.FC<
  GameUIProps<NimCustomGameConfig, NimCustomGameState, NimGameAction, NimGameResult>
> = ({
  gameConfig,
  gameState,
  onGameAction,
}) => {
  const currentRows = gameState.customGameState.currentRows;
  const currentPlayer = gameConfig.players[gameState.currentPlayerIndex];
  const currentPlayerHuman = currentPlayer.type === PlayerType.Human;

  const [hoverState, setHoverState] = useState<{ rowIndex: number, itemIndex: number } | null>(null);

  const handleMouseEnterItem = useCallback((rowIndex: number, itemIndex: number) => {
    setHoverState({ rowIndex, itemIndex });
  },[]);

  const handleMouseLeaveItem = useCallback((_rowIndex: number, _itemIndex: number) => {
    setHoverState(null);
  },[]);

  const handleClickItem = useCallback((rowIndex: number, itemIndex: number) => {
    const itemsToRemove = currentRows[rowIndex] - itemIndex;
    const action: NimGameAction = {
      rowIndex,
      itemsToRemove,
    };
    onGameAction(action);
  }, [currentRows, onGameAction]);

  useEffect(() => {
    if (gameState.gameResult) {
      setHoverState(null);
    }
  }, [gameState.gameResult]);

  return (
    <div>
      <div>Win condition: {gameConfig.customGameConfig.misere ? 'Last move loses' : 'Last move wins'}</div>
      {gameState.gameResult ? (
        <div>
          <span>Game over! </span>
          <span>Winner: </span>
          <PlayerUI player={gameConfig.players[gameState.gameResult.winnerIndex]} />
        </div>
      ) : (
        <div>
          <span>Current Turn: </span>
          <PlayerUI player={currentPlayer} />
        </div>
      )}
      <div style={{ cursor: 'pointer', fontSize: '48px', fontFamily: 'monospace' }}>
        {currentRows.map((rowItemCount, rowIndex) =>
          <NimRowUI
            key={rowIndex}
            rowIndex={rowIndex}
            rowItemCount={rowItemCount}
            initialRowItemCount={gameConfig.customGameConfig.initialRows[rowIndex]}
            hoverItemIndex={hoverState && hoverState.rowIndex === rowIndex ? hoverState.itemIndex : null}
            onMouseEnterItem={currentPlayerHuman ? handleMouseEnterItem : null}
            onMouseLeaveItem={currentPlayerHuman ? handleMouseLeaveItem : null}
            onClickItem={currentPlayerHuman ? handleClickItem : null}
          />
        )}
      </div>
    </div>
  );
};
