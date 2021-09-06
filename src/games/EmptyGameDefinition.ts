import type { GameDefinition } from 'src/game/types/GameDefinition';
import { ok } from 'src/generalPurpose/types/Result';

export const emptyGame: GameDefinition = {
  createInitialState: (config) => ok({}),
  isLegalAction: (state, action) => true,
  performAction: (state, action) => ok(state),
  isComplete: (state) => true,
  getReport: (state) => ({}),
};
