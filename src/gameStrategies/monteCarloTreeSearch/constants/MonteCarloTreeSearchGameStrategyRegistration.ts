import type { AnyGameStrategy } from '../../../gameStrategyRegistration/types/AnyGameStrategy';
import type { GameStrategyRegistration } from '../../../gameStrategyRegistration/types/GameStrategyRegistration';
import { MonteCarloTreeSearchGameStrategy } from './MonteCarloTreeSearchGameStrategy';

export const MonteCarloTreeSearchGameStrategyRegistration: GameStrategyRegistration = {
  displayName: 'Monte Carlo Tree Search',
  strategy: MonteCarloTreeSearchGameStrategy as AnyGameStrategy,
};
