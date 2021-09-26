import { MCTSGameStrategyRegistration } from '../../gameStrategies/mcts/constants/MCTSGameStrategyRegistration';
import { RandomGameStrategyRegistration } from '../../gameStrategies/random/constants/RandomGameStrategyRegistration';
import type { GameStrategyRegistration } from '../../gameStrategyRegistration/types/GameStrategyRegistration';

export const gameStrategyCatalog: readonly GameStrategyRegistration[] = [
  MCTSGameStrategyRegistration,
  RandomGameStrategyRegistration,
];
