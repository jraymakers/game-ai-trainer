import type { AnyGameStrategyDefinition } from '../../../gameStrategyRegistration/types/AnyGameStrategyDefinition';
import type { GameStrategyRegistration } from '../../../gameStrategyRegistration/types/GameStrategyRegistration';
import { MCTSGameStrategyDefinition } from './MCTSGameStrategyDefinition';

export const MCTSGameStrategyRegistration: GameStrategyRegistration = {
  displayName: 'Monte Carlo Tree Search',
  definition: MCTSGameStrategyDefinition as AnyGameStrategyDefinition,
};
