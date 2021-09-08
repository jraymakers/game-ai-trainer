import React from 'react';
import type { GameUIProps } from '../../../gameCatalog/types/GameRegistration';
import type { NimGameAction } from '../types/NimGameAction';
import type { NimGameConfig } from '../types/NimGameConfig';
import type { NimGameState } from '../types/NimGameState';

const NimGameRowUI: React.FC<{
  rowItemCount: number;
}> = ({
  rowItemCount,
}) => {
  const items: React.ReactNode[] = [];
  for (let i = 0; i < rowItemCount; i++) {
    items.push(<span key={i}> * </span>)
  }
  return (
    <div>
      {items}
    </div>
  );
}

export const NimGameUI: React.FC<GameUIProps<NimGameConfig, NimGameState, NimGameAction>> = ({
  config,
  state,
  onAction,
  onLeave,
  onEnd,
}) => {
  return (
    <div>
      <div>Nim</div>
      <div>Win condition: {config.misere ? 'Last move loses' : 'Last move wins'}</div>
      <div>Current Turn: {config.playerIds[state.currentPlayerIndex]}</div>
      <div>
        {state.currentRows.map((rowItemCount, index) =>
          <NimGameRowUI key={index} rowItemCount={rowItemCount} />
        )}
      </div>
    </div>
  );
};
