import type { AnyGameStrategyDefinition } from '../../../gameStrategyRegistration/types/AnyGameStrategyDefinition';
import type { GameStrategyRegistration } from '../../../gameStrategyRegistration/types/GameStrategyRegistration';
import { RandomGameStrategyDefinition } from './RandomGameStrategyDefinition';

export const RandomGameStrategyRegistration: GameStrategyRegistration = {
  displayName: 'Random',
  definition: RandomGameStrategyDefinition as AnyGameStrategyDefinition,
};
