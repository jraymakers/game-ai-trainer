import { MonteCarloTreeSearchGameStrategyRegistration } from '../../gameStrategies/monteCarloTreeSearch/constants/MonteCarloTreeSearchGameStrategyRegistration';
import { RandomGameStrategyRegistration } from '../../gameStrategies/random/constants/RandomGameStrategyRegistration';
import type { GameStrategyRegistration } from '../../gameStrategyRegistration/types/GameStrategyRegistration';

export const gameStrategyCatalog: readonly GameStrategyRegistration[] = [
  MonteCarloTreeSearchGameStrategyRegistration,
  RandomGameStrategyRegistration,
];
