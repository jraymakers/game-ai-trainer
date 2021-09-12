import React, { useCallback } from 'react';
import type { GameUIProps } from '../../../gameUI/types/GameUIProps';
import type { TicTacToeGameAction } from '../types/TicTacToeGameAction';
import type { TicTacToeCustomGameConfig } from '../types/TicTacToeCustomGameConfig';
import type { TicTacToeCustomGameState } from '../types/TicTacToeCustomGameState';
import { TicTacToeGridUI } from './TicTacToeGridUI';
import type { TicTacToeGameResult } from '../types/TicTacToeGameResult';

export const TicTacToeGameUI: React.FC<
  GameUIProps<TicTacToeCustomGameConfig, TicTacToeCustomGameState, TicTacToeGameAction, TicTacToeGameResult>
> = ({
  gameConfig,
  gameState,
  onGameAction,
}) => {
  const handleCellClick = useCallback((row: number, col: number) => {
    onGameAction({ row, col });
  }, [onGameAction]);
  if (gameState.gameResult) {
    return (
      <div>
        <div>Game over!</div>
        {gameState.gameResult.winnerIndex !== null ? (
          <div>Winner: {gameConfig.playerIds[gameState.gameResult.winnerIndex]}</div>
        ) : (
          <div>Draw!</div>
        )}
        <TicTacToeGridUI grid={gameState.customGameState.grid} />
      </div>
    );
  } else {
    return (
      <div>
        <div>Current Turn: {gameConfig.playerIds[gameState.currentPlayerIndex]}</div>
        <TicTacToeGridUI grid={gameState.customGameState.grid} onCellClick={handleCellClick} />
      </div>
    );
  }
};
