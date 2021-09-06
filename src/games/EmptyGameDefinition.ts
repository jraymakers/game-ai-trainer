import type { GameDefinition } from '../game/types/GameDefinition';
import { ok } from '../generalPurpose/types/Result';

export const emptyGame: GameDefinition = {
  createInitialState: (config) => ok({}),
  isLegalAction: (state, action) => true,
  performAction: (state, action) => ok(state),
  isComplete: (state) => true,
  getReport: (state) => ({}),
};
