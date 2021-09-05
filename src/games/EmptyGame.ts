import { zeroScores } from 'src/game/functions/PlayerScoresHelpers';
import type { GameDefinition } from 'src/game/types/GameDefinition';

export const emptyGame: GameDefinition = {
  displayName: 'Empty Game',
  createInitialState: (config) => ({ config }),
  isLegalAction: (state, action) => true,
  performAction: (state, action) => state,
  isCompleted: (state) => true,
  getPlayerScores: (state) => zeroScores(state),
};
