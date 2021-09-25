import React, { useCallback } from 'react';
import type { GameUIProps } from '../../../gameUI/types/GameUIProps';
import { PlayerUI } from '../../../player/components/PlayerUI';
import type { TicTacToeCustomGameConfig } from '../types/TicTacToeCustomGameConfig';
import type { TicTacToeCustomGameState } from '../types/TicTacToeCustomGameState';
import type { TicTacToeGameAction } from '../types/TicTacToeGameAction';
import type { TicTacToeGameResult } from '../types/TicTacToeGameResult';
import { TicTacToeGridUI } from './TicTacToeGridUI';

export const TicTacToeGameUI: React.FC<
  GameUIProps<TicTacToeCustomGameConfig, TicTacToeCustomGameState, TicTacToeGameAction, TicTacToeGameResult>
> = ({
  gameConfig,
  gameState,
  onGameAction,
}) => {
  const handleCellClick = useCallback((rowIndex: number, colIndex: number) => {
    onGameAction({ rowIndex, colIndex });
  }, [onGameAction]);
  if (gameState.gameResult) {
    return (
      <div>
        <span>Game over! </span>
        {gameState.gameResult.winnerIndex !== null ? (
          <>
            <span>Winner: </span>
            <PlayerUI player={gameConfig.players[gameState.gameResult.winnerIndex]} />
          </>
        ) : (
          <span>Draw!</span>
        )}
        <TicTacToeGridUI grid={gameState.customGameState.grid} />
      </div>
    );
  } else {
    return (
      <div>
        <div>
          <span>Current Turn: </span>
          <PlayerUI player={gameConfig.players[gameState.currentPlayerIndex]} />
        </div>
        <TicTacToeGridUI grid={gameState.customGameState.grid} onCellClick={handleCellClick} />
      </div>
    );
  }
};
