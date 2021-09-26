import type { GameConfig } from '../../gameDefinition/types/GameConfig';
import type { GameDefinition } from '../../gameDefinition/types/GameDefinition';
import type { GameState } from '../../gameDefinition/types/GameState';

export type GameStrategyDefinition<
  TCustomGameConfig,
  TCustomGameState,
  TGameAction,
  TGameResult,
  TMemory
> = Readonly<{
  getNextActionAndMemory: (
    gameState: GameState<TCustomGameState, TGameResult>,
    gameConfig: GameConfig<TCustomGameConfig>,
    gameDefinition: GameDefinition<TCustomGameConfig, TCustomGameState, TGameAction, TGameResult>,
    memory: TMemory | undefined,
  ) => { nextAction: TGameAction, nextMemory?: TMemory } | null
}>;
