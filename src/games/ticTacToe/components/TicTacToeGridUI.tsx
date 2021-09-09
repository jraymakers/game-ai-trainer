import React from 'react';
import type { TicTacToeGrid } from '../types/TicTacToeGrid';
import { TicTacToeCellUI } from './TicTacToeCellUI';

export const TicTacToeGridUI: React.FC<{
  grid: TicTacToeGrid;
  onCellClick?: (row: number, col: number) => void;
}> = ({
  grid,
  onCellClick,
}) => {
  return (
    <div style={{ cursor: 'pointer', fontSize: '48px', fontFamily: 'monospace' }}>
      {grid.map((gridRow, rowIndex) =>
        <div key={rowIndex}>
          {gridRow.map((cell, cellIndex) =>
            <TicTacToeCellUI
              key={cellIndex}
              row={rowIndex}
              col={cellIndex}
              value={cell != null ? (cell === 0 ? 'X' : 'O') : '•'}
              onClick={onCellClick}
            />
          )}
        </div>
      )}
    </div>
  );
};
