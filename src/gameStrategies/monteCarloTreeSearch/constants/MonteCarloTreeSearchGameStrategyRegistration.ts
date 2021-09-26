import type { AnyGameStrategyDefinition } from '../../../gameStrategyRegistration/types/AnyGameStrategyDefinition';
import type { GameStrategyRegistration } from '../../../gameStrategyRegistration/types/GameStrategyRegistration';
import { MonteCarloTreeSearchGameStrategyDefinition } from './MonteCarloTreeSearchGameStrategyDefinition';

export const MonteCarloTreeSearchGameStrategyRegistration: GameStrategyRegistration = {
  displayName: 'Monte Carlo Tree Search',
  definition: MonteCarloTreeSearchGameStrategyDefinition as AnyGameStrategyDefinition,
};
