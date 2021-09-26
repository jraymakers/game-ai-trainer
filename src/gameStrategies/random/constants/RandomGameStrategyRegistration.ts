import type { AnyGameStrategy } from '../../../gameStrategyRegistration/types/AnyGameStrategy';
import type { GameStrategyRegistration } from '../../../gameStrategyRegistration/types/GameStrategyRegistration';
import { RandomGameStrategy } from './RandomGameStrategy';

export const RandomGameStrategyRegistration: GameStrategyRegistration = {
  displayName: 'Random',
  strategy: RandomGameStrategy as AnyGameStrategy,
};
