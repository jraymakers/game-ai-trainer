import React, { useCallback } from 'react';
import type { GameUIProps } from '../../../gameUI/types/GameUIProps';
import type { TicTacToeGameAction } from '../types/TicTacToeGameAction';
import type { TicTacToeGameConfig } from '../types/TicTacToeGameConfig';
import type { TicTacToeGameState } from '../types/TicTacToeGameState';
import { TicTacToeGridUI } from './TicTacToeGridUI';

export const TicTacToeGameUI: React.FC<GameUIProps<TicTacToeGameConfig, TicTacToeGameState, TicTacToeGameAction>> = ({
  config,
  state,
  onAction,
  onLeave,
}) => {
  const handleCellClick = useCallback((row: number, col: number) => {
    onAction({ row, col });
  }, [onAction]);
  if (state.gameResult) {
    return (
      <div>
        <div>Game over!</div>
        {state.gameResult.winnerIndex !== null ? (
          <div>Winner: {config.playerIds[state.gameResult.winnerIndex]}</div>
        ) : (
          <div>Draw!</div>
        )}
        <TicTacToeGridUI grid={state.grid} />
        <div>
          <span>
            <button onClick={onLeave}>Leave Game</button>
          </span>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <div>Current Turn: {config.playerIds[state.currentPlayerIndex]}</div>
        <TicTacToeGridUI grid={state.grid} onCellClick={handleCellClick} />
        <div>
          <span>
            <button onClick={onLeave}>Leave Game</button>
          </span>
        </div>
      </div>
    );
  }
};
