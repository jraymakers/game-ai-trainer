import React, { useCallback } from 'react';
import type { GameUIProps } from '../../../game/types/GameUIProps';
import type { TicTacToeGameAction } from '../types/TicTacToeGameAction';
import type { TicTacToeGameConfig } from '../types/TicTacToeGameConfig';
import type { TicTacToeGameState } from '../types/TicTacToeGameState';
import { TicTacToeCellUI } from './TicTacToeCellUI';

export const TicTacToeGameUI: React.FC<GameUIProps<TicTacToeGameConfig, TicTacToeGameState, TicTacToeGameAction>> = ({
  config,
  state,
  onAction,
  onLeave,
}) => {
  const handleCellClick = useCallback((row: number, col: number) => {
    onAction({ row, col });
  }, [onAction]);
  if (state.winnerIndex === null) {
    return (
      <div>
        <div>Current Turn: {config.playerIds[state.currentPlayerIndex]}</div>
        <div style={{ cursor: 'pointer', fontSize: '48px', fontFamily: 'monospace' }}>
          {state.grid.map((gridRow, rowIndex) =>
            <div key={rowIndex}>
              {gridRow.map((cell, cellIndex) =>
                <TicTacToeCellUI
                  key={cellIndex}
                  row={rowIndex}
                  col={cellIndex}
                  value={cell != null ? config.playerIds[cell] : '•'}
                  onClick={handleCellClick}
                />
              )}
            </div>
          )}
        </div>
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
        <div>Game over!</div>
        <div>Winner: {config.playerIds[state.winnerIndex]}</div>
        <div>
          <span>
            <button onClick={onLeave}>Leave Game</button>
          </span>
        </div>
      </div>
    );
  }
};
