import React from 'react';
import { ExampleGame } from '../../games/ExampleGame';
import { ExampleGameDefinition } from '../../games/ExampleGameDefinition';
import { NimGame } from '../../games/NimGame';
import { NimGameDefinition } from '../../games/NimGameDefinition';

function createGames() {
  const exampleGameDefinition = ExampleGameDefinition.createInitialState({
    players: [
      { id: 'player1', displayName: 'Player 1' },
      { id: 'player2', displayName: 'Player 2' }
    ],
    initialValue: 21,
    targetValue: 0,
    minDelta: -3,
    maxDelta: -1,
    misere: true,
  });
  const exampleGame = new ExampleGame({
    playerIds: ['player1', 'player2'],
    initialValue: 21,
    targetValue: 0,
    minDelta: -3,
    maxDelta: -1,
    misere: true,
  });
  const nimGameDefinition = NimGameDefinition;
  const nimGame = new NimGame({
    playerIds: ['player1', 'player2'],
    initialRows: [3, 5, 7],
    misere: true,
  });
}

export const Root: React.FC = () => {
  return (
    <div>
      <div>Game AI Trainer</div>
    </div>
  );
}
